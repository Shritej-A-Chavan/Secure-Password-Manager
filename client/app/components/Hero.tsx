"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-10 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center gap-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border border-white/10 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full text-sm text-gray-300 flex divide-x divide-white/10"
        >
          <span className="px-3">End-to-end encryption</span>
          <span className="px-3">Zero-knowledge architecture</span>
          <span className="px-3">Built for privacy</span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-medium tracking-tight leading-tight"
        >
          Your Digital Vault,
          <br />
          <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Secured to the Core
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-lg text-gray-400 max-w-3xl"
        >
          <p>
            Store, manage, and access your passwords and sensitive data with
            confidence.
          </p>
          <p>
            VaultX keeps everything encrypted, private, and always within your
            control.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-4"
        >
          <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-medium px-6 py-5 text-base transition">
            Get Started
          </Button>

          <Button
            variant="ghost"
            className="text-gray-300 font-medium px-6 py-5 text-base transition"
          >
            View Demo →
          </Button>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute flex gap-2 items-center bottom-6 text-gray-500 text-sm"
      >
        <ArrowDown /> Scroll
      </motion.div>
    </section>
  );
}
