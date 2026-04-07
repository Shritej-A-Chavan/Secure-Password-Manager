"use client";

import { motion } from "framer-motion";
import { Mail, ShieldCheck } from "lucide-react";
import { SiGithub, SiX } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    email: "",
    message: "",
  });

  return (
    <section
      id="contact"
      className="relative bg-black text-white py-24 border-t border-white/10"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Contact Us
          </h2>

          <p className="text-white/60 max-w-xl mx-auto">
            Have questions about security, features, or early access? We’re here
            to help.
          </p>

          <div className="flex items-center justify-center gap-2 mt-4 text-green-400 text-xs">
            <ShieldCheck size={16} />
            We typically respond within 24 hours
          </div>
        </motion.div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left - Contact Info */}
          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-white/60" />
              <span className="text-white/70 text-sm">support@vaultx.dev</span>
            </div>

            {/* Socials */}
            <div className="flex gap-6 mt-4">
              <SiGithub className="text-white/60 hover:text-white transition cursor-pointer" />
              <FaLinkedinIn className="text-white/60 hover:text-white transition cursor-pointer" />
              <SiX className="text-white/60 hover:text-white transition cursor-pointer" />
            </div>

            <p className="text-xs text-white/40 mt-6">
              For security-related concerns, please mention “Security” in
              subject line.
            </p>
          </div>

          {/* Right - Form */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-lg">
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-md px-4 py-2 text-sm outline-none focus:border-white/30"
              />

              <textarea
                placeholder="Your message"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-md px-4 py-2 text-sm outline-none focus:border-white/30"
              />

              <button className="w-full bg-white text-black py-2 rounded-md text-sm hover:scale-[1.02] transition">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
