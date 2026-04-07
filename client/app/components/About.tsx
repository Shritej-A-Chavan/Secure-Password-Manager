"use client";

import { motion } from "framer-motion";
import VaultCard from "./VaultCard";

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
            Built for{" "}
            <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Privacy First
            </span>{" "}
            Users
          </h2>

          <p className="text-white/70 text-lg leading-relaxed">
            VaultX is more than just a password manager. It’s a secure vault
            designed to give you full control over your digital identity.
          </p>

          <p className="text-white/60">
            Your passwords are encrypted, partially obfuscated, and only
            revealed temporarily — ensuring maximum protection even on screen.
          </p>

          <div className="flex gap-6 pt-4">
            {[
              { title: "256-bit", subtitle: "Encryption" },
              { title: "Zero", subtitle: "Tracking" },
              { title: "Temp", subtitle: "Reveal Access" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-semibold text-cyan-400">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm">{item.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* RIGHT - INSANE VAULT CARD */}
        <VaultCard />
      </div>
    </section>
  );
}
