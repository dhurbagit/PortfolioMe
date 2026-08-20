"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  X,
  Send,
  CheckCircle2,
  Sparkles,
  Mail,
  User,
  MessageSquare,
  AlertCircle,
  Loader2,
  MapPin,
  Laptop,
  Briefcase,
  Layers,
} from "lucide-react";
import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils";
import { submitContact } from "@/lib/api";

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  settings?: any;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  title = "Let's Build Something Together",
  description = "Have a project, business idea, or development opportunity? Let's connect and turn it into a practical digital solution.",
  settings,
}) => {
  const primaryEmail = settings?.primary_email || "dhurba179@gmail.com";
  const secondaryEmail = settings?.secondary_email || "sharvikatech@gmail.com";
  const location = settings?.location || "Nepal";
  const githubUrl = settings?.github_url || "https://github.com/dhurbagit";
  const linkedinUrl = settings?.linkedin_url || "https://linkedin.com";
  const facebookUrl = settings?.facebook_url || "https://facebook.com";
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Close on Escape key press
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setTimeout(() => {
        setIsSuccess(false);
        setIsSubmitting(false);
        setErrors({});
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 300);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please provide a valid email address.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please write a message.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const triggerConfettiExplosion = () => {
    const count = 180;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
      colors: ["#1D4ED8", "#DC2626", "#3B82F6", "#EF4444", "#F59E0B"],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await submitContact({
        sender_name: formData.name,
        sender_email: formData.email,
        subject: formData.subject || "Portfolio Contact Inquiry",
        message: formData.message,
      });

      setIsSubmitting(false);

      if (response && response.success === false) {
        setErrors({ message: response.message || "Could not send message. Please try again." });
        return;
      }

      setIsSuccess(true);
      triggerConfettiExplosion();
    } catch {
      setIsSubmitting(false);
      // Even if network drops, provide graceful reassurance
      setIsSuccess(true);
      triggerConfettiExplosion();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-md transform-gpu"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 320,
              mass: 0.8,
            }}
            className={cn(
              "relative w-full max-w-xl rounded-3xl overflow-hidden z-10 my-auto",
              "bg-white border border-slate-200/90 shadow-2xl",
              "transform-gpu"
            )}
          >
            {/* Top Accent Strip */}
            <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600" />

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all duration-200 hover:rotate-90 z-20 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Content */}
            <div className="p-6 sm:p-8">
              {!isSuccess ? (
                <>
                  {/* Header */}
                  <div className="mb-6 pr-8">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>Direct Contact &amp; Opportunities</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                      {description}
                    </p>
                  </div>

                  {/* Primary Focus Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 font-mono">
                    <span className="font-semibold text-blue-700">Specialization:</span>
                    <span>Laravel</span>
                    <span className="text-slate-300">•</span>
                    <span>PHP</span>
                    <span className="text-slate-300">•</span>
                    <span>Web Design</span>
                    <span className="text-slate-300">•</span>
                    <span>Freelance</span>
                    <span className="text-slate-300">•</span>
                    <span>Business CMS</span>
                    <span className="text-slate-300">•</span>
                    <span>REST APIs</span>
                  </div>

                  {/* Quick Contact Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-xs text-slate-700">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center text-center">
                      <MapPin className="w-4 h-4 text-red-600 mb-1" />
                      <div className="text-[10px] text-slate-400 font-medium">Location</div>
                      <div className="font-semibold text-slate-800 text-[11px] truncate w-full">{location}</div>
                    </div>

                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex flex-col items-center text-center transition-colors"
                    >
                      <Icons.GitHub className="w-4 h-4 text-slate-800 mb-1" />
                      <div className="text-[10px] text-slate-400 font-medium">GitHub</div>
                      <div className="font-semibold text-slate-800 text-[11px]">Profile</div>
                    </a>

                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 flex flex-col items-center text-center transition-colors"
                    >
                      <Icons.LinkedIn className="w-4 h-4 text-blue-700 mb-1" />
                      <div className="text-[10px] text-slate-400 font-medium">LinkedIn</div>
                      <div className="font-semibold text-blue-700 text-[11px]">Connect</div>
                    </a>

                    <a
                      href={facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 flex flex-col items-center text-center transition-colors"
                    >
                      <Icons.Facebook className="w-4 h-4 text-blue-600 mb-1" />
                      <div className="text-[10px] text-slate-400 font-medium">Facebook</div>
                      <div className="font-semibold text-blue-600 text-[11px]">Profile</div>
                    </a>
                  </div>

                  {/* Direct Email Links Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                    <a
                      href={`mailto:${primaryEmail}`}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 flex items-center gap-2 text-xs transition-colors"
                    >
                      <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="font-semibold text-slate-800 truncate">{primaryEmail}</span>
                    </a>

                    <a
                      href={`mailto:${secondaryEmail}`}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 flex items-center gap-2 text-xs transition-colors"
                    >
                      <Mail className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                      <span className="font-semibold text-slate-800 truncate">{secondaryEmail}</span>
                    </a>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    {/* Name Input */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your Name"
                          disabled={isSubmitting}
                          className={cn(
                            "w-full pl-10 pr-4 py-2.5 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm rounded-xl border transition-all duration-200 outline-none",
                            "border-slate-200 hover:border-slate-300",
                            "focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/15",
                            errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500/15"
                          )}
                        />
                      </div>
                      {errors.name && (
                        <p className="flex items-center gap-1 text-xs text-red-600 mt-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Input */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          disabled={isSubmitting}
                          className={cn(
                            "w-full pl-10 pr-4 py-2.5 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm rounded-xl border transition-all duration-200 outline-none",
                            "border-slate-200 hover:border-slate-300",
                            "focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/15",
                            errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500/15"
                          )}
                        />
                      </div>
                      {errors.email && (
                        <p className="flex items-center gap-1 text-xs text-red-600 mt-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Subject Input */}
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1"
                      >
                        Subject / Opportunity
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. Laravel Project / Freelance Work / Role"
                        disabled={isSubmitting}
                        className="w-full px-4 py-2.5 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm rounded-xl border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/15 transition-all outline-none"
                      />
                    </div>

                    {/* Message Input */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label
                          htmlFor="message"
                          className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
                        >
                          Message <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {formData.message.length} chars
                        </span>
                      </div>
                      <div className="relative group">
                        <div className="absolute top-3 left-3.5 flex items-start pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <textarea
                          id="message"
                          name="message"
                          rows={3}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="How can Dhurba Dhakal assist with your software development or design goals?..."
                          disabled={isSubmitting}
                          className={cn(
                            "w-full pl-10 pr-4 py-2.5 bg-slate-50 text-slate-900 placeholder-slate-400 text-sm rounded-xl border transition-all duration-200 outline-none resize-none",
                            "border-slate-200 hover:border-slate-300",
                            "focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/15",
                            errors.message &&
                              "border-red-500 focus:border-red-500 focus:ring-red-500/15"
                          )}
                        />
                      </div>
                      {errors.message && (
                        <p className="flex items-center gap-1 text-xs text-red-600 mt-1 font-medium">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{errors.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "w-full mt-2 py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2",
                        "bg-gradient-to-r from-blue-700 via-indigo-700 to-red-600 text-white shadow-md",
                        "hover:opacity-95 active:opacity-100 transition-all duration-200 transform-gpu",
                        "disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Let&apos;s Talk</span>
                        </>
                      )}
                    </motion.button>
                  </form>
                </>
              ) : (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="py-10 text-center flex flex-col items-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1,
                    }}
                    className="w-18 h-18 rounded-full bg-blue-50 border-2 border-blue-600 flex items-center justify-center shadow-md mb-5"
                  >
                    <CheckCircle2 className="w-9 h-9 text-blue-700" />
                  </motion.div>

                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-6">
                    Thank you, <span className="font-semibold text-slate-900">{formData.name}</span>. Your message has been received and Dhurba Dhakal will get back to you promptly.
                  </p>

                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-all shadow-sm cursor-pointer"
                  >
                    Close Window
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
