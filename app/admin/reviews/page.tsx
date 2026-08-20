"use client";

import React, { useEffect, useState } from "react";
import {
  Star,
  CheckCircle2,
  XCircle,
  Trash2,
  ShieldCheck,
  User,
  Building,
  Loader2,
  X,
  ThumbsUp,
} from "lucide-react";
import {
  getAdminReviews,
  toggleAdminReviewApproval,
  deleteAdminReview,
} from "@/lib/adminApi";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState("");

  const loadReviews = async () => {
    setIsLoading(true);
    const res = await getAdminReviews();
    if (res.success && res.data) setReviews(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleToggleApprove = async (id: number | string) => {
    const res = await toggleAdminReviewApproval(id);
    if (res.success) {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, is_approved: res.data.is_approved } : r
        )
      );
      setNotification("Review approval status updated.");
    }
  };

  const handleDelete = async (id: number | string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    const res = await deleteAdminReview(id);
    if (res.success) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
      setNotification("Review deleted.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Client Reviews &amp; Visitor Feedback
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Moderate, approve, and curate testimonials displayed on the public portfolio.
        </p>
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

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="md:col-span-2 p-12 text-center text-slate-500 text-xs">
            <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
            <span>Loading reviews...</span>
          </div>
        ) : reviews.length === 0 ? (
          <div className="md:col-span-2 p-12 text-center text-slate-500 text-xs">
            No reviews submitted yet.
          </div>
        ) : (
          reviews.map((r) => (
            <div
              key={r.id}
              className={`p-6 rounded-2xl bg-slate-950 border transition-all space-y-4 shadow-lg ${
                r.is_approved
                  ? "border-slate-800/80"
                  : "border-amber-800/60 bg-amber-950/10"
              }`}
            >
              {/* Reviewer Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-white text-base">
                      {r.reviewer_name}
                    </h3>
                    {r.is_verified && (
                      <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-blue-950 border border-blue-800 text-blue-400 font-medium">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">
                    {r.reviewer_role} • {r.company_or_context}
                  </p>
                  <p className="text-[11px] text-blue-400 font-mono">
                    Service: {r.service_used}
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold text-amber-300">
                    {r.rating}/5
                  </span>
                </div>
              </div>

              {/* Comment */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                &ldquo;{r.comment}&rdquo;
              </p>

              {/* Moderation Controls Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800/60 text-xs">
                <div className="flex items-center gap-1.5 text-slate-500 font-mono">
                  <ThumbsUp className="w-3.5 h-3.5 text-slate-400" />
                  <span>{r.likes_count || 1} Likes</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleApprove(r.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      r.is_approved
                        ? "bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900/40"
                        : "bg-amber-600 text-white hover:bg-amber-500"
                    }`}
                  >
                    {r.is_approved ? "Approved" : "Approve Now"}
                  </button>

                  <button
                    onClick={() => handleDelete(r.id)}
                    className="p-1.5 rounded-lg bg-rose-950/50 text-rose-400 hover:bg-rose-900/40 cursor-pointer"
                    title="Delete Review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
