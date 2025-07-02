import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditDocumentIcon from "@mui/icons-material/EditDocument";
import { useAuthStore } from "../../auth/useAuthStore";
import type { User, UserWithPassword } from "../../types/user";
import { useQuery } from "@tanstack/react-query";
import { fetchStatistics } from "../../api/users";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { changePassword, changeName, deleteUser } from "../../api/users";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type PassSchema = z.infer<typeof passSchema>;
type NameSchema = z.infer<typeof nameSchema>;

const passSchema = z
  .object({
    oldPassword: z.string().nonempty(),
    password: z.string().min(6),
    passwordConfirmation: z.string().nonempty(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

const nameSchema = z.object({
  username: z.string(),
});

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

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(passSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      passwordConfirmation: "",
    },
    disabled: isLoading,
  });

  const {
    control: nameControl,
    handleSubmit: handleNameSubmit,
    reset: nameFormReset,
  } = useForm({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      username: "",
    },
  });

  const passwordMutation = useMutation({
    mutationFn: (data: { oldPassword: string; newPassword: string }) =>
      changePassword(data),
    onSuccess: () => {
      reset();
      toast.success("Password changed successfully");
    },
    onError: () => {
      toast.error("Failed to change password");
    },
  });

  const setUser = useAuthStore((store) => store.setUser);

  const nameMutation = useMutation<
    UserWithPassword,
    Error,
    { username: string }
  >({
    mutationFn: changeName,
    onSuccess: (data) => {
      setUser(data);
      nameFormReset();
      toast.success("Username updated");
    },
    onError: () => {
      toast.error("Failed to update name");
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("Account deleted");
    },
    onError: () => {
      toast.error("Failed to delete account");
    },
  });

  const onSubmit = (data: PassSchema) => {
    passwordMutation.mutate({
      oldPassword: data.oldPassword,
      newPassword: data.password,
    });
  };

  const onNameSubmit = (data: NameSchema) => {
    nameMutation.mutate({
      username: data.username,
    });
  };

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
              <Button color="error" variant="contained" size="small" onClick={deleteAccount}  >
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <Typography component={"h2"} sx={{ textDecoration: "underline" }}>
            Edit your profile:
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography component={"h2"} sx={{ fontWeight: "600" }}>
                Change your username:
              </Typography>
              <form onSubmit={handleNameSubmit(onNameSubmit)}>
                <Controller
                  control={nameControl}
                  name="username"
                  render={({
                    field: { onChange, onBlur, value, name },
                    fieldState: { error },
                  }) => (
                    <TextField
                      fullWidth
                      label="New username"
                      variant="outlined"
                      margin="normal"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      name={name}
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Save
                </Button>
              </form>
            </Box>

            <Box sx={{ width: "100%" }}>
              <Typography component={"h2"} sx={{ fontWeight: "600" }}>
                Change your password:
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  control={control}
                  name="oldPassword"
                  render={({
                    field: { onChange, onBlur, value, name },
                    fieldState: { error },
                  }) => (
                    <TextField
                      required
                      fullWidth
                      type="password"
                      label="Old password"
                      variant="outlined"
                      margin="normal"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      name={name}
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="password"
                  render={({
                    field: { onChange, onBlur, value, name },
                    fieldState: { error },
                  }) => (
                    <TextField
                      required
                      fullWidth
                      label="New password"
                      type="password"
                      variant="outlined"
                      margin="normal"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      name={name}
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="passwordConfirmation"
                  render={({
                    field: { onChange, onBlur, value, name },
                    fieldState: { error },
                  }) => (
                    <TextField
                      required
                      fullWidth
                      label="Confirm password"
                      type="password"
                      variant="outlined"
                      margin="normal"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      name={name}
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Save
                </Button>
              </form>
            </Box>
          </Box>
        </Card>
      </Modal>
    </Container>
  );
};

export default AccountPage;
