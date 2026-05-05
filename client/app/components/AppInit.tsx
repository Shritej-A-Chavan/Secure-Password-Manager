"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { loggedInUser } from "@/services/getUser.service";

export default function AppInit() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const user = await loggedInUser();

        if (!mounted) return;

        if (user) {
          setAuth(user);
        } else {
          clearAuth();
        }
      } catch {
        if (mounted) clearAuth();
      }
    }

    init();

    return () => {
      mounted = false;
    };
  }, [setAuth, clearAuth]);

  return null;
}