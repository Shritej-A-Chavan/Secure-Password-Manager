import api from "@/lib/api";

export const loggedInUser = async () => {
  try {
    const res = await api.get("/users/me", {
      withCredentials: true
    });
    return res.data.user;
  } catch (error: any) {
    return null;
  }
};