"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { loginUser } from "@/services/login.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import VerifyEmailModal from "@/app/components/VerifyEmailModal";
import { useAuthStore } from "@/store/auth.store";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    if (!email || !password) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);
      setAuth(email)
      await loginUser({ email, password });

      toast.success("Login successful");
      setAuth
      router.replace("/");
    } catch (err: any) {
      const message = err.message;

      if (message === "EMAIL_NOT_VERIFIED") {
        setShowVerifyModal(true);
      } else {
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 my-4 shadow-2xl relative overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_30%)]" />

        <div className="relative z-10">
          {/* Heading */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-11 w-11 rounded-2xl bg-white text-black flex items-center justify-center shadow-lg">
                <ShieldCheck size={20} />
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Welcome back
                </h2>
                <p className="text-sm text-zinc-400">
                  Sign in to access your vault
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm text-zinc-300 mb-2 block">
                Email Address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 rounded-xl bg-zinc-900/80 border border-zinc-800 px-4 text-white outline-none focus:border-white/20 focus:ring-2 focus:ring-white/10 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-zinc-300 mb-2 block">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 rounded-xl bg-zinc-900/80 border border-zinc-800 px-4 pr-12 text-white outline-none focus:border-white/20 focus:ring-2 focus:ring-white/10 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-zinc-400 hover:text-white transition"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className={`w-full h-11 rounded-xl text-sm font-semibold transition-all duration-200 ${
                loading
                  ? "bg-zinc-700 opacity-60 cursor-not-allowed"
                  : "bg-white text-black hover:bg-zinc-200"
              }`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>

          {/* Footer */}
          <p className="text-sm text-center text-zinc-400 mt-8">
            Don’t have an account?{" "}
            <span
              onClick={() => router.push("/signup")}
              className="text-white font-medium hover:underline cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>

      {/* Verify Email Modal */}
      <VerifyEmailModal
        email={email}
        open={showVerifyModal}
        onClose={() => setShowVerifyModal(false)}
      />
    </>
  );
}
