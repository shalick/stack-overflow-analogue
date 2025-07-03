import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../api/users.ts";
import { Box, CircularProgress, Pagination, Typography } from "@mui/material";
import type { User } from "../../types/user.ts";
import UserCard from "../user-card/UserCard.tsx";

const UsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users", currentPage],
    queryFn: () => getAllUsers(currentPage),
    // keepPreviousData: true,
  });

  const totalPages = data?.meta.totalPages ?? 0;
  const users: User[] = data?.data ?? [];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Typography sx={{ fontSize: "25px" }}>User list:</Typography>
        <Pagination
          sx={{ marginBottom: "1rem" }}
          count={totalPages}
          page={currentPage}
          onChange={(_event, page) => setCurrentPage(page)}
        />
      </Box>

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <CircularProgress size={60} />
        </Box>
      ) : isError ? (
        <Typography sx={{ color: "red", textAlign: "center" }}>
          Failed to load users.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            flexDirection: "column",
          }}
        >
          {users.map((user) => (
            <UserCard user={user} key={user.id} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default UsersPage;
