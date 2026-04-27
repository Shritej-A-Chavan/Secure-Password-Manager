import api from "@/lib/api";

export type resendVerificationPayload = {
    email: string
}

export const resendVerificationEmail = async (data: resendVerificationPayload) => {
  try {
    const response = await api.post("/auth/resend-verification", data);
    return response.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || error.message;
    throw new Error(message);
  }
}