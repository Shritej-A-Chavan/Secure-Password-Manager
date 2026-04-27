"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { signupSchema, SignupFormData } from "../schemas/signupSchema";
import { getPasswordRules } from "@/lib/utils";
import { signup } from "@/services/signup.service";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

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
      const message =
      err?.message ||
      err?.error ||
      "Something went wrong";

      toast.error("Signup failed", {
        description: message,
      });

      setServerError(message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl p-8 shadow-xl">

      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white">
          Create account
        </h2>
        <p className="text-sm text-zinc-400 mt-1">
          Secure your vault with encryption
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Username */}
        <div>
          <label className="text-sm text-zinc-300">Username</label>
          <Input
            {...register("username")}
            placeholder="John Doe"
            className="h-11 bg-zinc-800 border-zinc-700"
          />
          {errors.username && (
            <p className="text-xs text-red-400">{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-zinc-300">Email</label>
          <Input
            type="email"
            {...register("email")}
            placeholder="you@example.com"
            className="h-11 bg-zinc-800 border-zinc-700"
          />
          {errors.email && (
            <p className="text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-sm text-zinc-300">Password</label>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="••••••••"
              className="h-11 pr-12 bg-zinc-800 border-zinc-700"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* {errors.password && (
            <p className="text-xs text-red-400">{errors.password.message}</p>
          )} */}

          {/* PASSWORD CHECKLIST */}
          <div className="mt-2 space-y-1 text-xs">
            <p className="text-zinc-400 mb-1">Password requirements:</p>

            <p className={`flex items-center gap-2 transition ${
              rules.length
                ? "text-emerald-300 drop-shadow-[0_0_6px_rgba(52,211,153,0.25)]"
                : "text-zinc-500"
            }`}>
              <Check size={14} />
              At least 8 characters
            </p>

            <p className={`flex items-center gap-2 transition ${
              rules.upper
                ? "text-emerald-300 drop-shadow-[0_0_6px_rgba(52,211,153,0.25)]"
                : "text-zinc-500"
            }`}>
              <Check size={14} />
              One uppercase letter
            </p>

            <p className={`flex items-center gap-2 transition ${
              rules.lower
                ? "text-emerald-300 drop-shadow-[0_0_6px_rgba(52,211,153,0.25)]"
                : "text-zinc-500"
            }`}>
              <Check size={14} />
              One lowercase letter
            </p>

            <p className={`flex items-center gap-2 transition ${
              rules.number
                ? "text-emerald-300 drop-shadow-[0_0_6px_rgba(52,211,153,0.25)]"
                : "text-zinc-500"
            }`}>
              <Check size={14} />
              One number
            </p>

            <p className={`flex items-center gap-2 transition ${
              rules.special
                ? "text-emerald-300 drop-shadow-[0_0_6px_rgba(52,211,153,0.25)]"
                : "text-zinc-500"
            }`}>
              <Check size={14} />
              One special character
            </p>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="text-sm text-zinc-300">Confirm Password</label>

          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              placeholder="••••••••"
              className="h-11 pr-12 bg-zinc-800 border-zinc-700"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="text-xs text-red-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting || !isValid}
          className={`w-full h-11 mt-2 text-sm font-medium transition
            ${
              isSubmitting || !isValid
                ? "bg-zinc-700 opacity-60 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-500"
            }`}
        >
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </Button>
      </form>

      {/* Footer */}
      <p className="text-sm text-center text-zinc-400 mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-purple-400">
          Sign in
        </Link>
      </p>
    </div>
  );
}