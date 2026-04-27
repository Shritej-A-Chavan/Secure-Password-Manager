"use client";

import AuthFooter from "../components/AuthFooter";
import AuthNavbar from "../components/AuthNavbar";
import SignupForm from "../components/SignupForm";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950">
      <AuthNavbar />
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 relative">
        {/* Background Glow */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="w-125 h-125 bg-purple-600/20 blur-[120px] rounded-full" />
        </div>

        <SignupForm />
      </div>

      <AuthFooter />
    </div>
  );
}
