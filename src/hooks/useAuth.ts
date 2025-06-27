import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import { useAuthStore } from "../auth/useAuthStore";
import { toast } from "react-hot-toast";

export const useLogin = () => {
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      const res = await api.post("auth/login", { username, password });
      return res.data;
    },
    onSuccess: ({ data, message }) => {
      setUser(data);
      toast.success("Logged in successfully!", message);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: () => toast.error("Login failed"),
  });
};

export const useLogout = () => {
  const clearUser = useAuthStore((state) => state.clearUser);

  return useMutation({
    mutationFn: () => api.post("auth/logout"),
    onSuccess: () => {
      clearUser();
      toast.success("Logged out");
    },
    onError: () => toast.error("Logout failed"),
  });
};

export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      const res = await api.post("/register", { username, password });
      return res.data;
    },
    onSuccess: (data) => {
      setUser(data);
      toast.success("Registered successfully!");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: () => toast.error("Registration failed"),
  });
};
