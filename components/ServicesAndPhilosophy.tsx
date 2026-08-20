"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Server,
  Code2,
  Layout,
  Sliders,
  Layers,
  Webhook,
  Briefcase,
  Laptop,
  Sparkles,
  Compass,
  Lightbulb,
  HeartHandshake,
  TrendingUp,
  BrainCircuit,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceItem {
  icon: React.ElementType;
  title: string;
  category: string;
  description: string;
  techTags: string[];
  accent: "blue" | "crimson" | "indigo" | "emerald";
}

const SERVICES: ServiceItem[] = [
  {
    icon: Server,
    title: "Laravel Development",
    category: "Backend & Systems",
    description:
      "Custom Laravel applications, business architectures, RESTful APIs, database structures, and secure authentication workflows.",
    techTags: ["Laravel", "MVC", "Auth & RBAC", "REST APIs"],
    accent: "blue",
  },
  {
    icon: Code2,
    title: "PHP Development",
    category: "Server Engineering",
    description:
      "Robust backend engineering, custom server-side scripts, database-driven web applications, and legacy code maintenance.",
    techTags: ["PHP 8.x", "OOP", "MySQL", "Backend Logic"],
    accent: "blue",
  },
  {
    icon: Layout,
    title: "Web Design & Development",
    category: "Creative UI & Frontend",
    description:
      "Responsive, clean, and accessible websites combining user-centric interface design with semantic, cross-browser frontend code.",
    techTags: ["Responsive Design", "HTML5", "CSS3", "Bootstrap 5"],
    accent: "crimson",
  },
  {
    icon: Sliders,
    title: "CMS Development",
    category: "Dynamic Content Platforms",
    description:
      "Centralized custom content management systems empowering non-technical administrators to manage content, media, and products effortlessly.",
    techTags: ["Custom CMS", "Admin Panels", "SEO Management", "Media Library"],
    accent: "indigo",
  },
  {
    icon: Layers,
    title: "Full-Stack Development",
    category: "End-to-End Solutions",
    description:
      "Comprehensive web application engineering across backend logic, relational databases, client-side scripting, and modern API architectures.",
    techTags: ["PHP / Laravel", "JavaScript", "MySQL", "React / Next.js"],
    accent: "emerald",
  },
  {
    icon: Webhook,
    title: "API Development & Integration",
    category: "Integration Engineering",
    description:
      "Designing secure REST APIs, JSON endpoints, third-party payment/service integrations, and asynchronous AJAX backend pipelines.",
    techTags: ["REST APIs", "JSON Services", "Third-Party APIs", "AJAX"],
    accent: "blue",
  },
  {
    icon: Briefcase,
    title: "Business Applications",
    category: "Operations & Workflows",
    description:
      "Tailored digital software modules built around specific business operational requirements, task management, and shift tracking.",
    techTags: ["Workflow Systems", "Task Tracking", "Audit History", "Operations"],
    accent: "indigo",
  },
  {
    icon: Laptop,
    title: "Freelance Solutions",
    category: "Independent Delivery",
    description:
      "Direct technical partnership with founders, business owners, and organizations for custom digital projects, websites, and dashboards.",
    techTags: ["Custom Builds", "Direct Collaboration", "Rapid Delivery"],
    accent: "crimson",
  },
];

const PHILOSOPHIES = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Build With Purpose",
    tagline: "Impact-Driven Engineering",
    description: "Every line of code should solve a tangible business problem and deliver practical, measurable value.",
  },
  {
    number: "02",
    icon: Compass,
    title: "Understand the Business",
    tagline: "Workflow Alignment",
    description: "Effective software starts with deep domain understanding before architecting the technical implementation.",
  },
  {
    number: "03",
    icon: HeartHandshake,
    title: "Design for Users",
    tagline: "Human-Centric UX",
    description: "Software must be intuitive, responsive, and easy to navigate for real daily users and administrators.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Code for the Future",
    tagline: "Maintainability & Scale",
    description: "Clean, structured MVC and REST codebases that remain maintainable and adapt as the organization grows.",
  },
  {
    number: "05",
    icon: BrainCircuit,
    title: "Keep Learning",
    tagline: "Continuous Growth",
    description: "Consistently expanding from Laravel/PHP strengths into modern full-stack architectures and tooling.",
  },
];

interface ServicesAndPhilosophyProps {
  servicesData?: any[];
  philosophiesData?: any[];
}

