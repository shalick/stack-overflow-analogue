import api from './axios.ts';
import type {
    ChangeNameRequest,
    ChangePasswordRequest,
    UpdatePasswordResponseData,
    User,
    UserStatisticsResponse,
    UserWithPassword,
} from '../types/user.ts';
import type {
    QueryResponse,
    ResponseWithData,
    ResponseWithMessage,
} from '../types/response.ts';
import { useAuthStore } from '../auth/useAuthStore.ts';

export const getCurrentUser = async () => {
  const response = await api.get<ResponseWithData<User>>('me');
  return response.data.data;
};

export const fetchStatistics = async (userId: string) => {
  const url = `users/${userId}/statistic`;
  const response = await api.get<UserStatisticsResponse>(url);
  return response.data.data;
};

export const changePassword = async (body: ChangePasswordRequest) => {
  await api.patch<ResponseWithMessage<UpdatePasswordResponseData>>('me/password', body);
};

export const changeName = async (body: ChangeNameRequest) => {
  const response = await api.patch<ResponseWithMessage<UserWithPassword>>('me', body);
  return response.data.data;
};

export const getAllUsers = async (page: number = 1) => {
  const response = await api.get<QueryResponse<User[]>>('users', {
    params: { page },
  });
  return response.data.data;
};

export const deleteUser = async () => {
  await api.delete('me');
  useAuthStore.setState({ user: null });
};
