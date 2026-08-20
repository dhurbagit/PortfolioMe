"use client";

import React, { useState } from "react";
import {
  Code2,
  ArrowUp,
  GraduationCap,
  Mail,
  MapPin,
  Check,
  Copy,
  Send,
  Download,
  Sparkles,
  Laptop,
} from "lucide-react";
import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils";

interface FooterProps {
  onOpenContact: () => void;
  onOpenResume: () => void;
  settings?: any;
  profile?: any;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenContact,
  onOpenResume,
  settings,
  profile,
}) => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const fullName = profile?.full_name || "Dhurba Dhakal";
  const primaryTitle = profile?.primary_title || "Full Stack Developer | Laravel & PHP Developer • Web Designer";
  const bio = profile?.short_bio || "Developing dependable web applications, custom CMS platforms, RESTful APIs, and scalable digital solutions tailored to real-world business workflows. Based in Nepal, collaborating worldwide.";
  const primaryEmail = settings?.primary_email || "dhurba179@gmail.com";
  const secondaryEmail = settings?.secondary_email || "sharvikatech@gmail.com";
  const location = settings?.location || "Nepal";
  const availability = settings?.availability_status || "Full-Time • Remote • Freelance Ready";
  const githubUrl = settings?.github_url || "https://github.com/dhurbagit";
  const linkedinUrl = settings?.linkedin_url || "https://linkedin.com";
  const facebookUrl = settings?.facebook_url || "https://facebook.com";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => {
      setCopiedEmail(null);
    }, 2000);
  };

  return (
    <footer className="relative w-full border-t border-slate-200 bg-slate-100/90 text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-14 relative z-10 space-y-10">
        
        {/* Main 2-Column Meaningful Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Brand & Professional Purpose (7 cols) */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-700 via-indigo-600 to-red-600 p-[1.5px] shadow-sm flex items-center justify-center flex-shrink-0">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-blue-700" />
                </div>
              </div>

              <div>
                <h3 className="font-extrabold text-xl text-slate-900 tracking-tight leading-tight">
                  {fullName}
                </h3>
                <p className="text-xs font-bold text-blue-700 mt-0.5">
                  {primaryTitle}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl font-medium">
              {bio}
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-white border border-emerald-200 px-3.5 py-1.5 rounded-full shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{availability}</span>
              </div>

              <button
                onClick={onOpenResume}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 transition-all cursor-pointer shadow-2xs hover:border-blue-300"
                title="View & Download Curriculum Vitae"
              >
                <Download className="w-3.5 h-3.5 text-blue-700" />
                <span>Download CV</span>
              </button>

              <button
                onClick={onOpenContact}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-blue-700 to-red-600 hover:opacity-95 text-white transition-all cursor-pointer shadow-2xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Let&apos;s Talk</span>
              </button>
            </div>
          </div>

          {/* Right Column: Direct Communication Hub & Socials (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Direct Inquiries</span>
              </span>
              <span className="text-[11px] text-slate-400 font-normal">UTC+5:45</span>
            </div>

            <div className="space-y-2">
              {/* Primary Email */}
              <div className="p-3 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 transition-all flex items-center justify-between group shadow-2xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 border border-blue-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-slate-400 font-semibold uppercase">
                      Personal / Direct
                    </div>
                    <a
                      href={`mailto:${primaryEmail}`}
                      className="text-xs font-bold text-slate-900 hover:text-blue-700 truncate block transition-colors"
                      title={`Send email to ${primaryEmail}`}
                    >
                      {primaryEmail}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(primaryEmail)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-blue-700 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all cursor-pointer flex-shrink-0"
                  title="Copy email address"
                >
                  {copiedEmail === primaryEmail ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Tech / Agency Email */}
              <div className="p-3 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-300 transition-all flex items-center justify-between group shadow-2xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center justify-center flex-shrink-0">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-slate-400 font-semibold uppercase">
                      Freelance / Tech
                    </div>
                    <a
                      href={`mailto:${secondaryEmail}`}
                      className="text-xs font-bold text-slate-900 hover:text-indigo-700 truncate block transition-colors"
                      title={`Send email to ${secondaryEmail}`}
                    >
                      {secondaryEmail}
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(secondaryEmail)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-700 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all cursor-pointer flex-shrink-0"
                  title="Copy email address"
                >
                  {copiedEmail === secondaryEmail ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Social Channels Row */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 transition-all shadow-2xs flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Icons.GitHub className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>

                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-blue-700 transition-all shadow-2xs flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Icons.LinkedIn className="w-3.5 h-3.5 text-blue-600" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-blue-600 transition-all shadow-2xs flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Icons.Facebook className="w-3.5 h-3.5 text-blue-600" />
                  <span>Facebook</span>
                </a>
              </div>

              <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                <span>{location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Education & Back to Top */}
        <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>© {new Date().getFullYear()} <strong className="text-slate-800 font-semibold">{fullName}</strong>. All rights reserved.</p>
            <span className="hidden sm:inline text-slate-300">•</span>
            <p className="flex items-center gap-1.5 font-medium text-slate-700">
              <GraduationCap className="w-3.5 h-3.5 text-blue-700" />
              <span>BSc IT — Lord Buddha Education Foundation</span>
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 transition-all cursor-pointer shadow-2xs"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
