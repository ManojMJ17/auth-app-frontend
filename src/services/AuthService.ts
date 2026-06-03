import apiClient from '@/config/ApiClient';
import type LoginData from '@/models/LoginData';
import type LoginResponseData from '@/models/LoginResponseData';
import type RegisterData from '@/models/RegisterData';
import type { User } from '@/models/User';

export const registerUser = async (signupData: RegisterData) => {
  const response = await apiClient.post(`/auth/register`, signupData);
  return response.data;
};

export const loginUser = async (loginData: LoginData) => {
  const response = await apiClient.post(`/auth/login`, loginData);
  return response.data;
};

export const logoutUser = async () => {
  const response = await apiClient.post(`/auth/logout`);
  return response.data;
};

export const getUserByEmail = async (emailId: string) => {
  const response = await apiClient.get<User>(`/users/email/${emailId}`);
  return response.data;
};

export const refreshToken = async () => {
  const response = await apiClient.post<LoginResponseData>(`/auth/refresh`);
  return response.data;
};
