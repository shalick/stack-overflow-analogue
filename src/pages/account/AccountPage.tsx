import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import { useAuthStore } from "../../auth/useAuthStore";
import type { User } from "../../types/user";
import { useQuery } from "@tanstack/react-query";
import { fetchStatistics } from "../../api/users";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../api/users";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import AccountPageModal from "../../components/modal/AccountPageModal";

const AccountPage = () => {
  const { username, id, role } = useAuthStore((store) => store.user) as User;
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["statistics", id],
    queryFn: () => fetchStatistics(id),
    enabled: !!id,
  });
  const statistics = data?.statistic;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("Account deleted");
    },
    onError: () => {
      toast.error("Failed to delete account");
    },
  });

  const deleteAccount = () => {
    deleteMutation.mutate();
    navigate(routes.register);
  };
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" align="center">
        Welcome,{" "}
        <span style={{ fontStyle: "italic", color: "blue" }}>{username}</span>
      </Typography>
      <Card elevation={3} sx={{ p: 4, mt: 2 }}>
        <Grid
          container
          spacing={10}
          alignItems="center"
          justifyContent="center"
          sx={{ textAlign: "left" }}
        >
          <Grid>
            <Avatar sx={{ width: 100, height: 100, mx: "auto", mb: 2 }} />
          </Grid>
          <Grid>
            <Typography variant="h6" align="center">
              {username}
            </Typography>
            <Typography variant="body2" align="center">
              Id: {id}
            </Typography>
            <Typography variant="body2" align="center">
              Role: {role}
            </Typography>
            <Box mt={2}>
              <Button
                color="warning"
                variant="contained"
                size="small"
                sx={{ mr: 1 }}
                onClick={handleOpen}
              >
                <EditDocumentIcon fontSize="small" />
              </Button>
              <Button
                color="error"
                variant="contained"
                size="small"
                onClick={deleteAccount}
              >
                <DeleteIcon fontSize="small" />
              </Button>
            </Box>
          </Grid>
        </Grid>
        {isLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "35px",
              margin: "30px",
            }}
          >
            <CircularProgress size={35} />
          </Box>
        )}
        {statistics && (
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="body2">
              <Box component="span" fontWeight="bold">
                Rating:
              </Box>{" "}
              {statistics?.rating}
            </Typography>
            <Typography variant="body2">
              <Box component="span" fontWeight="bold">
                Snippets:
              </Box>{" "}
              {statistics?.snippetsCount}
            </Typography>
            <Typography variant="body2">
              <Box component="span" fontWeight="bold">
                Comments:
              </Box>{" "}
              {statistics?.commentsCount}
            </Typography>
            <Typography variant="body2">
              <Box component="span" fontWeight="bold">
                Likes:
              </Box>{" "}
              {statistics?.likesCount}
            </Typography>
            <Typography variant="body2">
              <Box component="span" fontWeight="bold">
                Dislikes:
              </Box>{" "}
              {statistics?.dislikesCount}
            </Typography>
            <Typography variant="body2">
              <Box component="span" fontWeight="bold">
                Questions:
              </Box>{" "}
              {statistics?.questionsCount}
            </Typography>
            <Typography variant="body2">
              <Box component="span" fontWeight="bold">
                Correct Answers:
              </Box>{" "}
              {statistics?.correctAnswersCount}
            </Typography>
            <Typography variant="body2">
              <Box component="span" fontWeight="bold">
                Regular Answers:
              </Box>{" "}
              {statistics?.regularAnswersCount}
            </Typography>
          </Grid>
        )}
      </Card>
      <AccountPageModal open={open} handleClose={handleClose} />
    </Container>
  );
};

export default AccountPage;
