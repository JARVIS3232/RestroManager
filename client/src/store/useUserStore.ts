/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { LoginInputState, SignupInputState } from "@/schema/userSchema";
import { toast } from "sonner";

const API_ENDPOINT = "http://localhost:3000/api/v1/user";
axios.defaults.withCredentials = true;

type User = {
  fullName: string;
  email: string;
  contact: number;
  address: string;
  city: string;
  country: string;
  profilePicture: string;
  admin: boolean;
  isVerified: boolean;
};

type UserState = {
  user: null | User;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  signup: (input: SignupInputState) => Promise<void>;
  login: (input: LoginInputState) => Promise<void>;
  verifyEmail: (verificationCode: string) => Promise<void>;
  checkAuthentication: () => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (input: any) => Promise<void>;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: true,
      signup: async (input: SignupInputState) => {
        try {
          const res = await axios.post(`${API_ENDPOINT}/signup`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (res.data.success) {
            console.log(res.data);
            toast(res.data.message, {
              position: "top-center",
              style: {
                fontSize: "18px",
              },
              duration: 2000,
            });
            set({ user: res.data.user, isAuthenticated: true });
          }
        } catch (error: any) {
          toast.error(error.response.data.message, {
            position: "top-center",
            style: {
              fontSize: "18px",
            },
            duration: 2000,
          });
          console.log(error);
        }
      },
      login: async (input: LoginInputState) => {
        try {
          const res = await axios.post(`${API_ENDPOINT}/login`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (res.data.success) {
            console.log(res.data);
            toast(res.data.message, {
              position: "top-center",
              style: {
                fontSize: "18px",
              },
              duration: 2000,
            });
            set({ user: res.data.user, isAuthenticated: true });
            return;
          }
        } catch (error: any) {
          toast.error(error.response.data.message, {
            position: "top-center",
            style: {
              fontSize: "18px",
            },
            duration: 2000,
          });
          console.log(error);
        }
      },

      verifyEmail: async (verificationCode: string) => {
        try {
          const res = await axios.post(
            `${API_ENDPOINT}/verify-email`,
            {
              verificationCode,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (res.data.success) {
            set({ user: res.data.user, isAuthenticated: true });
            toast.success(res.data.message, {
              position: "top-center",
              style: {
                fontSize: "18px",
              },
              duration: 2000,
            });
          }
        } catch (error: any) {
          console.log(error);
          toast.error(error.response.data.message, {
            position: "top-center",
            style: {
              fontSize: "18px",
            },
            duration: 2000,
          });
        }
      },

      checkAuthentication: async () => {
        try {
          set({ isCheckingAuth: true });
          const res = await axios.get(`${API_ENDPOINT}/check-auth`);
          if (res.data.success) {
            set({
              user: res.data.user,
              isAuthenticated: true,
              isCheckingAuth: false,
            });
          }
        } catch (error) {
          console.log(error);
          set({ isAuthenticated: false, isCheckingAuth: false });
        }
      },

      logout: async () => {
        try {
          const res = await axios.post(`${API_ENDPOINT}/logout`);
          if (res.data.success) {
            toast.success(res.data.message);
            set({ user: null, isAuthenticated: false });
          }
        } catch (error: any) {
          console.log(error);
          toast.error(error.response.data.message);
        }
      },

      forgotPassword: async (email: string) => {
        try {
          const res = await axios.post(
            `${API_ENDPOINT}/forgot-password`,
            email
          );
          if (res.data.message) {
            toast.success(res.data.message);
          }
        } catch (error: any) {
          console.log(error);
          toast.error(error.response.data.message);
        }
      },

      resetPassword: async (token: string, newPassword: string) => {
        try {
          const res = await axios.post(
            `${API_ENDPOINT}/reset-password/${token}`,
            { newPassword }
          );
          if (res.data.success) {
            toast.success(res.data.message);
          }
        } catch (error: any) {
          console.log(error);
          toast.error(error.response.data.message);
        }
      },

      updateProfile: async (input: any) => {
        try {
          const res = await axios.put(`${API_ENDPOINT}/profile/update`, input, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (res.data.success) {
            toast.success(res.data.message);
            set({ user: res.data.user, isAuthenticated: true });
          }
        } catch (error: any) {
          console.log(error);
          toast.error(error.response.data.message);
        }
      },
    }),
    {
      name: "user-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
