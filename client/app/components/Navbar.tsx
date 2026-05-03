"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { logout } from "@/services/logout.service";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";

const sections = ["home", "about", "features", "contact"];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);
  const clearAuth = useAuthStore((state) => state.clearAuth)

  const router = useRouter();

  // Smooth Scroll
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = -60;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  // Scroll blur effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section detection (FIXED)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0,
      },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Animated underline movement
  useEffect(() => {
    const activeEl = document.querySelector(`[data-id="${active}"]`);
    if (activeEl && indicatorRef.current) {
      const rect = activeEl.getBoundingClientRect();
      const parentRect = navRef.current?.getBoundingClientRect();

      if (!parentRect) return;

      indicatorRef.current.style.width = `${rect.width}px`;
      indicatorRef.current.style.transform = `translateX(${
        rect.left - parentRect.left
      }px)`;
    }
  }, [active]);

  function loginHandler() {
    router.push("/login")
  }

  function signupHandler() {
    router.push("/signup") 
  }

  function profileHandler() {
    router.push("/profile")
  }

  async function logoutHandler() {
    try {
      await logout()
      clearAuth()
      router.push("/")
      router.refresh()
    } catch(error: any) {
      toast.error(error.message)
    }
  }

  if (loading) {
    return (
      <nav>
        Loading...
      </nav>
    );
  }

  return (
    <nav className="fixed top-6 z-50 w-full flex justify-center px-4">
      <div
        className={`w-full max-w-6xl px-6 py-3 rounded-full border transition-all duration-300 relative
        ${
          scrolled
            ? "bg-white/10 backdrop-blur-2xl border-white/20 shadow-lg shadow-black/40"
            : "bg-white/5 backdrop-blur-md border-white/10"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => scrollToSection("home")}
            className="text-lg font-semibold cursor-pointer"
          >
            <span className="bg-linear-to-r from-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              VaultX
            </span>
          </div>

          {/* Desktop Links */}
          <div
            ref={navRef}
            className="hidden md:flex items-center gap-8 relative"
          >
            {sections.map((sec) => (
              <button
                key={sec}
                data-id={sec}
                onClick={() => scrollToSection(sec)}
                className={`relative font-medium capitalize transition-all duration-300
                ${
                  active === sec
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {sec}
              </button>
            ))}

            {/* Sliding Indicator */}
            <span
              ref={indicatorRef}
              className="absolute -bottom-1 h-0.5 bg-cyan-400 rounded-full transition-all duration-300"
              style={{ width: 0 }}
            />
          </div>

          {/* Buttons */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" className="text-gray-300" onClick={profileHandler} >
                Profile
              </Button>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-black" onClick={logoutHandler}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" className="text-gray-300" onClick={loginHandler}>
                Login
              </Button>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-black" onClick={signupHandler}>
                Sign up
              </Button>
            </div>
          )}

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (UPGRADED) */}
      {open && (
        <div
          className="absolute top-20 w-[92%] max-w-md mx-auto 
        bg-black/90 backdrop-blur-2xl border border-white/10 
        rounded-2xl p-6 flex flex-col gap-6 md:hidden animate-in fade-in zoom-in-95"
        >
          {sections.map((sec) => (
            <button
              key={sec}
              onClick={() => {
                scrollToSection(sec);
                setOpen(false);
              }}
              className={`text-lg capitalize transition
              ${active === sec ? "text-cyan-400" : "text-gray-300"}`}
            >
              {sec}
            </button>
          ))}


          {isAuthenticated ? (
            <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
              <Button variant="ghost" onClick={profileHandler}>Profile</Button>
              <Button className="bg-cyan-500 text-black" onClick={logoutHandler}>Logout</Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
              <Button variant="ghost" onClick={loginHandler}>Login</Button>
              <Button className="bg-cyan-500 text-black" onClick={signupHandler}>Sign up</Button>
            </div>
          )}
        </div>
      )}

      {/* Glow */}
      <div className="absolute inset-0 -z-10 flex justify-center pointer-events-none">
        <div className="w-[60%] h-20 bg-cyan-500/10 blur-3xl rounded-full" />
      </div>
    </nav>
  );
}