export const ServicesAndPhilosophy: React.FC<ServicesAndPhilosophyProps> = ({
  servicesData,
  philosophiesData,
}) => {
  const activeServices: ServiceItem[] =
    servicesData && servicesData.length > 0
      ? servicesData.map((srv: any, idx: number) => ({
          icon:
            idx % 4 === 0
              ? Server
              : idx % 4 === 1
              ? Code2
              : idx % 4 === 2
              ? Layout
              : Layers,
          title: srv.title,
          category: srv.subtitle || "Full-Stack Development",
          description: srv.description,
          techTags: Array.isArray(srv.capabilities)
            ? srv.capabilities
            : typeof srv.capabilities === "string"
            ? srv.capabilities.split("\n").map((s: string) => s.trim()).filter(Boolean)
            : Array.isArray(srv.tech_stack)
            ? srv.tech_stack
            : typeof srv.tech_stack === "string"
            ? srv.tech_stack.split(",").map((s: string) => s.trim()).filter(Boolean)
            : ["Laravel", "PHP", "MySQL"],
          accent:
            srv.accent_color ||
            (idx % 4 === 0
              ? "blue"
              : idx % 4 === 1
              ? "crimson"
              : idx % 4 === 2
              ? "indigo"
              : "emerald"),
        }))
      : SERVICES;

  const activePhilosophies =
    philosophiesData && philosophiesData.length > 0
      ? philosophiesData.map((p: any, idx: number) => ({
          number: p.principle_number || `0${idx + 1}`,
          icon:
            idx % 5 === 0
              ? Lightbulb
              : idx % 5 === 1
              ? Compass
              : idx % 5 === 2
              ? HeartHandshake
              : idx % 5 === 3
              ? TrendingUp
              : BrainCircuit,
          title: p.title,
          tagline: p.tagline || p.title,
          description: p.description,
        }))
      : PHILOSOPHIES;

  return (
    <section id="services" className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 bg-gradient-to-b from-slate-50/60 via-blue-50/20 to-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto w-full space-y-16">
        
        {/* 1. Services & Capabilities Header */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-2">
                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                <span>Full-Stack &amp; Design Offerings</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Services &amp; <span className="text-blue-700">Capabilities</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md">
              Specialized engineering and design services tailored for corporate systems, business platforms, and custom digital products.
            </p>
          </div>

          {/* 8 Clean Light Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {activeServices.map((srv, idx) => {
              const Icon = srv.icon;
              const isBlue = srv.accent === "blue";
              const isCrimson = srv.accent === "crimson";
              const isIndigo = srv.accent === "indigo";

              return (
                <motion.div
                  key={srv.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  className={cn(
                    "group bg-white border rounded-3xl p-5 sm:p-6 shadow-card-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between",
                    isBlue
                      ? "border-blue-100 hover:border-blue-300"
                      : isCrimson
                      ? "border-rose-100 hover:border-rose-300"
                      : isIndigo
                      ? "border-indigo-100 hover:border-indigo-300"
                      : "border-emerald-100 hover:border-emerald-300"
                  )}
                >
                  <div>
                    {/* Icon Badge */}
                    <div
                      className={cn(
                        "w-10 h-10 rounded-2xl flex items-center justify-center mb-3.5 transition-colors",
                        isBlue
                          ? "bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white"
                          : isCrimson
                          ? "bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white"
                          : isIndigo
                          ? "bg-indigo-50 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white"
                          : "bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                      {srv.category}
                    </div>

                    <h3 className="font-bold text-base text-slate-900 mb-2 leading-snug">
                      {srv.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {srv.description}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1 pt-3 border-t border-slate-100">
                    {srv.techTags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-200/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 2. Development Philosophy Section (Clean Light Master Card) */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-9 shadow-card-soft">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-8 pb-6 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-mono font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Guiding Engineering Principles</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                Development Philosophy
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md">
              Core engineering principles that guide architecture decisions, code maintainability, and user experience.
            </p>
          </div>

          {/* 5 Philosophy Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activePhilosophies.map((phi) => {
              const Icon = phi.icon;
              return (
                <div
                  key={phi.title}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-100/80 text-blue-700 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-[11px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                        P-{phi.number}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 mb-0.5">
                      {phi.title}
                    </h4>
                    <div className="text-[11px] font-semibold text-blue-700 mb-2">
                      {phi.tagline}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {phi.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
