import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useLogin } from '../../hooks/useAuth';

const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    loginMutation.mutate(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: 400,
        mx: 'auto',
        mt: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h5" textAlign="center">
        Login
      </Typography>

      <TextField
        label="Username"
        {...register('username')}
        error={!!errors.username}
        helperText={errors.username?.message}
      />

      <TextField
        type="password"
        label="Password"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Button
        variant="contained"
        type="submit"
        // disabled={loginMutation.isLoading}
      >
        {/* {loginMutation.isLoading ? 'Logging in...' : 'Login'} */}
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
