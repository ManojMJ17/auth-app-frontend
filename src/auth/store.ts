import type LoginData from '@/models/LoginData';
import type LoginResponseData from '@/models/LoginResponseData';
import type { User } from '@/models/User';
import { loginUser, logoutUser } from '@/services/AuthService';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  authLoading: boolean;

  login: (loginData: LoginData) => Promise<LoginResponseData>;
  logout: () => void;
  checkLogin: () => boolean | undefined;

  changeLocalLogin: (
    accessToken: string,
    user: User,
    isAuthenticated: boolean,
  ) => void;
}

const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      authLoading: false,

      login: async (loginData) => {
        // console.log('started login...');
        set({ authLoading: true });
        try {
          const loginResponse = await loginUser(loginData);
          console.log(loginResponse);
          set({
            accessToken: loginResponse.accessToken,
            refreshToken: loginResponse.refreshToken,
            user: loginResponse.user,
            isAuthenticated: true,
          });
          return loginResponse;
        } catch (error) {
          console.log(error);
        } finally {
          set({ authLoading: false });
        }
      },

      logout: async () => {
        try {
          //   if (!silent) {
          //     await logoutUser();
          //   }
          set({ authLoading: true });
          await logoutUser();
        } catch (error) {
          console.log(error);
        } finally {
          set({ authLoading: false });
        }
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },
      checkLogin: () => {
        if (get().accessToken && get().isAuthenticated) return true;
        else return false;
      },

      changeLocalLogin: (accessToken, user, isAuthenticated) => {
        set({
          accessToken,
          user,
          isAuthenticated,
        });
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);

export default useAuth;
