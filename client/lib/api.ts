import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8888/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

// Attach JWT automatically for protected routes
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    const isAuthRoute =
      config.url?.includes("/auth/login") ||
      config.url?.includes("/auth/signup");

    if (token && !isAuthRoute) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config
});

export default api