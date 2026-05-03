"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { signupSchema, SignupFormData } from "../schemas/signupSchema";
import { getPasswordRules } from "@/lib/utils";
import { signup } from "@/services/signup.service";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const password = watch("password") || "";
  const rules = getPasswordRules(password);

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const payload = {
        username: data.username,
        email: data.email,
        password: data.password,
      };

      const res = await signup(payload);

      toast.success("Account created successfully");

      console.log("Signup success:", res);
      router.push(`/check-email?email=${encodeURIComponent(payload.email)}`);
    } catch (err: any) {
      const message = err?.message || err?.error || "Something went wrong";

      toast.error("Signup failed", {
        description: message,
      });

      setServerError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
                Create account
              </h2>
              <p className="text-sm text-zinc-400">
                Secure your vault in seconds
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <div>
            <label className="text-sm text-zinc-300 mb-2 block">Username</label>
            <Input
              {...register("username")}
              placeholder="John Doe"
              className="h-11 rounded-xl bg-zinc-900/80 border border-zinc-800 focus:border-white/20 focus:ring-2 focus:ring-white/10 transition"
            />
            {errors.username && (
              <p className="text-xs text-red-400 mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-zinc-300 mb-2 block">
              Email Address
            </label>
            <Input
              type="email"
              {...register("email")}
              placeholder="you@example.com"
              className="h-11 rounded-xl bg-zinc-900/80 border border-zinc-800 focus:border-white/20 focus:ring-2 focus:ring-white/10 transition"
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-zinc-300 mb-2 block">Password</label>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="••••••••"
                className="h-11 pr-12 rounded-xl bg-zinc-900/80 border border-zinc-800 focus:border-white/20 focus:ring-2 focus:ring-white/10 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Password Checklist */}
            <div className="mt-3 space-y-2 text-xs bg-zinc-900/60 border border-zinc-800 rounded-xl p-3">
              <p className="text-zinc-400 font-medium mb-1">
                Password requirements
              </p>

              {[
                ["At least 8 characters", rules.length],
                ["One uppercase letter", rules.upper],
                ["One lowercase letter", rules.lower],
                ["One number", rules.number],
                ["One special character", rules.special],
              ].map(([label, valid], index) => (
                <p
                  key={index}
                  className={`flex items-center gap-2 transition ${
                    valid ? "text-emerald-400" : "text-zinc-500"
                  }`}
                >
                  <Check size={14} />
                  {label}
                </p>
              ))}
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-zinc-300 mb-2 block">
              Confirm Password
            </label>

            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                placeholder="••••••••"
                className="h-11 pr-12 rounded-xl bg-zinc-900/80 border border-zinc-800 focus:border-white/20 focus:ring-2 focus:ring-white/10 transition"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="text-xs text-red-400 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={`w-full h-11 rounded-xl text-sm font-semibold transition-all duration-200 ${
              isSubmitting || !isValid
                ? "bg-zinc-700 opacity-60 cursor-not-allowed"
                : "bg-white text-black hover:bg-zinc-200"
            }`}
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-zinc-400 mt-8">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-white font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
