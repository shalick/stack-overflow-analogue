import { Box, Button, Card, Modal, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useAuthStore } from "../../auth/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { changeName, changePassword } from "../../api/users";
import { toast } from "react-toastify";
import type { UserWithPassword } from "../../types/user";

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

interface IAccountPageModalProps {
  open: boolean;
  handleClose: () => void;
}

const AccountPageModal = ({ open, handleClose }: IAccountPageModalProps) => {
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

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(passSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      passwordConfirmation: "",
    },
    // disabled: isLoading,
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
  return (
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
  );
};

export default AccountPageModal;
