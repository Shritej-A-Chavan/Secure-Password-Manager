import { create } from "zustand";

type AuthStore = {
  user: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  setAuth: (user: any) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

  setAuth: (user) =>
    set({
      user,
      isAuthenticated: true,
      loading: false,
    }),

  clearAuth: () =>
    set({
      user: null,
      isAuthenticated: false,
      loading: false,
    }),
}));