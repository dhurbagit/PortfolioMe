"use client";

import React, { useEffect, useState } from "react";
import {
  Inbox,
  Mail,
  Trash2,
  CheckCircle2,
  Clock,
  User,
  Phone,
  AlertCircle,
  Loader2,
  X,
  MessageSquare,
} from "lucide-react";
import {
  getAdminInbox,
  getAdminInboxDetail,
  updateAdminInboxStatus,
  deleteAdminInbox,
} from "@/lib/adminApi";

export default function AdminInboxPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState("");

  const loadInbox = async () => {
    setIsLoading(true);
    const res = await getAdminInbox(filterStatus);
    if (res.success && res.data) setMessages(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadInbox();
  }, [filterStatus]);

  const handleSelectMessage = async (id: number | string) => {
    const res = await getAdminInboxDetail(id);
    if (res.success && res.data) {
      setSelectedMessage(res.data);
      // Mark as read in state list
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: "read" } : m))
      );
    }
  };

  const handleUpdateStatus = async (id: number | string, newStatus: string) => {
    const res = await updateAdminInboxStatus(id, newStatus);
    if (res.success) {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
      );
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, status: newStatus });
      }
      setNotification(`Message marked as ${newStatus}.`);
    }
  };

  const handleDelete = async (id: number | string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    const res = await deleteAdminInbox(id);
    if (res.success) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
      setNotification("Message deleted.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Contact Submissions Inbox
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Read, filter, reply, and manage incoming visitor and client inquiries.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          {["", "unread", "read", "replied", "archived"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                filterStatus === st
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {st || "All"}
            </button>
          ))}
        </div>
      </div>

      {notification && (
        <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center justify-between">
          <span>{notification}</span>
          <button
            onClick={() => setNotification("")}
            className="text-emerald-400"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Inbox Grid: List & Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Messages List Column */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-950 border border-slate-800/80 overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>{messages.length} Messages</span>
          </div>

          <div className="divide-y divide-slate-800/60 max-h-[600px] overflow-y-auto">
            {isLoading ? (
              <div className="p-8 text-center text-slate-500 text-xs">
                <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
                <span>Loading inquiries...</span>
              </div>
            ) : messages.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">
                No messages found in this folder.
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  onClick={() => handleSelectMessage(m.id)}
                  className={`p-4 cursor-pointer transition-colors space-y-1.5 text-xs ${
                    selectedMessage?.id === m.id
                      ? "bg-blue-950/40 border-l-4 border-blue-500"
                      : m.status === "unread"
                      ? "bg-slate-900/80 font-bold"
                      : "hover:bg-slate-900/40 opacity-80"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">
                      {m.sender_name}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-mono uppercase ${
                        m.status === "unread"
                          ? "bg-amber-950 text-amber-300 border border-amber-800"
                          : m.status === "replied"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {m.status}
                    </span>
                  </div>
                  <p className="text-slate-300 line-clamp-1">
                    {m.subject || "No Subject"}
                  </p>
                  <p className="text-slate-500 line-clamp-1">{m.message}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Detail Column */}
        <div className="lg:col-span-7 rounded-2xl bg-slate-950 border border-slate-800/80 p-6 shadow-xl space-y-6">
          {selectedMessage ? (
            <>
              {/* Message Header */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-white">
                    {selectedMessage.subject || "Portfolio Contact Inquiry"}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-blue-400" />
                      {selectedMessage.sender_name}
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <Mail className="w-3.5 h-3.5 text-blue-400" />
                      {selectedMessage.sender_email}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="p-2 rounded-lg bg-rose-950/50 text-rose-400 hover:bg-rose-900/40 cursor-pointer"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message Content */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>

              {/* Status Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800 text-xs">
                <span className="text-slate-400">
                  IP: {selectedMessage.ip_address || "127.0.0.1"}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleUpdateStatus(selectedMessage.id, "replied")
                    }
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold cursor-pointer"
                  >
                    Mark as Replied
                  </button>
                  <button
                    onClick={() =>
                      handleUpdateStatus(selectedMessage.id, "archived")
                    }
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer"
                  >
                    Archive
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-slate-500 space-y-2 text-center">
              <MessageSquare className="w-8 h-8 stroke-1 text-slate-600" />
              <p className="text-sm">Select a message from the list to view.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
