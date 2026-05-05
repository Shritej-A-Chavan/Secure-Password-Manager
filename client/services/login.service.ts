import api from "@/lib/api";

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const res = await api.post("/auth/login", data, {
      withCredentials: true
    });
    return res.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message || error.message;

    throw new Error(message);
  }
};