"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  status: "Currently Working" | "Previous Role";
  location: string;
  description: string;
  responsibilities: string[];
  techFocus: string[];
  accent: "royal" | "indigo" | "crimson";
  roleNumber: string;
}

const WORK_EXPERIENCES: ExperienceItem[] = [
  {
    id: "ndpc",
    roleNumber: "01",
    company: "Nepal Digital Payment Company Limited",
    position: "Developer",
    status: "Currently Working",
    location: "Nepal",
    accent: "royal",
    description:
      "Currently working as a Developer at Nepal Digital Payment Company Limited, contributing to software development, transactional infrastructure, and technology-driven business solutions.",
    responsibilities: [
      "Web application development and database-driven application engineering.",
      "Backend development and business logic implementation with PHP and Laravel.",
      "API development, third-party service integration, and frontend/backend integration.",
      "Application maintenance, continuous debugging, and technical problem solving.",
    ],
    techFocus: ["PHP", "Laravel", "JavaScript", "MySQL", "APIs", "Git"],
  },
  {
    id: "nector-digit",
    roleNumber: "02",
    company: "Nector Digit",
    position: "Web Designer & Developer",
    status: "Previous Role",
    location: "Nepal",
    accent: "indigo",
    description:
      "Worked as a Web Designer and Developer, combining frontend design and web development to create responsive, functional, and visually engaging websites and digital solutions.",
    responsibilities: [
      "Website design, UI implementation, and responsive layout engineering across all devices.",
      "Frontend development using HTML, CSS, JavaScript, Bootstrap, jQuery, and AJAX.",
      "Custom CMS integration, website customization, and client requirement implementation.",
      "Website maintenance, cross-browser compatibility, and performance optimization.",
    ],
    techFocus: [
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap",
      "jQuery",
      "AJAX",
      "PHP",
      "Laravel",
    ],
  },
  {
    id: "nepal-pasta",
    roleNumber: "03",
    company: "Nepal Pasta Food Company",
    position: "Senior IT Manager",
    status: "Previous Role",
    location: "Nepal",
    accent: "crimson",
    description:
      "Worked as a Senior IT Manager with responsibility for technology-related operations, digital systems, website management, IT coordination, and technology-driven business requirements.",
    responsibilities: [
      "IT management, digital operations, and business technology systems oversight.",
      "Website management, CMS administration, and product information management.",
      "Technology planning, technical coordination, and system administration.",
      "Business requirement analysis and digital workflow improvement across departments.",
    ],
    techFocus: [
      "Laravel",
      "PHP",
      "MySQL",
      "CMS",
      "Web Technologies",
      "SEO",
      "Digital Systems",
    ],
  },
];

interface WorkExperienceProps {
  experiencesData?: any[];
}

