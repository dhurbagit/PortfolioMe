"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Send,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Mail,
  FileText,
  Download,
} from "lucide-react";
import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onOpenContact: () => void;
  onOpenResume: () => void;
  profile?: any;
  settings?: any;
}

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Freelance", href: "#freelance" },
  { name: "Design", href: "#design" },
  { name: "Education", href: "#education" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Reviews", href: "#feedback" },
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenContact,
  onOpenResume,
  profile,
  settings,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("about");

  const fullName = profile?.full_name || "Dhurba Dhakal";
  const initials =
    fullName
      .split(" ")
      .filter(Boolean)
      .map((n: string) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase() || "DD";

  const primaryTitle = profile?.primary_title || "Full Stack • Laravel";
  const shortTitle = primaryTitle.includes("|")
    ? primaryTitle.split("|")[0].trim()
    : primaryTitle.length > 26
    ? primaryTitle.substring(0, 24) + "..."
    : primaryTitle;

  const isAvailable = settings?.is_available_for_hire ?? true;

  const resolveUrl = (src?: string | null) => {
    if (!src) return null;
    if (src.startsWith("http://") || src.startsWith("https://")) return src;
    if (src.startsWith("/storage/")) return `http://localhost:8000${src}`;
    return `http://localhost:8000/storage/${src.replace(/^\/?storage\//, "")}`;
  };

  const avatarUrl = resolveUrl(profile?.avatar_url);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll-spy active section tracking
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-3 sm:py-4 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Floating Capsule Bar */}
        <div
          className={cn(
            "flex items-center justify-between px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300",
            scrolled
              ? "bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-card-soft ring-1 ring-slate-900/5"
              : "bg-white/75 backdrop-blur-md border border-slate-200/70 shadow-sm"
          )}
        >
          {/* Brand Logo & Live Status */}
          <a
            href="#about"
            className="flex items-center gap-2.5 group cursor-pointer pl-1"
          >
            <div className="relative">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-blue-700 via-indigo-600 to-red-600 p-[1.5px] shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarUrl}
                    alt={fullName}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-white font-black text-xs font-mono">
                    {initials}
                  </div>
                )}
              </div>
              <span
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white",
                  isAvailable ? "bg-emerald-500" : "bg-amber-500"
                )}
                title={settings?.availability_status || "Available for Projects"}
              />
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-xs sm:text-sm tracking-tight text-slate-900 leading-tight group-hover:text-blue-700 transition-colors">
                {fullName}
              </span>
              <span className="text-[9px] sm:text-[9.5px] font-semibold text-slate-500 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>{shortTitle}</span>
              </span>
            </div>
          </a>

          {/* Desktop Nav Links (Smart Capsule Pills) */}
          <nav className="hidden lg:flex items-center gap-0.5 bg-slate-100/90 border border-slate-200/80 px-1.5 py-1 rounded-full">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 relative",
                    isActive
                      ? "text-blue-700 bg-white shadow-xs font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                  )}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-2 pr-1">
            {/* Download CV Action Button (Desktop) */}
            <button
              onClick={onOpenResume}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 transition-all cursor-pointer shadow-2xs"
              title="View and Download CV"
            >
              <Download className="w-3.5 h-3.5 text-blue-700" />
              <span>CV</span>
            </button>

            {/* Let's Talk CTA Button */}
            <button
              onClick={onOpenContact}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold bg-gradient-to-r from-blue-700 via-indigo-700 to-red-600 hover:opacity-95 text-white shadow-sm transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Send className="w-3 h-3" />
              <span>Let&apos;s Talk</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 lg:hidden text-slate-700 hover:text-slate-900 rounded-full bg-slate-100 border border-slate-200 ml-1 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-2 p-4 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl space-y-3"
            >
              <div className="grid grid-cols-2 gap-1.5">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors",
                        isActive
                          ? "bg-blue-50 text-blue-700 font-bold border border-blue-200/70"
                          : "text-slate-700 hover:bg-slate-100"
                      )}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-3 h-3 opacity-40" />
                    </a>
                  );
                })}
              </div>

              {/* Mobile Actions: Download CV + Contact */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-blue-700" />
                  <span>Download CV</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-700 to-red-600 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Let&apos;s Talk</span>
                </button>
              </div>

              {/* Direct Quick Email Link in Mobile Menu */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <a
                  href="mailto:dhurba179@gmail.com"
                  className="flex items-center gap-1.5 text-slate-600 hover:text-blue-700 font-medium truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span className="truncate">dhurba179@gmail.com</span>
                </a>

                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/dhurbagit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-slate-100 text-slate-700"
                  >
                    <Icons.GitHub className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-slate-100 text-blue-700"
                  >
                    <Icons.LinkedIn className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
