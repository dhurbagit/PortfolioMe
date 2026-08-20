"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Sparkles,
  Palette,
  Wrench,
  CheckCircle2,
  Send,
  Zap,
  ShieldCheck,
  Smartphone,
  Layers,
  ArrowUpRight,
  Clock,
  Compass,
  Laptop,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FreelanceExperienceProps {
  onOpenContact: () => void;
}

const FREELANCE_SUITES = [
  {
    number: "01",
    title: "Full-Stack & Laravel Engineering",
    subtitle: "Custom Web Applications & Database Systems",
    icon: Code2,
    accentColor: "blue",
    description:
      "Architecting robust Laravel backends, relational database schemas, REST APIs, and automated business workflows engineered for performance and scalability.",
    services: [
      "Custom website & web app development",
      "Laravel & PHP backend systems",
      "REST API development & integration",
      "Database-driven applications (MySQL/PostgreSQL)",
      "Business workflow & automation systems",
    ],
  },
  {
    number: "02",
    title: "UI Design & Responsive Web",
    subtitle: "Design-to-Code & Brand Interfaces",
    icon: Palette,
    accentColor: "rose",
    description:
      "Creating modern, user-focused digital experiences, responsive websites, and clean visual layouts that align directly with business identity and conversion goals.",
    services: [
      "Business website design & development",
      "Responsive UI implementation (Mobile/Tablet/Desktop)",
      "Frontend engineering (HTML5, CSS3, JS, Bootstrap)",
      "SEO implementation & metadata architecture",
      "Design-to-code production translation",
    ],
  },
  {
    number: "03",
    title: "Custom CMS & Operations",
    subtitle: "Admin Dashboards & Platform Maintenance",
    icon: Wrench,
    accentColor: "emerald",
    description:
      "Building tailored content management platforms, centralized admin dashboards, custom feature integrations, and ongoing technical maintenance.",
    services: [
      "Custom CMS development",
      "Centralized admin dashboards & control panels",
      "Website maintenance & optimization",
      "Custom feature development & integrations",
      "Technical consultation & architecture planning",
    ],
  },
];

const WORKFLOW_PILLARS = [
  {
    icon: Zap,
    title: "Direct Collaboration",
    desc: "Work directly with the engineer who designs and codes your product.",
  },
  {
    icon: ShieldCheck,
    title: "Production Standards",
    desc: "Maintainable, clean architecture built on battle-tested Laravel & modern web stacks.",
  },
  {
    icon: Smartphone,
    title: "Fluid Responsiveness",
    desc: "Cross-browser, pixel-perfect execution on mobile, tablet, and desktop screens.",
  },
  {
    icon: Compass,
    title: "Business Oriented",
    desc: "Software designed around real business processes and measurable outcomes.",
  },
];

interface FreelanceExperienceProps {
  onOpenContact: () => void;
  suitesData?: any[];
}

export const FreelanceExperience: React.FC<FreelanceExperienceProps> = ({
  onOpenContact,
  suitesData,
}) => {
  const activeSuites =
    suitesData && suitesData.length > 0
      ? suitesData.map((s: any, idx: number) => ({
          number: s.suite_number || `0${idx + 1}`,
          title: s.title,
          subtitle: s.subtitle || "Custom Web Engineering",
          icon: idx === 0 ? Code2 : idx === 1 ? Palette : Wrench,
          accentColor: s.accent_color || (idx === 0 ? "blue" : idx === 1 ? "rose" : "emerald"),
          description: s.description,
          services: Array.isArray(s.capabilities)
            ? s.capabilities
            : typeof s.capabilities === "string"
            ? s.capabilities.split("\n").map((c: string) => c.trim()).filter(Boolean)
            : Array.isArray(s.services)
            ? s.services
            : typeof s.services === "string"
            ? s.services.split("\n").map((c: string) => c.trim()).filter(Boolean)
            : [],
        }))
      : FREELANCE_SUITES;

  return (
    <section id="freelance" className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 bg-slate-50/70 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto w-full space-y-10">
        
        {/* Header with Availability Pill */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Independent Digital Practice</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Freelance <span className="text-blue-700">Experience &amp; Services</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 shadow-2xs">
              Developer + Designer + Problem Solver
            </span>
          </div>
        </div>

        {/* Studio Bento Card Suites (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {activeSuites.map((suite, index) => {
            const Icon = suite.icon;
            const isBlue = suite.accentColor === "blue";
            const isRose = suite.accentColor === "rose";

            return (
              <motion.div
                key={suite.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className={cn(
                  "group relative bg-white border rounded-3xl p-6 shadow-card-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between",
                  isBlue
                    ? "border-blue-200/90 hover:border-blue-400"
                    : isRose
                    ? "border-rose-200/90 hover:border-rose-400"
                    : "border-emerald-200/90 hover:border-emerald-400"
                )}
              >
                {/* Top Accent Strip */}
                <div
                  className={cn(
                    "absolute top-0 left-6 right-6 h-1 rounded-b-full transition-all",
                    isBlue
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600"
                      : isRose
                      ? "bg-gradient-to-r from-rose-500 to-amber-500"
                      : "bg-gradient-to-r from-emerald-500 to-teal-500"
                  )}
                />

                <div>
                  {/* Suite Number and Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={cn(
                        "w-11 h-11 rounded-2xl flex items-center justify-center transition-colors",
                        isBlue
                          ? "bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white"
                          : isRose
                          ? "bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white"
                          : "bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <span className="font-mono text-xs font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      Suite {suite.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 tracking-tight leading-snug mb-1">
                    {suite.title}
                  </h3>
                  <div className="text-xs font-semibold text-blue-700 mb-3">
                    {suite.subtitle}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-5">
                    {suite.description}
                  </p>

                  {/* Bullet Services */}
                  <div className="space-y-2 pt-3 border-t border-slate-100 mb-5">
                    {suite.services.map((srv: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2
                          className={cn(
                            "w-3.5 h-3.5 flex-shrink-0 mt-0.5",
                            isBlue ? "text-blue-600" : isRose ? "text-rose-500" : "text-emerald-600"
                          )}
                        />
                        <span className="leading-snug">{srv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={onOpenContact}
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer group-hover:bg-blue-50 group-hover:text-blue-700"
                  >
                    <span>Inquire About This Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Client Workflow & Value Proposition Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-card-soft">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-blue-700 font-bold mb-1">
                Client Value &amp; Engineering Standards
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Why Work With Dhurba Dhakal?
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-xl">
                Alongside my professional software engineering roles, I provide dedicated freelance support for founders and business teams seeking dependable software execution.
              </p>
            </div>

            <button
              onClick={onOpenContact}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-700 to-red-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer flex-shrink-0"
            >
              <Send className="w-4 h-4" />
              <span>Start a Project Conversation</span>
            </button>
          </div>

          {/* 4 Workflow Grid Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            {WORKFLOW_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                    <Icon className="w-4 h-4 text-blue-700 flex-shrink-0" />
                    <span>{pillar.title}</span>
                  </div>
                  <p className="text-[11.5px] text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