export const WorkExperience: React.FC<WorkExperienceProps> = ({
  experiencesData,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const activeExperiences: ExperienceItem[] =
    experiencesData && experiencesData.length > 0
      ? experiencesData.map((e: any, idx: number) => ({
          id: String(e.id || idx),
          roleNumber: e.role_number || `0${idx + 1}`,
          company: e.company_name || e.company,
          position: e.position,
          status: (e.status as any) || "Currently Working",
          location: e.location || "Nepal",
          accent:
            (e.accent_theme as any) ||
            (idx === 0 ? "royal" : idx === 1 ? "indigo" : "crimson"),
          description: e.overview || e.description,
          responsibilities: Array.isArray(e.responsibilities)
            ? e.responsibilities
            : typeof e.responsibilities === "string"
            ? e.responsibilities.split("\n").map((s: string) => s.trim()).filter(Boolean)
            : [],
          techFocus: Array.isArray(e.tech_stack)
            ? e.tech_stack
            : typeof e.tech_stack === "string"
            ? e.tech_stack.split(",").map((s: string) => s.trim()).filter(Boolean)
            : Array.isArray(e.techFocus)
            ? e.techFocus
            : [],
        }))
      : WORK_EXPERIENCES;

  const current = activeExperiences[currentIndex] || activeExperiences[0] || WORK_EXPERIENCES[0];
  const isCurrentlyWorking = current?.status === "Currently Working";
  const isCrimson = current?.accent === "crimson";

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % activeExperiences.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? activeExperiences.length - 1 : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  return (
    <section id="experience" className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 bg-gradient-to-b from-slate-100 via-blue-50/20 to-slate-100/90 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header with Slider Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-2">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              <span>Interactive Experience Slider</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Professional <span className="text-blue-700">Work Experience</span>
            </h2>
          </div>

          {/* Slider Action Buttons */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="text-xs font-mono text-slate-500 font-semibold mr-1">
              <span className="text-blue-700 font-bold">{current.roleNumber}</span>
              <span className="mx-1">/</span>
              <span>0{activeExperiences.length}</span>
            </div>

            <button
              onClick={prevSlide}
              aria-label="Previous Experience"
              className="p-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next Experience"
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Company Tab Jump Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
          {activeExperiences.map((exp, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={exp.id}
                onClick={() => goToSlide(idx)}
                className={cn(
                  "flex items-center gap-2.5 p-3 rounded-2xl border text-left transition-all cursor-pointer",
                  isSelected
                    ? "bg-blue-700 border-blue-700 text-white shadow-md"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 shadow-sm"
                )}
              >
                <span
                  className={cn(
                    "w-7 h-7 rounded-xl flex items-center justify-center font-mono text-xs font-bold flex-shrink-0",
                    isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
                  )}
                >
                  {exp.roleNumber}
                </span>
                <div className="truncate">
                  <div className="font-bold text-xs truncate leading-tight">
                    {exp.company}
                  </div>
                  <div
                    className={cn(
                      "text-[10px] truncate mt-0.5 font-medium",
                      isSelected ? "text-blue-100" : "text-slate-400"
                    )}
                  >
                    {exp.position}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Full-Side Mirror View Slider Container */}
        <div className="relative">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_e, { offset, velocity }) => {
                const swipe = offset.x;
                if (swipe < -40 || velocity.x < -300) {
                  nextSlide();
                } else if (swipe > 40 || velocity.x > 300) {
                  prevSlide();
                }
              }}
              className="relative bg-white border border-slate-200/90 rounded-3xl shadow-card-soft overflow-hidden cursor-grab active:cursor-grabbing"
            >
              {/* Top Accent Strip */}
              <div
                className={cn(
                  "h-1.5 w-full transition-colors",
                  isCurrentlyWorking
                    ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700"
                    : isCrimson
                    ? "bg-gradient-to-r from-red-600 via-rose-600 to-amber-600"
                    : "bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600"
                )}
              />

              {/* Mirror View: Symmetrical 2-Wing Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* Left Mirror Wing: Company Identity & Hero Card (5 cols) */}
                <div
                  className={cn(
                    "lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100",
                    isCurrentlyWorking
                      ? "bg-gradient-to-br from-blue-50/60 via-white to-indigo-50/40"
                      : isCrimson
                      ? "bg-gradient-to-br from-red-50/60 via-white to-amber-50/40"
                      : "bg-gradient-to-br from-indigo-50/60 via-white to-purple-50/40"
                  )}
                >
                  <div>
                    {/* Status Pill & Role Index */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full border font-mono shadow-xs",
                          isCurrentlyWorking
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        )}
                      >
                        {isCurrentlyWorking && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        )}
                        <span>{current.status}</span>
                      </span>

                      <span className="text-xs font-mono font-bold text-slate-400 bg-white px-2.5 py-0.5 rounded-md border border-slate-200">
                        Phase #{current.roleNumber}
                      </span>
                    </div>

                    {/* Role Title */}
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug mb-2">
                      {current.position}
                    </h3>

                    {/* Company Name */}
                    <div className="flex items-start gap-2 text-sm sm:text-base font-bold text-blue-700 mb-4">
                      <Building2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1" />
                      <span>{current.company}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-6">
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                      <span>{current.location}</span>
                    </div>
                  </div>

                  {/* Tech Focus Matrix Badges */}
                  <div className="pt-4 border-t border-slate-200/60">
                    <div className="text-[10.5px] font-mono text-slate-400 uppercase tracking-wider mb-2.5 font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-blue-600" />
                      <span>Technology Focus</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {current.techFocus.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10.5px] font-mono px-2.5 py-1 rounded-lg bg-white text-slate-700 border border-slate-200 shadow-2xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Mirror Wing: Detailed Responsibilities & Scope (7 cols) */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white">
                  <div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-5">
                      <div className="text-[11px] font-mono text-blue-700 uppercase tracking-wider font-bold mb-1">
                        Role Overview
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {current.description}
                      </p>
                    </div>

                    <div>
                      <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-blue-600" />
                        <span>Key Responsibilities &amp; Experience Areas</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {current.responsibilities.map((resp, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50/60 border border-slate-100 hover:border-blue-200 transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-slate-700 leading-relaxed font-medium">
                              {resp}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Slide Pagination & Mirror Footprint */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      {activeExperiences.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => goToSlide(idx)}
                          className={cn(
                            "h-2 rounded-full transition-all cursor-pointer",
                            idx === currentIndex
                              ? "w-7 bg-blue-600"
                              : "w-2 bg-slate-200 hover:bg-slate-300"
                          )}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={nextSlide}
                        className="text-blue-700 hover:text-blue-800 font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <span>Next Role</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mirror Reflection Effect at Base */}
          <div className="h-6 w-full bg-gradient-to-b from-slate-300/40 via-slate-200/10 to-transparent rounded-b-3xl -mt-1 opacity-50 blur-[2px] pointer-events-none transform scale-x-95" />
        </div>
      </div>
    </section>
  );
};
