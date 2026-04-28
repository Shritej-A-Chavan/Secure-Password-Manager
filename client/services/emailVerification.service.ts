import api from "@/lib/api";

export const verifyEmail = async (token: string) => {
  try {
    const response = await api.post(`/auth/verify-email?token=${token}`);
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error.message;

    throw new Error(message);
  }
};