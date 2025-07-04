import { useState, type FC } from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useQuery } from "@tanstack/react-query";

import type { User, UserStatistics } from "../../types/user.ts";
import { fetchStatistics } from "../../api/users.ts";
import StatisticsCard from "../statistics-card/StatisticsCard.tsx";

interface UserProps {
  user: User;
}

const UserCard: FC<UserProps> = ({ user }) => {
  const { username, role, id } = user;
  const [isShow, setIsShow] = useState(false);

  const {
    data: statistics,
    isLoading,
    isFetching,
    refetch,
    isFetched,
  } = useQuery<{ statistic: UserStatistics }, Error>({
    queryKey: ["user-statistics", id],
    queryFn: () => fetchStatistics(id),
    enabled: false,
  });

  const handleToggle = () => {
    setIsShow((prev) => !prev);
    if (!isFetched) refetch();
  };

  return (
    <Card sx={{ display: "flex", flexDirection: "column" }}>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <PersonOutlineIcon sx={{ width: "30px", height: "30px" }} />
          <Box>
            <Typography>Username: {username}</Typography>
            <Typography>Id: {id}</Typography>
            <Typography>Role: {role}</Typography>
          </Box>
        </Box>

        <IconButton onClick={handleToggle}>
          <ExpandMoreIcon
            sx={{
              transition: "transform 0.3s ease",
              transform: `rotate(${isShow ? "180" : "0"}deg)`,
            }}
          />
        </IconButton>
      </CardContent>

      {isShow && isFetching && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "150px",
          }}
        >
          <CircularProgress size={30} />
        </Box>
      )}

      {isShow && statistics && (
        <>
          <Typography sx={{ fontSize: "20px", textAlign: "center" }}>
            User statistics:
          </Typography>
          <CardContent>
            <StatisticsCard statistics={statistics.statistic}></StatisticsCard>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default UserCard;
