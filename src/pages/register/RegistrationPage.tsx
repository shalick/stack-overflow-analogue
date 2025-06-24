import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../../hooks/useAuth";
import { TextField, Button, Box } from "@mui/material";

const schema = z
  .object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

type RegisterFormInputs = z.infer<typeof schema>;

// const schema = z.object({
//   email: z.string().email(),
//   password: z.string().min(8),
// });
// type FormFields = {
//   email: string;
//   password: string;
// };

const RegistrationPage = () => {
  const registerMutation = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: RegisterFormInputs) => {
    registerMutation.mutate({ email: data.email, password: data.password });
  };

  return (
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
        label="Email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
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
  );
};

export default RegistrationPage;
