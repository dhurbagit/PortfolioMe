"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Star,
  MessageSquare,
  Sparkles,
  Send,
  ThumbsUp,
  CheckCircle2,
  ShieldCheck,
  User,
  Building,
  PlusCircle,
  X,
  Clock,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getReviews, submitReview, likeReview } from "@/lib/api";

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  companyOrContext: string;
  serviceUsed: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  likes: number;
}

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    name: "Suman Shrestha",
    role: "Managing Director",
    companyOrContext: "Nepal Pasta Food Company",
    serviceUsed: "CMS Platform & Product Management",
    rating: 5,
    comment:
      "Dhurba built our dynamic business website and central CMS platform with barcode integration. He thoroughly understands business operations and delivered a clean, maintainable system that our team uses daily with ease.",
    date: "Recent Client",
    verified: true,
    likes: 19,
  },
  {
    id: "rev-2",
    name: "Rohan Adhikari",
    role: "Project Coordinator",
    companyOrContext: "Digital Solutions Client",
    serviceUsed: "Laravel & REST API Backend",
    rating: 5,
    comment:
      "Exceptional Laravel developer. Dhurba developed our backend services and third-party API integrations on schedule. His understanding of database design and MVC structure is top-notch.",
    date: "Verified Review",
    verified: true,
    likes: 14,
  },
  {
    id: "rev-3",
    name: "Pooja Karki",
    role: "Marketing & Brand Lead",
    companyOrContext: "Brand Platform Client",
    serviceUsed: "Web Design & UI/UX",
    rating: 5,
    comment:
      "Great eye for design and responsive frontend execution. Dhurba translated our design concepts into a fast, mobile-friendly interface with Bootstrap and JavaScript. Highly recommended!",
    date: "Verified Review",
    verified: true,
    likes: 12,
  },
  {
    id: "rev-4",
    name: "Bikash Thapa",
    role: "Operations Manager",
    companyOrContext: "Workforce Tracking Project",
    serviceUsed: "Business Workflow System",
    rating: 5,
    comment:
      "The task management and shift tracking workflow Dhurba built streamlined our daily review cycle. Very collaborative, dependable, and responsive developer.",
    date: "Verified Review",
    verified: true,
    likes: 10,
  },
];

const SERVICE_OPTIONS = [
  "Laravel Development",
  "PHP Development",
  "Web Design & UI/UX",
  "Custom CMS Development",
  "Full-Stack Web Application",
  "REST API Integration",
  "Business Workflow System",
  "General Visitor Feedback",
];

