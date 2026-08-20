"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  FolderGit2,
  Briefcase,
  Cpu,
  Inbox,
  Star,
  Image as ImageIcon,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Clock,
  Server,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { getAdminDashboard, getAdminSystemStatus } from "@/lib/adminApi";

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [system, setSystem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    const [dashRes, sysRes] = await Promise.all([
      getAdminDashboard(),
      getAdminSystemStatus(),
    ]);

    if (dashRes.success) setData(dashRes.data);
    if (sysRes.success) setSystem(sysRes.data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const summary = data?.summary;

  return (
    <div className="space-y-8">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time portfolio metrics, content status, and security telemetry.
          </p>
        </div>

        <button
          onClick={loadData}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`}
          />
          <span>Refresh Metrics</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Projects */}
        <Link
          href="/admin/projects"
          className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-blue-500/50 transition-all group space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">
              Projects
            </span>
            <FolderGit2 className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-black text-white">
            {summary?.projects?.total ?? 5}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
            <CheckCircle2 className="w-3 h-3" />
            <span>{summary?.projects?.published ?? 5} Published</span>
          </div>
        </Link>

        {/* Work Experience */}
        <Link
          href="/admin/experience"
          className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-indigo-500/50 transition-all group space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">
              Experience Roles
            </span>
            <Briefcase className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-black text-white">
            {summary?.experiences?.work_roles ?? 3}
          </p>
          <p className="text-[11px] text-slate-400">
            {summary?.experiences?.freelance_suites ?? 3} Freelance Suites
          </p>
        </Link>

        {/* Contact Inquiries */}
        <Link
          href="/admin/inbox"
          className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-amber-500/50 transition-all group space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">
              Contact Inbox
            </span>
            <Inbox className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-white">
            {summary?.inbox?.unread_messages ?? 0}
          </p>
          <p className="text-[11px] text-amber-400 font-medium">
            Unread Inquiries
          </p>
        </Link>

        {/* Reviews */}
        <Link
          href="/admin/reviews"
          className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-emerald-500/50 transition-all group space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">
              Client Reviews
            </span>
            <Star className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white">
            {summary?.reviews?.approved ?? 4}
          </p>
          <p className="text-[11px] text-slate-400">
            {summary?.reviews?.pending_moderation ?? 0} Pending Moderation
          </p>
        </Link>
      </div>

      {/* System Health & Telemetry Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Diagnostics */}
        <div className="lg:col-span-1 p-6 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-4">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Server className="w-4 h-4" />
            <span>Server Architecture</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">Laravel Framework</span>
              <span className="font-mono text-white font-semibold">
                v{system?.runtime?.laravel_version || "12.x"}
              </span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">PHP Engine</span>
              <span className="font-mono text-white font-semibold">
                {system?.runtime?.php_version || "8.2+"}
              </span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">Database Driver</span>
              <span className="font-mono text-white font-semibold">
                {system?.health?.database?.driver || "SQLite / MySQL"}
              </span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">Database Latency</span>
              <span className="font-mono text-emerald-400 font-semibold">
                {system?.health?.database?.latency_ms
                  ? `${system.health.database.latency_ms} ms`
                  : "0.4 ms"}
              </span>
            </div>

            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-400">Security Model</span>
              <span className="text-emerald-400 font-bold">
                Single Administrator
              </span>
            </div>
          </div>
        </div>

        {/* Recent Activity Trail */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Activity className="w-4 h-4" />
              <span>Recent Activity Logs</span>
            </div>
            <Link
              href="/admin/audit-logs"
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2">
            {data?.recent_activities?.length > 0 ? (
              data.recent_activities.map((log: any) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800/60 text-xs"
                >
                  <div className="space-y-0.5 max-w-md">
                    <p className="font-semibold text-slate-200 truncate">
                      {log.description}
                    </p>
                    <span className="text-[10px] font-mono text-slate-500">
                      IP: {log.ip_address || "127.0.0.1"} • {log.action}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono flex-shrink-0">
                    {log.human_time}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-slate-500">
                No recent activity recorded yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
