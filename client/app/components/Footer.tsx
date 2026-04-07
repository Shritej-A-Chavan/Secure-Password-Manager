"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { SiGithub, SiX } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="relative bg-black text-white border-t border-white/10 overflow-hidden">
      {/* Subtle Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-50 bg-white/10 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Start securing your passwords today.
          </h2>

          <p className="text-white/60 mb-6 max-w-lg mx-auto">
            Zero-knowledge encryption. No compromises. Built for people who care
            about security.
          </p>

          {/* Email */}
          <div className="flex justify-center">
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-2 py-2 backdrop-blur-lg focus-within:border-white/30 transition">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent outline-none px-4 text-sm w-52 md:w-72"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button className="flex items-center gap-2 bg-white text-black text-sm px-4 py-2 rounded-full hover:scale-105 transition">
                Subscribe <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-semibold mb-4">VaultX</h2>
            <p className="text-sm text-white/60 leading-relaxed">
              Secure password manager with zero-knowledge architecture and
              end-to-end encryption.
            </p>

            <div className="flex items-center gap-2 mt-4 text-green-400 text-xs">
              <ShieldCheck size={16} />
              End-to-End Encrypted
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white/80">
              Product
            </h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="hover:text-white cursor-pointer">Features</li>
              <li className="hover:text-white cursor-pointer">Vault</li>
              <li className="hover:text-white cursor-pointer">Security</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white/80">
              Company
            </h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="hover:text-white cursor-pointer">About</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-white/80">
              Connect
            </h3>

            <div className="flex gap-6">
              {[
                { icon: SiGithub, label: "GitHub", href: "#" },
                { icon: FaLinkedinIn, label: "LinkedIn", href: "#" },
                { icon: SiX, label: "X", href: "#" },
              ].map((item, i) => {
                const Icon = item.icon;

                return (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    className="group relative"
                  >
                    {/* Tooltip */}
                    <span
                      className="absolute -top-9 left-1/2 -translate-x-1/2 
                      opacity-0 group-hover:opacity-100 transition
                      text-xs bg-white text-black px-2 py-1 rounded-md"
                    >
                      {item.label}
                    </span>

                    <Icon
                      size={22}
                      className="text-white/60 group-hover:text-white 
                      transition-all duration-300 
                      group-hover:scale-125 group-hover:-translate-y-1"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between text-xs text-white/50">
          <p>© {new Date().getFullYear()} VaultX. All rights reserved.</p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <span className="hover:text-white cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
