"use client";

import React, { useEffect, useState } from "react";
import {
  ShieldAlert,
  Search,
  RefreshCw,
  Clock,
  User,
  Activity,
  Loader2,
  Lock,
  Server,
  CheckCircle2,
} from "lucide-react";
import { getAdminAuditLogs, getAdminSystemStatus } from "@/lib/adminApi";

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [system, setSystem] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    const [logRes, sysRes] = await Promise.all([
      getAdminAuditLogs(search),
      getAdminSystemStatus(),
    ]);

    if (logRes.success && logRes.data) setLogs(logRes.data);
    if (sysRes.success && sysRes.data) setSystem(sysRes.data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadData();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Audit Logs &amp; Security Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Immutable activity trail of all administrative logins, mutations, and submissions.
          </p>
        </div>

        <button
          onClick={loadData}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`}
          />
          <span>Refresh Trail</span>
        </button>
      </div>

      {/* Security Telemetry Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-950 border border-slate-800/80 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/80 flex items-center justify-center text-emerald-400">
            <Lock className="w-5 h-5" />
          </div>
          <div className="space-y-0.5 text-xs">
            <span className="text-slate-400">Authentication</span>
            <p className="font-bold text-white">Single-Admin Sanctum</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-800/80 flex items-center justify-center text-blue-400">
            <Server className="w-5 h-5" />
          </div>
          <div className="space-y-0.5 text-xs">
            <span className="text-slate-400">Security Headers</span>
            <p className="font-bold text-white">Strict CSP &amp; Anti-Sniff</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-800/80 flex items-center justify-center text-indigo-400">
            <Activity className="w-5 h-5" />
          </div>
          <div className="space-y-0.5 text-xs">
            <span className="text-slate-400">Database Engine</span>
            <p className="font-bold text-white">
              {system?.health?.database?.driver || "Operational"}
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search audit trail by description, action, or IP address..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer"
        >
          Search
        </button>
      </form>

      {/* Audit Logs Table */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800/80 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-mono border-b border-slate-800">
              <tr>
                <th className="p-4 font-semibold">Action &amp; Description</th>
                <th className="p-4 font-semibold">IP Address</th>
                <th className="p-4 font-semibold">User</th>
                <th className="p-4 font-semibold text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
                    <span>Loading audit records...</span>
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">
                    No audit logs matching query.
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-slate-900/40 transition-colors"
                  >
                    <td className="p-4 space-y-0.5">
                      <p className="font-semibold text-white">
                        {log.description}
                      </p>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-blue-400">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-slate-400">
                      {log.ip_address || "127.0.0.1"}
                    </td>
                    <td className="p-4 text-slate-400">
                      {log.user?.name || "System / Visitor"}
                    </td>
                    <td className="p-4 font-mono text-slate-400 text-right">
                      {new Date(log.created_at).toLocaleString("en-US", {
                        timeZone: "Asia/Kathmandu",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
