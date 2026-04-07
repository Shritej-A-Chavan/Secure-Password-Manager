"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Copy, Check } from "lucide-react";

export default function VaultCard() {
  const [visibleId, setVisibleId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const passwords = [
    { id: 1, name: "Google", value: "Pass123" },
    { id: 2, name: "Github", value: "Dev@456" },
    { id: 3, name: "Banking", value: "Secure@789" },
  ];

  useEffect(() => {
    if (visibleId !== null) {
      const timer = setTimeout(() => {
        setVisibleId(null);
      }, 12000);

      return () => clearTimeout(timer);
    }
  }, [visibleId]);

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const masked = (val: string) =>
    val.slice(0, 2) + "************" + val.slice(-2);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl overflow-hidden">
        <h3 className="text-white/80 mb-4">Vault Preview</h3>

        {/* Scrollable Vault */}
        <div className="space-y-3 overflow-y-auto pr-2">
          {passwords.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white/5 px-4 py-3 rounded-xl border border-white/10 hover:bg-white/10 transition"
            >
              <span className="text-sm text-white/70">{item.name}</span>

              <div className="flex items-center gap-3">
                <span className="text-cyan-400 tracking-widest text-sm">
                  {visibleId === item.id ? item.value : masked(item.value)}
                </span>

                {/* Eye */}
                <button
                  onClick={() =>
                    setVisibleId((prev) => (prev === item.id ? null : item.id))
                  }
                  className="text-white/60 hover:text-white"
                >
                  {visibleId === item.id ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

                {/* Copy */}
                <button
                  onClick={() => handleCopy(item.value, item.id)}
                  className="text-white/60 hover:text-white"
                >
                  {copiedId === item.id ? (
                    <Check size={18} className="text-green-400" />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer hint */}
        <p className="text-xs text-white/50 mt-3">
          Passwords are encrypted and revealed temporarily for security.
        </p>
      </div>

      {/* Glow */}
      <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl -z-10 rounded-full opacity-70 group-hover:opacity-100 transition" />
    </motion.div>
  )
}
