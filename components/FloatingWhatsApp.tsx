"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  X,
  Send,
  MessageCircle,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils";

interface FloatingWhatsAppProps {
  phoneNumber?: string; // e.g. "9779800000000" (Nepal format)
  defaultMessage?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber = "9779800000000",
  defaultMessage = "Hi Dhurba, I visited your portfolio and would like to discuss a software project.",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState("");

  const quickMessages = [
    "Hi Dhurba, I'd like to discuss a website project.",
    "Looking for a Laravel / PHP Full-Stack Developer.",
    "Interested in freelance design & development work.",
  ];

  const handleLaunchWhatsApp = (textToSend?: string) => {
    const message = textToSend || customMsg || defaultMessage;
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const handleDirectCall = () => {
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
    window.location.href = `tel:+${cleanPhone}`;
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 select-none">
      {/* WhatsApp Popup Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 25 }}
            className="absolute bottom-16 right-0 w-[310px] sm:w-[360px] rounded-3xl bg-white border border-slate-200/90 shadow-2xl overflow-hidden mb-2 text-slate-900"
          >
            {/* WhatsApp Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 p-4 sm:p-5 text-white relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3.5 right-3.5 p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                aria-label="Close WhatsApp card"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-2 border-white bg-slate-900 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                    DD
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-emerald-600 animate-pulse" />
                </div>

                <div>
                  <h4 className="font-extrabold text-sm sm:text-base leading-tight">
                    Dhurba Dhakal
                  </h4>
                  <p className="text-[11px] text-emerald-100 font-medium">
                    Full Stack Developer • Online
                  </p>
                  <p className="text-[10px] text-emerald-200 flex items-center gap-1 mt-0.5 font-mono">
                    <Clock className="w-2.5 h-2.5" />
                    <span>Quick response time</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Box Body */}
            <div className="p-4 sm:p-5 bg-slate-50 space-y-3.5 max-h-[380px] overflow-y-auto">
              {/* Automated Welcome Bubble */}
              <div className="bg-white p-3.5 rounded-2xl rounded-tl-sm border border-slate-200/80 shadow-xs text-xs text-slate-700 leading-relaxed">
                <p className="font-semibold text-slate-900 mb-1 flex items-center gap-1">
                  <span>Namaste!</span>
                  <span>👋</span>
                </p>
                <p>
                  How can I help with your software development, Laravel backend, or website project today?
                </p>
              </div>

              {/* Quick Message Options */}
              <div className="space-y-1.5">
                <div className="text-[10.5px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                  Quick Prompts
                </div>
                <div className="space-y-1.5">
                  {quickMessages.map((msg, i) => (
                    <button
                      key={i}
                      onClick={() => handleLaunchWhatsApp(msg)}
                      className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200/80 hover:border-emerald-300 text-[11px] text-slate-700 font-medium transition-colors flex items-center justify-between group cursor-pointer shadow-2xs"
                    >
                      <span className="truncate pr-2">{msg}</span>
                      <Send className="w-3 h-3 text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Call & Custom Message Trigger */}
              <div className="pt-2 border-t border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customMsg}
                    onChange={(e) => setCustomMsg(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleLaunchWhatsApp()}
                    placeholder="Type custom message..."
                    className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-slate-200 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-900"
                  />
                  <button
                    onClick={() => handleLaunchWhatsApp()}
                    className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer flex-shrink-0"
                    title="Send to WhatsApp"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleLaunchWhatsApp()}
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Icons.WhatsApp className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={handleDirectCall}
                    className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Direct Call</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white shadow-xl cursor-pointer relative transition-all duration-300",
          isOpen
            ? "bg-slate-900 text-white rotate-90"
            : "bg-gradient-to-tr from-emerald-600 via-green-500 to-emerald-500 hover:from-emerald-500 hover:to-green-400 shadow-emerald-500/30 ring-4 ring-emerald-500/20"
        )}
        aria-label="Chat on WhatsApp or Direct Call"
        title="WhatsApp & Direct Call"
      >
        {/* Pulsing ring indicator */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white" />
          </span>
        )}

        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Icons.WhatsApp className="w-7 h-7 fill-white" />
        )}
      </motion.button>
    </div>
  );
};