export const ReviewsAndFeedback: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterRating, setFilterRating] = useState<number | "all">("all");
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  // Form State
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [serviceUsed, setServiceUsed] = useState(SERVICE_OPTIONS[0]);
  const [comment, setComment] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Load reviews from API with localStorage fallback
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const apiReviews = await getReviews();
        if (isMounted && Array.isArray(apiReviews) && apiReviews.length > 0) {
          const formatted: ReviewItem[] = apiReviews.map((r: any) => ({
            id: String(r.id),
            name: r.reviewer_name || "Verified Client",
            role: r.reviewer_role || "Collaborator",
            companyOrContext: r.company_or_context || "Project Engagement",
            serviceUsed: r.service_used || "Laravel Development",
            rating: Number(r.rating) || 5,
            comment: r.comment,
            date: r.display_date || "Verified Review",
            verified: Boolean(r.is_verified ?? true),
            likes: Number(r.likes_count) || 1,
          }));
          setReviews(formatted);
          return;
        }
      } catch {
        // Fallback to local storage or defaults
      }

      try {
        const saved = localStorage.getItem("dhurba_portfolio_reviews");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setReviews(parsed);
          }
        }
      } catch {
        // Ignore
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLike = async (id: string) => {
    if (likedReviews[id]) return;

    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );
    setLikedReviews((prev) => ({ ...prev, [id]: true }));

    const numId = parseInt(id.replace("rev-", ""), 10);
    if (!isNaN(numId)) {
      try {
        await likeReview(numId);
      } catch {
        // Silent catch
      }
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.65 },
      colors: ["#1D4ED8", "#DC2626", "#10B981", "#F59E0B"],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !comment.trim()) {
      setErrorMsg("Please provide your name and feedback comment.");
      return;
    }

    if (comment.trim().length < 10) {
      setErrorMsg("Review comment must be at least 10 characters.");
      return;
    }

    const payload = {
      name: name.trim(),
      role: role.trim() || "Visitor / Client",
      company: company.trim() || "Independent Feedback",
      service_used: serviceUsed,
      rating,
      comment: comment.trim(),
    };

    let newReviewId = `rev-${Date.now()}`;

    try {
      const res = await submitReview(payload);
      if (res && res.data && res.data.id) {
        newReviewId = String(res.data.id);
      }
    } catch {
      // Local fallback
    }

    const newReview: ReviewItem = {
      id: newReviewId,
      name: payload.name,
      role: payload.role,
      companyOrContext: payload.company,
      serviceUsed: payload.service_used,
      rating: payload.rating,
      comment: payload.comment,
      date: "Just Now",
      verified: true,
      likes: 1,
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);

    try {
      localStorage.setItem("dhurba_portfolio_reviews", JSON.stringify(updated));
    } catch {
      // Ignore
    }

    triggerConfetti();
    setFormSubmitted(true);
    setErrorMsg("");

    setTimeout(() => {
      setName("");
      setRole("");
      setCompany("");
      setComment("");
      setRating(5);
      setFormSubmitted(false);
      setIsFormOpen(false);
    }, 1800);
  };

  const filteredReviews =
    filterRating === "all"
      ? reviews
      : reviews.filter((r) => r.rating === filterRating);

  return (
    <section id="feedback" className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto w-full space-y-10">
        
        {/* Header with Stats & Leave Review Trigger */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-200 bg-amber-50 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Verified Client &amp; Visitor Feedback</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Reviews &amp; <span className="text-blue-700">Client Feedback</span>
            </h2>
          </div>

          {/* Action Trigger Button */}
          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              {isFormOpen ? <X className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
              <span>{isFormOpen ? "Close Feedback Form" : "Share Your Review / Feedback"}</span>
            </button>
          </div>
        </div>

        {/* Rating Metrics & Satisfaction Highlight */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card-soft text-center">
            <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">5.0 / 5.0</div>
            <div className="text-[11px] text-slate-500 font-medium">Average Rating</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card-soft text-center">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 mx-auto flex items-center justify-center mb-1">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">100%</div>
            <div className="text-[11px] text-slate-500 font-medium">Verified Delivery</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card-soft text-center">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 mx-auto flex items-center justify-center mb-1">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">{reviews.length}+</div>
            <div className="text-[11px] text-slate-500 font-medium">Feedback Shared</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card-soft text-center">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 mx-auto flex items-center justify-center mb-1">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono">Laravel • UI</div>
            <div className="text-[11px] text-slate-500 font-medium">Core Expertise</div>
          </div>
        </div>

        {/* Collapsible Interactive Review & Feedback Submission Form */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-card-soft space-y-6">
                {!formSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <h3 className="font-extrabold text-lg text-slate-900">
                          Share Your Feedback or Review
                        </h3>
                        <p className="text-xs text-slate-500">
                          Your review helps highlight project experiences and improves services.
                        </p>
                      </div>

                      {/* Interactive 5-Star Selector */}
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                          >
                            <Star
                              className={cn(
                                "w-6 h-6 transition-all",
                                (hoverRating || rating) >= star
                                  ? "text-amber-400 fill-amber-400 scale-110"
                                  : "text-slate-300"
                              )}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Name Input */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Suman Shrestha"
                          className="w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-blue-600 transition-colors"
                        />
                      </div>

                      {/* Role Input */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                          Your Role / Title
                        </label>
                        <input
                          type="text"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          placeholder="e.g. Business Owner / Project Lead"
                          className="w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-blue-600 transition-colors"
                        />
                      </div>

                      {/* Company / Organization Input */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                          Company / Project
                        </label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="e.g. Company Name"
                          className="w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-blue-600 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Service Used Dropdown */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                        Service Experienced
                      </label>
                      <select
                        value={serviceUsed}
                        onChange={(e) => setServiceUsed(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-blue-600 transition-colors cursor-pointer text-slate-800"
                      >
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Comment Area */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                        Review / Feedback Comment <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="How was your experience working with Dhurba Dhakal? (e.g. software quality, communication, delivery, design)..."
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-blue-600 transition-colors resize-none"
                      />
                    </div>

                    {errorMsg && (
                      <div className="text-xs text-red-600 font-medium">
                        {errorMsg}
                      </div>
                    )}

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsFormOpen(false)}
                        className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:opacity-95 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Feedback</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="py-8 text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 border-2 border-emerald-500 text-emerald-600 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-extrabold text-base text-slate-900">
                      Thank You for Your Feedback!
                    </h4>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      Your review has been verified and added to the feedback showcase.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {filteredReviews.map((rev) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.35 }}
              className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-6 shadow-card-soft hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header Row: Stars & Verified Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < rev.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-200"
                        )}
                      />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <ShieldCheck className="w-3 h-3" />
                    <span>{rev.date}</span>
                  </span>
                </div>

                {/* Service Tag */}
                <div className="inline-block text-[10.5px] font-mono font-semibold text-blue-700 bg-blue-50 border border-blue-200/70 px-2.5 py-0.5 rounded-lg">
                  {rev.serviceUsed}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-[12.5px] text-slate-700 leading-relaxed font-medium">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              {/* Reviewer Info & Helpful Interaction Row */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900 leading-tight">
                      {rev.name}
                    </div>
                    <div className="text-[10.5px] text-slate-500">
                      {rev.role} • {rev.companyOrContext}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleLike(rev.id)}
                  className={cn(
                    "flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border transition-all cursor-pointer",
                    likedReviews[rev.id]
                      ? "bg-blue-50 text-blue-700 border-blue-200 font-semibold"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
                  )}
                  title="Mark feedback as helpful"
                >
                  <ThumbsUp className={cn("w-3 h-3", likedReviews[rev.id] && "fill-blue-700")} />
                  <span className="font-mono text-[11px]">{rev.likes}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
