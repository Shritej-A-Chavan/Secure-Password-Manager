"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Cloud, Key, EyeOff, Zap } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Client-Side Encryption",
    desc: "All passwords are encrypted in your browser before being stored, ensuring raw data is never exposed.",
  },
  {
    icon: EyeOff,
    title: "Zero-Knowledge Security",
    desc: "Encryption keys are derived on your device, ensuring that only you can access your vault—not even the server can read your data.",
  },
  {
    icon: Key,
    title: "Secure Password Generator",
    desc: "Generate strong, unique passwords instantly to eliminate weak credentials.",
  },
  {
    icon: Cloud,
    title: "Encrypted Cloud Storage",
    desc: "Your encrypted data is securely stored and synced using Supabase.",
  },
  {
    icon: Lock,
    title: "Session-Based Authentication",
    desc: "Secure access using JWT-based authentication with protected APIs.",
  },
  {
    icon: Zap,
    title: "Instant Access & Search",
    desc: "Quickly retrieve your credentials with fast client-side rendering and search capabilities.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative px-6 py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-medium tracking-tight"
        >
          Security Meets{" "}
          <span className="bg-linear-to-r from-cyan-200 to-cyan-400 bg-clip-text text-transparent">
            Simplicity
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg"
        >
          Everything you need to manage your digital secrets — designed for
          privacy, built for speed.
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, i) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative border border-white/10 rounded-2xl p-6 
              bg-white/5 backdrop-blur-xl 
              hover:border-cyan-400/40 transition overflow-hidden"
            >
              {/* Hower glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                <div className="absolute inset-0 bg-linear-to-br from-cyan-400/10 to-blue-500/10 blur-2xl" />
              </div>

              {/* Icon */}
              <div
                className="w-12 h-12 flex items-center justify-center rounded-xl 
              bg-linear-to-br from-cyan-400/20 to-blue-500/20 
              border border-white/10 mb-4"
              >
                <Icon className="text-cyan-400" size={22} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
