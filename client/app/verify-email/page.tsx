"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { verifyEmail } from "@/services/emailVerification.service";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errMessage, setErrMessage] = useState("")

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    const verify = async () => {
      try {
        await verifyEmail(token);
        setStatus("success");
        toast.success("Email verified successfully");
      } catch (err: any) {
        const msg = err?.message || "Invalid or expired link"
        setStatus("error");
        toast.error("Verification failed", {
          description: msg
        });

        setErrMessage(msg)
      }
    };

    verify();
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl p-8 shadow-xl text-center">

        {status === "loading" && (
          <>
            <Loader2 className="mx-auto h-10 w-10 text-zinc-400 animate-spin" />
            <h2 className="mt-4 text-xl text-white">Verifying</h2>
            <p className="text-zinc-400 mt-2">
              Please wait while we verify your email
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 className="mx-auto h-10 w-10 text-green-500" />
            <h2 className="mt-4 text-xl text-white">Email Verified</h2>
            <p className="text-zinc-400 mt-2">
              Your email has been successfully verified
            </p>

            <Button
              onClick={() => (window.location.href = "/login")}
              className="mt-6 w-full bg-purple-600 hover:bg-purple-500"
            >
              Go to Login
            </Button>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="mx-auto h-10 w-10 text-red-500" />
            <h2 className="mt-4 text-xl text-white">Verification Failed</h2>
            <p className="text-zinc-400 mt-2">
              {errMessage}
            </p>

            <Button
              onClick={() => (window.location.href = "/signup")}
              className="mt-6 w-full bg-purple-600 hover:bg-purple-500"
            >
              Try Again
            </Button>
          </>
        )}

      </div>
    </div>
  );
}