import api from "@/lib/api";

export type SignupPayload = {
  username: string;
  email: string;
  password: string;
};

export const signup = async (data: SignupPayload) => {
  try {
    const response = await api.post("/auth/signup", data);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || new Error("Signup failed");
  }
};