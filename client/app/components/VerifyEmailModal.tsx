"use client";

import { useRouter } from "next/navigation";

export default function VerifyEmailModal({
  email,
  open,
  onClose,
}: {
  email: string;
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="w-full max-w-md rounded-2xl bg-neutral-900 p-6 border border-neutral-800 shadow-xl">

        <h2 className="text-xl font-semibold text-white mb-2">
          Verify your email
        </h2>

        <p className="text-sm text-neutral-400 mb-6">
          Your account isn’t verified yet. Please verify your email to continue.
        </p>

        <div className="flex gap-3">
          <button
            onClick={() =>
              router.push(`/check-email?email=${email}`)
            }
            className="flex-1 bg-white text-black py-2 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Go to verification
          </button>

          <button
            onClick={onClose}
            className="flex-1 bg-neutral-800 text-white py-2 rounded-lg hover:bg-neutral-700 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}