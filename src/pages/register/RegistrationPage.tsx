import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../../hooks/useAuth";
import { TextField, Button, Box, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes";

const schema = z
  .object({
    username: z.string(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

type RegisterFormInputs = z.infer<typeof schema>;

const RegistrationPage = () => {
  const registerMutation = useRegister();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: RegisterFormInputs) => {
    registerMutation.mutate({
      username: data.username,
      password: data.password,
    });
    navigate(routes.home);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
        }}
      >
        <Typography variant="h5" textAlign="center" gutterBottom>
          Registration
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 400,
            mx: "auto",
          }}
        >
          <TextField
            label="Username"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            type="password"
            label="Password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            type="password"
            label="Confirm Password"
            {...register("passwordConfirmation")}
            error={!!errors.passwordConfirmation}
            helperText={errors.passwordConfirmation?.message}
          />
          <Button
            variant="contained"
            type="submit"
            // disabled={registerMutation.isLoading}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegistrationPage;
