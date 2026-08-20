"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  FolderGit2,
  Cpu,
  Briefcase,
  Inbox,
  Star,
  Image as ImageIcon,
  ShieldAlert,
  LogOut,
  ExternalLink,
  Clock,
  ShieldCheck,
  User,
  Menu,
  X,
} from "lucide-react";
import { getAdminToken, adminLogout } from "@/lib/adminApi";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Website Settings", href: "/admin/settings", icon: Settings },
  { label: "Projects & Cases", href: "/admin/projects", icon: FolderGit2 },
  { label: "Skills Matrix", href: "/admin/skills", icon: Cpu },
  { label: "Experience & Roles", href: "/admin/experience", icon: Briefcase },
  { label: "Contact Inbox", href: "/admin/inbox", icon: Inbox },
  { label: "Client Reviews", href: "/admin/reviews", icon: Star },
  { label: "Media Manager", href: "/admin/media", icon: ImageIcon },
  { label: "Audit & Security", href: "/admin/audit-logs", icon: ShieldAlert },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [time, setTime] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setIsAuthorized(true);
      return;
    }

    const token = getAdminToken();
    if (!token) {
      setIsAuthorized(false);
      router.push("/admin/login");
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, isLoginPage, router]);

  // Live Nepal Time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kathmandu",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await adminLogout();
    router.push("/admin/login");
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-xs font-mono">
        Authenticating administrator session...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row antialiased">
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-sm">
            D
          </div>
          <span className="font-bold text-sm tracking-tight text-white">
            Dhurba CMS
          </span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out md:static md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Logo & Administrator Identity */}
          <div className="p-6 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-500 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-blue-500/20">
                DD
              </div>
              <div className="space-y-0.5">
                <h2 className="font-extrabold text-sm text-white tracking-tight leading-none">
                  Dhurba Dhakal
                </h2>
                <div className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Single Admin</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group",
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4 transition-colors",
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-blue-400"
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800/80 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              <span>View Portfolio</span>
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-rose-950/40 border border-rose-900/50 text-rose-400 hover:bg-rose-900/30 text-xs font-bold transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Administrative Work Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Operational Status Header */}
        <header className="hidden md:flex items-center justify-between px-8 py-3.5 bg-slate-950/60 backdrop-blur-md border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-semibold">
              CMS Engine v1.0.0
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>Kathmandu (NPT): {time || "Loading..."}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Backend Connected</span>
            </div>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-900/90">
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
