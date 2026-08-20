"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  MapPin,
  Briefcase,
  GraduationCap,
  Clock,
  Send,
  Code2,
  Share2,
  MessageSquare,
  ThumbsUp,
  Globe,
  Bookmark,
  Sparkles,
  Palette,
  Laptop,
  ArrowRight,
  Layers,
  Building2,
  Server,
  Database,
  Workflow,
  Wrench,
  Download,
} from "lucide-react";
import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils";

interface HeroProps {
  onOpenContact: () => void;
  onOpenResume: () => void;
  profile?: any;
  settings?: any;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenContact,
  onOpenResume,
  profile,
  settings,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<"about" | "journey" | "stack">("about");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(48);

  const fullName = profile?.full_name || "Dhurba Dhakal";
  const primaryTitle = profile?.primary_title || "Full Stack Developer | Laravel & PHP Developer";
  const secondaryTitle = profile?.secondary_title || "Web Designer • Freelancer • Software Developer";
  const location = settings?.location || "Nepal";
  const availability = settings?.availability_status || "Full-Time • Remote • Freelance Ready";
  const shortBio = profile?.short_bio || "Software Developer and Web Designer with 2+ years of professional software development experience specializing in PHP and Laravel applications.";
  const githubUrl = settings?.github_url || "https://github.com/dhurbagit";
  const linkedinUrl = settings?.linkedin_url || "https://linkedin.com";
  const facebookUrl = settings?.facebook_url || "https://facebook.com";

  const resolveUrl = (url?: string) => {
    if (!url) return null;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    if (url.startsWith("/storage/")) return `http://localhost:8000${url}`;
    return url;
  };

  const avatarSrc = resolveUrl(profile?.avatar_url);
  const coverSrc = resolveUrl(profile?.cover_url);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  return (
    <section id="about" className="relative w-full pt-24 sm:pt-28 pb-14 sm:pb-16 px-4 sm:px-6 lg:px-8 xl:px-12 overflow-hidden bg-slate-50/80">
      {/* Background Decorative Matrix */}
      <div className="absolute inset-0 bg-light-grid opacity-50 pointer-events-none" />
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-red-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full space-y-8 relative z-10">
        {/* 1. Main Facebook-Style Profile Card Container */}
        <div className="bg-white border border-slate-200/90 rounded-3xl shadow-card-soft overflow-hidden">
          
          {/* Cover Photo Banner (Facebook / LinkedIn Style) */}
          <div className="relative h-44 sm:h-64 w-full bg-gradient-to-r from-blue-700 via-indigo-700 to-red-600 overflow-hidden">
            {coverSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={coverSrc}
                alt="Profile Cover Banner"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-light-grid opacity-20" />
                <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />
              </>
            )}

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

            {/* Top-Right Status Badge */}
            <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-6 bg-slate-950/80 backdrop-blur-md border border-white/20 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-white text-[11px] sm:text-xs font-mono flex items-center gap-2 shadow-md z-10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{availability}</span>
            </div>
          </div>

          {/* Profile Header Area */}
          <div className="px-5 sm:px-8 pb-6 border-b border-slate-200 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              
              {/* Avatar & Name Info Group */}
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
                
                {/* Profile Avatar (Facebook / LinkedIn Style) */}
                <div className="-mt-16 sm:-mt-22 relative flex-shrink-0 z-10">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white bg-gradient-to-br from-blue-600 via-indigo-600 to-red-600 p-1 shadow-2xl flex items-center justify-center overflow-hidden bg-slate-900">
                    {avatarSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={avatarSrc}
                        alt={fullName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white font-extrabold text-2xl sm:text-3xl tracking-wider">
                        DD
                      </div>
                    )}
                  </div>
                  <div
                    className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-sm"
                    title="Available for Opportunities"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  </div>
                </div>

                {/* Name, Main Title, Secondary Title, and Location */}
                <div className="mt-1 sm:mt-0 sm:pb-1">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5">
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {fullName}
                    </h1>
                    <span title="Verified Developer Profile">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 fill-blue-50" />
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-blue-700 mt-0.5">
                    {primaryTitle}
                  </p>

