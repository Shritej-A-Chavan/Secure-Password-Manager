"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { loggedInUser } from "@/services/getUser.service";

export default function AppInit() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    async function init() {
      try {
        const email = await loggedInUser();
        setAuth(email);
      } catch {
        clearAuth();
      }
    }

    init();
  }, [setAuth, clearAuth]);

  return null;
}