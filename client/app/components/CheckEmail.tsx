import { resendVerificationEmail } from "@/services/resendVerification.service";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Mail, Loader2 } from "lucide-react";

export default function CheckEmail() {
  const params = useSearchParams();
  const email = params.get("email");

  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(60);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResend = async () => {
    if (!email) {
      toast.error("Invalid request");
      return;
    }

    try {
      setLoading(true);
      await resendVerificationEmail({ email });
      toast.success("Verification email sent");
      setCooldown(60);
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-md">
        {/* Premium Card */}
        <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
          {/* subtle top gradient line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-600 to-transparent" />

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-xl bg-zinc-800/70 border border-zinc-700 shadow-inner">
              <Mail className="w-5 h-5 text-zinc-300" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-xl font-semibold text-white text-center mb-2 tracking-tight">
            Verify your email
          </h1>

          {/* Description */}
          <p className="text-sm text-zinc-400 text-center leading-relaxed mb-6">
            We’ve sent a secure verification link to your email address. Please
            open it to continue.
          </p>

          {/* Email pill */}
          <div className="flex justify-center mb-6">
            <span className="text-sm text-zinc-200 bg-zinc-800/70 border border-zinc-700 px-3 py-1.5 rounded-lg">
              {email}
            </span>
          </div>

          {/* Timer / Button */}
          {cooldown > 0 ? (
            <div className="text-center mb-4">
              <p className="text-sm text-zinc-500">
                You can request a new link in{" "}
                <span className="text-zinc-300 font-medium">
                  {formatTime(cooldown)}
                </span>
              </p>
            </div>
          ) : (
            <button
              onClick={handleResend}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-white text-black py-2 rounded-lg text-sm font-medium transition-all hover:bg-zinc-200 active:scale-[0.98] disabled:opacity-60"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Sending..." : "Resend email"}
            </button>
          )}

          {/* Footer */}
          <p className="text-xs text-zinc-500 text-center mt-6 leading-relaxed">
            Didn’t receive the email? Check your spam folder or wait a moment
            before trying again.
          </p>
        </div>
      </div>
    </div>
  );
}