                  <p className="text-[11px] sm:text-xs font-semibold text-slate-600 mt-0.5">
                    {secondaryTitle}
                  </p>

                  <p className="text-[11px] sm:text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1 mt-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-red-600" />
                    <span>{location} • 2+ Years Experience • {availability}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:pb-1">
                <button
                  onClick={onOpenResume}
                  className="px-4 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  title="View and Download CV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CV</span>
                </button>

                <button
                  onClick={onOpenContact}
                  className="px-4 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Let&apos;s Connect</span>
                </button>

                <a
                  href="#projects"
                  className="px-4 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm transition-all border border-slate-200 flex items-center gap-1.5"
                >
                  <Code2 className="w-3.5 h-3.5 text-blue-700" />
                  <span>View My Work</span>
                </a>

                {/* Social Quick Links */}
                <div className="flex items-center gap-1">
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors border border-slate-200"
                    aria-label="Facebook Profile"
                    title="Facebook"
                  >
                    <Icons.Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors border border-slate-200"
                    aria-label="GitHub Profile"
                    title="GitHub"
                  >
                    <Icons.GitHub className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 sm:p-2.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-700 transition-colors border border-slate-200"
                    aria-label="LinkedIn Profile"
                    title="LinkedIn"
                  >
                    <Icons.LinkedIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-Navigation Tabs */}
          <div className="flex items-center gap-2 px-5 sm:px-8 py-2 bg-slate-50/80 border-b border-slate-200 overflow-x-auto text-xs font-semibold text-slate-600">
            <button
              onClick={() => setActiveSubTab("about")}
              className={cn(
                "px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5",
                activeSubTab === "about"
                  ? "bg-white text-blue-700 font-bold shadow-sm border border-slate-200"
                  : "hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <span>About Me &amp; Story</span>
            </button>
            <button
              onClick={() => setActiveSubTab("journey")}
              className={cn(
                "px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5",
                activeSubTab === "journey"
                  ? "bg-white text-blue-700 font-bold shadow-sm border border-slate-200"
                  : "hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <span>Career Journey</span>
              <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-md border border-blue-100">
                Timeline
              </span>
            </button>
            <button
              onClick={() => setActiveSubTab("stack")}
              className={cn(
                "px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5",
                activeSubTab === "stack"
                  ? "bg-white text-blue-700 font-bold shadow-sm border border-slate-200"
                  : "hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <span>Tech Specialization</span>
              <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded-md border border-blue-100">
                Matrix
              </span>
            </button>
          </div>

          {/* Profile Content Grid */}
          <div className="p-5 sm:p-7 bg-slate-100/60">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
              
              {/* Left Column: Intro Sidebar (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3.5">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">Intro</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    I build practical, scalable and business-focused digital solutions using Laravel, PHP and modern full-stack technologies — combining development, design and real-world business understanding.
                  </p>

                  <div className="pt-3 border-t border-slate-100 space-y-2.5 text-xs text-slate-700">
                    <div className="flex items-start gap-2.5">
                      <Briefcase className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
                      <span>
                        Developer at <strong className="text-slate-900">Nepal Digital Payment Company Limited</strong>
                      </span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Laptop className="w-4 h-4 text-indigo-600 flex-shrink-0 mt-0.5" />
                      <span>
                        Freelance <strong className="text-slate-900">Developer &amp; Web Designer</strong>
                      </span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <GraduationCap className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                      <span>
                        Studied <strong className="text-slate-900">BSc IT</strong> at <strong className="text-slate-900">Lord Buddha Education Foundation</strong>
                      </span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                      <span>
                        Lives in <strong className="text-slate-900">Nepal</strong> (Full-Time • Remote • Freelance)
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <button
                      onClick={onOpenContact}
                      className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Send Direct Message</span>
                    </button>
                  </div>
                </div>

                {/* Core Specialization Pills */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900">Core Stack</h3>
                    <a href="#skills" className="text-[11px] text-blue-700 font-semibold hover:underline">
                      View Full Matrix
                    </a>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Laravel",
                      "PHP",
                      "MySQL",
                      "REST APIs",
                      "JavaScript",
                      "HTML5/CSS3",
                      "Bootstrap 5",
                      "jQuery",
                      "AJAX",
                      "React.js",
                      "Next.js",
                      "Node.js",
                      "PostgreSQL",
                      "Docker",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="text-[10.5px] font-mono px-2.5 py-0.5 rounded-lg bg-slate-50 text-slate-700 border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Sub-Tab Switcher (7 cols) */}
              <div className="lg:col-span-7">
                <AnimatePresence mode="wait">
                  
                  {/* TAB 1: About Me & Pinned Story */}
                  {activeSubTab === "about" && (
                    <motion.div
                      key="about"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4"
                    >
                      {/* Post Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-700 to-red-600 p-[1.5px] flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {avatarSrc ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={avatarSrc}
                                alt={fullName}
                                className="w-full h-full object-cover rounded-full"
                              />
                            ) : (
                              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xs font-mono">
                                {fullName
                                  .split(" ")
                                  .filter(Boolean)
                                  .map((n: string) => n[0])
                                  .join("")
                                  .substring(0, 2)
                                  .toUpperCase() || "DD"}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="font-bold text-xs sm:text-sm text-slate-900">{fullName}</span>
                              <CheckCircle2 className="w-4 h-4 text-blue-600 fill-blue-50" />
                            </div>
                            <div className="flex items-center gap-1 text-[11px] text-slate-500">
                              <span>Professional Developer Profile</span>
                              <span>•</span>
                              <Globe className="w-3 h-3 text-slate-400" />
                              <span>Public</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-1.5 text-slate-400 rounded-lg hover:bg-slate-100">
                          <Bookmark className="w-4 h-4 text-blue-600 fill-blue-50" />
                        </div>
                      </div>

                      {/* Post Text / About Me Narrative */}
                      <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2.5">
                        <p>{shortBio}</p>
                        <p className="text-slate-600 text-xs">
                          My journey spans working as a <span className="font-semibold text-slate-800">Senior IT Manager</span> at Nepal Pasta Food Company, a <span className="font-semibold text-slate-800">Web Designer and Developer</span> at Nector Digit, and currently as a <span className="font-semibold text-slate-800">Developer</span> at Nepal Digital Payment Company Limited.
                        </p>
                      </div>

                      {/* Post Code Card */}
                      <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between text-[10.5px] sm:text-[11px] text-slate-400 pb-1.5 border-b border-slate-800">
                          <span className="text-blue-400">⚡ Developer Mission</span>
                          <span className="text-emerald-400 font-semibold">Development + Design + Business</span>
                        </div>
                        <div className="text-[11px] sm:text-[11.5px] leading-relaxed text-slate-300 overflow-x-auto">
                          <span className="text-purple-400">const</span> developer = &#123;
                          <br />
                          &nbsp;&nbsp;name: <span className="text-amber-300">&quot;{fullName}&quot;</span>,
                          <br />
                          &nbsp;&nbsp;specialization: [<span className="text-amber-300">&quot;Laravel&quot;</span>, <span className="text-amber-300">&quot;PHP&quot;</span>, <span className="text-amber-300">&quot;MySQL&quot;</span>, <span className="text-amber-300">&quot;REST APIs&quot;</span>],
                          <br />
                          &nbsp;&nbsp;design: [<span className="text-amber-300">&quot;UI/UX&quot;</span>, <span className="text-amber-300">&quot;Responsive Design&quot;</span>, <span className="text-amber-300">&quot;CMS Interfaces&quot;</span>],
                          <br />
                          &nbsp;&nbsp;roles: [<span className="text-emerald-300">&quot;Developer&quot;</span>, <span className="text-emerald-300">&quot;Designer&quot;</span>, <span className="text-emerald-300">&quot;Freelancer&quot;</span>]
                          <br />
                          &#125;;
                        </div>
                      </div>

                      {/* Post Reactions */}
                      <div className="flex items-center justify-between pt-2 text-xs text-slate-500 border-t border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px]">
                            <ThumbsUp className="w-3 h-3" />
                          </span>
                          <span className="font-semibold text-slate-700 text-[11px] sm:text-xs">{likeCount} endorsements</span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 text-[10.5px] sm:text-[11px]">
                          <a href="#experience" className="hover:underline text-blue-700 font-medium">
                            3 Roles
                          </a>
                          <span>•</span>
                          <a href="#projects" className="hover:underline text-blue-700 font-medium">
                            Featured Projects
                          </a>
                        </div>
                      </div>

                      {/* Reaction Bar */}
                      <div className="grid grid-cols-3 gap-1 pt-1 border-t border-slate-100 text-xs text-slate-600 font-semibold">
                        <button
                          onClick={handleLike}
                          className={cn(
                            "py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-xs",
                            isLiked
                              ? "bg-blue-50 text-blue-700"
                              : "hover:bg-slate-100 text-slate-600"
                          )}
                        >
                          <ThumbsUp className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4", isLiked && "fill-blue-700")} />
                          <span>{isLiked ? "Endorsed" : "Endorse"}</span>
                        </button>

                        <button
                          onClick={onOpenContact}
                          className="py-2 rounded-xl hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-slate-600 text-xs"
                        >
                          <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
                          <span>Message</span>
                        </button>

                        <a
                          href="#projects"
                          className="py-2 rounded-xl hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-colors text-slate-600 text-xs"
                        >
                          <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500" />
                          <span>Projects</span>
                        </a>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: Career Journey Detailed Milestones Feed */}
                  {activeSubTab === "journey" && (
                    <motion.div
                      key="journey"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div>
                          <h3 className="font-bold text-sm sm:text-base text-slate-900">Career Journey &amp; Milestones</h3>
                          <p className="text-xs text-slate-500">Chronological track of software engineering &amp; IT leadership</p>
                        </div>
                        <a
                          href="#experience"
                          className="text-xs font-semibold text-blue-700 hover:underline flex items-center gap-1"
                        >
                          <span>Full Slider</span>
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="space-y-4 text-xs">
                        {/* Milestone 1: NDPC */}
                        <div className="p-3.5 rounded-xl bg-blue-50/40 border border-blue-100 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 text-xs sm:text-sm">
                              Developer — Nepal Digital Payment Company Limited
                            </span>
                            <span className="font-mono text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              Currently Working
                            </span>
                          </div>
                          <p className="text-slate-600 leading-relaxed">
                            Web application development, transactional infrastructure, PHP/Laravel backend logic, database solutions, and RESTful API integrations.
                          </p>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {["PHP", "Laravel", "MySQL", "APIs", "Git"].map((t) => (
                              <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Milestone 2: Nector Digit */}
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 text-xs sm:text-sm">
                              Web Designer &amp; Developer — Nector Digit
                            </span>
                            <span className="font-mono text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                              Previous Role
                            </span>
                          </div>
                          <p className="text-slate-600 leading-relaxed">
                            Frontend website design, UI implementation, responsive layouts across devices, Bootstrap, JavaScript, jQuery, AJAX, and custom CMS integration.
                          </p>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {["HTML5", "CSS3", "JavaScript", "Bootstrap", "jQuery", "AJAX", "PHP"].map((t) => (
                              <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Milestone 3: Nepal Pasta */}
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 text-xs sm:text-sm">
                              Senior IT Manager — Nepal Pasta Food Company
                            </span>
                            <span className="font-mono text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-full border border-slate-200">
                              Previous Role
                            </span>
                          </div>
                          <p className="text-slate-600 leading-relaxed">
                            IT operations management, digital systems oversight, CMS administration, product information catalogs, SEO, and business system planning.
                          </p>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {["Laravel", "PHP", "MySQL", "CMS", "SEO", "Digital Systems"].map((t) => (
                              <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Milestone 4: Education */}
                        <div className="p-3 rounded-xl bg-slate-50/60 border border-slate-200/60 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-blue-700" />
                            <span className="font-semibold text-slate-800">
                              BSc IT — Lord Buddha Education Foundation
                            </span>
                          </div>
                          <span className="font-mono text-[10px] text-slate-500">Degree</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: Tech Specialization Matrix */}
                  {activeSubTab === "stack" && (
                    <motion.div
                      key="stack"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div>
                          <h3 className="font-bold text-sm sm:text-base text-slate-900">Technical Specialization</h3>
                          <p className="text-xs text-slate-500">Core strengths &amp; modern engineering stack</p>
                        </div>
                        <a
                          href="#skills"
                          className="text-xs font-semibold text-blue-700 hover:underline flex items-center gap-1"
                        >
                          <span>Full Matrix</span>
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>

                      {/* Primary Stack Group */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-blue-700 uppercase tracking-wider font-mono">
                            ⚡ Strong / Primary Specialization
                          </span>
                          <span className="text-[10.5px] text-slate-500 font-mono">Production Grade</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-blue-50/30 border border-blue-100 grid grid-cols-2 gap-2 text-xs text-slate-800 font-medium">
                          <div className="flex items-center gap-1.5">
                            <Server className="w-3.5 h-3.5 text-blue-600" />
                            <span>Laravel &amp; PHP</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Database className="w-3.5 h-3.5 text-blue-600" />
                            <span>MySQL &amp; Relational DB</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Code2 className="w-3.5 h-3.5 text-blue-600" />
                            <span>REST APIs &amp; Endpoints</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Palette className="w-3.5 h-3.5 text-blue-600" />
                            <span>HTML5, CSS3, Bootstrap 5</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Workflow className="w-3.5 h-3.5 text-blue-600" />
                            <span>JavaScript, jQuery &amp; AJAX</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Wrench className="w-3.5 h-3.5 text-blue-600" />
                            <span>Custom CMS &amp; Dashboards</span>
                          </div>
                        </div>
                      </div>

                      {/* Working & Project Experience Group */}
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-indigo-700 uppercase tracking-wider font-mono">
                            🚀 Working / Project Experience
                          </span>
                          <span className="text-[10.5px] text-slate-500 font-mono">Full-Stack Ecosystem</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-wrap gap-1.5">
                          {[
                            "React.js",
                            "Next.js",
                            "Node.js",
                            "Express.js",
                            "NestJS",
                            "PostgreSQL",
                            "Prisma ORM",
                            "Redis Caching",
                            "Docker & Compose",
                            "Linux & Terminal",
                            "Socket.io",
                          ].map((tech) => (
                            <span
                              key={tech}
                              className="text-[10.5px] font-mono px-2.5 py-1 rounded-lg bg-white text-slate-700 border border-slate-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Development Philosophy Note */}
                      <div className="p-3 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono flex items-center justify-between">
                        <span className="text-emerald-400">● 100% Authentic Categorization</span>
                        <span className="text-slate-400">Zero Arbitrary %</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Professional Identity (Three Pillars) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-card-soft hover:border-blue-300 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
              <Code2 className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider mb-1">
              Pillar 01
            </div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight mb-1">
              DEVELOPER
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Building web applications, business systems and software solutions with Laravel, PHP, MySQL, and modern full-stack technologies.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-card-soft hover:border-rose-300 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
              <Palette className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-rose-600 uppercase tracking-wider mb-1">
              Pillar 02
            </div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight mb-1">
              DESIGNER
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Creating responsive, clean and user-focused digital experiences, CMS layouts, and modern interfaces.
            </p>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-card-soft hover:border-indigo-300 transition-all">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-3">
              <Laptop className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-wider mb-1">
              Pillar 03
            </div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight mb-1">
              FREELANCER
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Working independently with businesses and clients to build custom digital solutions, dashboards, and websites.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
