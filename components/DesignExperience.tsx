"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Palette,
  Layout,
  Smartphone,
  Building,
  Sliders,
  Code2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const DESIGN_CAPABILITIES = [
  {
    icon: Layout,
    title: "Web Design",
    description:
      "Professional website design focused on real business requirements, usability, content hierarchy, and responsive presentation.",
    tags: ["Visual Hierarchy", "User Experience", "Semantic Layout"],
  },
  {
    icon: Palette,
    title: "UI Design",
    description:
      "Creating clean, practical, and user-focused interfaces with strong visual hierarchy and refined design systems.",
    tags: ["Design Systems", "Component States", "Clean Aesthetics"],
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description:
      "Designing fluid interfaces that adapt perfectly across Desktop, Laptop, Tablet, and Mobile screens.",
    tags: ["Desktop", "Laptop", "Tablet", "Mobile First"],
  },
  {
    icon: Building,
    title: "Business Website Design",
    description:
      "Designing websites around business identity, brand presentation, content structure, user requirements, and conversion goals.",
    tags: ["Brand Identity", "Content Structure", "Conversion Goals"],
  },
  {
    icon: Sliders,
    title: "CMS Interface Design",
    description:
      "Designing practical interfaces for managing products, categories, pages, images, content, SEO, and website settings.",
    tags: ["Admin Dashboards", "Media Managers", "SEO Controls"],
  },
  {
    icon: Code2,
    title: "Design-to-Code",
    description:
      "Because I have both design and development experience, I understand how to translate designs directly into functional production interfaces.",
    tags: ["HTML5/CSS3", "Bootstrap 5", "Production Code"],
  },
];

interface DesignExperienceProps {
  capabilitiesData?: any[];
}

export const DesignExperience: React.FC<DesignExperienceProps> = ({
  capabilitiesData,
}) => {
  const activeCapabilities =
    capabilitiesData && capabilitiesData.length > 0
      ? capabilitiesData.map((cap: any, idx: number) => ({
          icon:
            idx === 0
              ? Layout
              : idx === 1
              ? Palette
              : idx === 2
              ? Smartphone
              : idx === 3
              ? Building
              : idx === 4
              ? Sliders
              : Code2,
          title: cap.title,
          description: cap.description,
          tags: Array.isArray(cap.design_tags)
            ? cap.design_tags
            : typeof cap.design_tags === "string"
            ? cap.design_tags.split(",").map((s: string) => s.trim()).filter(Boolean)
            : Array.isArray(cap.tags)
            ? cap.tags
            : typeof cap.tags === "string"
            ? cap.tags.split(",").map((s: string) => s.trim()).filter(Boolean)
            : ["UI/UX", "Responsive", "Clean Design"],
        }))
      : DESIGN_CAPABILITIES;

  return (
    <section id="design" className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 bg-gradient-to-b from-rose-50/50 via-white to-pink-50/30 border-b border-rose-100/80">
      <div className="max-w-7xl mx-auto w-full space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-rose-200 bg-rose-50 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-2">
              <Palette className="w-3.5 h-3.5 text-rose-600" />
              <span>Creative &amp; Visual Engineering</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Design <span className="text-rose-600">Experience &amp; UI/UX</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md">
            Bridging the gap between visual aesthetics and practical full-stack code with user-centric interface design.
          </p>
        </div>

        {/* Featured Personal Brand Statement Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="relative bg-gradient-to-r from-blue-700 via-indigo-700 to-red-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-light-grid opacity-15" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-mono">
                <Sparkles className="w-3 h-3" />
                <span>Core Philosophy</span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-snug">
                &ldquo;I don&apos;t just design interfaces — I understand how to build them.&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                My experience across design and development allows me to bridge the gap between visual concepts and functional software, creating solutions that are both visually effective and technically practical.
              </p>
            </div>

            <div className="flex-shrink-0 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center min-w-[160px]">
              <div className="text-2xl font-black font-mono">Design + Code</div>
              <div className="text-[11px] text-blue-200 mt-0.5">End-to-End Delivery</div>
            </div>
          </div>
        </motion.div>

        {/* Visual Capability Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeCapabilities.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.35, delay: index * 0.07 }}
                className="group bg-white border border-rose-100 hover:border-rose-300 rounded-3xl p-5 sm:p-6 shadow-card-soft hover:shadow-card-hover transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 tracking-tight mb-2">
                    {cap.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {cap.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 pt-3 border-t border-slate-100">
                  {cap.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50/60 text-slate-700 border border-rose-100"
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
    </section>
  );
};
