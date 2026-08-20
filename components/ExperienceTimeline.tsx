"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Briefcase,
  Calendar,
  MapPin,
  Sparkles,
  ChevronRight,
  TrendingUp,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface MilestoneItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  badgeText: string;
  accent: "crimson" | "royal";
  description: string[];
  skills: string[];
  metrics?: { label: string; value: string }[];
}

const DHURBA_MILESTONES: MilestoneItem[] = [
  {
    id: "software-developer-experience",
    role: "Software Developer / Laravel Developer",
    company: "Professional Software Development Experience",
    location: "Nepal (Full-Time / Remote)",
    period: "2+ Years Experience",
    badgeText: "Full Stack & Laravel",
    accent: "royal",
    description: [
      "Developed Laravel-based web applications, custom business CMS platforms, and centralized administrative dashboards.",
      "Engineered CRUD modules, dynamic form validation, and relational database structures in MySQL and PostgreSQL.",
      "Implemented secure authentication, authorization, role-based access control (RBAC), and permission-based navigation menus.",
      "Developed and documented REST APIs, seamlessly integrating frontend interfaces with backend services via AJAX and JSON endpoints.",
      "Built responsive, mobile-first user interfaces using JavaScript, jQuery, AJAX, Bootstrap 5, HTML5, and CSS3.",
      "Integrated SEO management, multilingual content, media/gallery managers, product catalogs, and barcode-related functionality.",
      "Managed version control with Git/GitHub, worked in Linux terminal environments, and utilized Docker & Docker Compose for containerized workflows.",
      "Explored and integrated modern full-stack architectures leveraging React.js, Node.js, Next.js, and Prisma ORM.",
    ],
    skills: [
      "Laravel",
      "PHP",
      "MySQL",
      "PostgreSQL",
      "REST APIs",
      "JavaScript",
      "jQuery",
      "Bootstrap 5",
      "AJAX",
      "Git / GitHub",
      "Docker",
      "React.js",
      "Node.js",
    ],
    metrics: [
      { label: "Hands-on Experience", value: "2+ Years" },
      { label: "Core Stack", value: "Laravel / PHP" },
      { label: "Architecture", value: "Full-Stack & APIs" },
    ],
  },
  {
    id: "education-bsc-it",
    role: "BSc IT (Information Technology)",
    company: "Lord Buddha Education Foundation",
    location: "Nepal",
    period: "Undergraduate Degree",
    badgeText: "Higher Education",
    accent: "crimson",
    description: [
      "Completed degree coursework covering Software Engineering, Object-Oriented Programming (OOP), Relational Database Management Systems (RDBMS), and Web Technologies.",
      "Built foundational expertise in algorithms, data structures, network fundamentals, system analysis, and project lifecycle management.",
      "Applied academic computing principles directly to practical software development projects, database schema normalization, and full-stack web applications.",
    ],
    skills: [
      "Software Engineering",
      "Database Systems",
      "Web Technologies",
      "OOP Principles",
      "System Analysis",
      "Data Structures",
    ],
    metrics: [
      { label: "Degree", value: "BSc IT" },
      { label: "Institution", value: "Lord Buddha EF" },
    ],
  },
];

export const ExperienceTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  });

  const beamHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const beamOpacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0.4, 1, 1, 0.9]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto overflow-hidden"
    >
      {/* Soft Ambient Accents */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center mb-10 sm:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-2.5 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
          <span>Professional Background</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight"
        >
          Work Experience &amp; <span className="text-blue-700">Education</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-2.5 text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto"
        >
          2+ years of practical software development experience across Laravel, PHP, MySQL, PostgreSQL, dynamic CMS platforms, and modern web applications.
        </motion.p>
      </div>

      {/* Timeline Layout */}
      <div className="relative">
        {/* Inactive Central Line */}
        <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-slate-200" />

        {/* Animated Progress Beam */}
        <motion.div
          style={{ height: beamHeight, opacity: beamOpacity }}
          className="absolute left-6 md:left-1/2 top-4 w-1 -translate-x-1/2 bg-gradient-to-b from-blue-600 via-indigo-600 to-red-600 rounded-full shadow-sm z-0 origin-top transform-gpu"
        />

        {/* Milestone Items */}
        <div className="space-y-10 sm:space-y-12 relative z-10">
          {DHURBA_MILESTONES.map((milestone, index) => {
            const isEven = index % 2 === 0;
            const isHovered = hoveredId === milestone.id;
            const isCrimson = milestone.accent === "crimson";

            return (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  "relative flex flex-col md:flex-row items-start gap-6 md:gap-0",
                  isEven ? "md:flex-row-reverse" : ""
                )}
                onMouseEnter={() => setHoveredId(milestone.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Milestone Content Card */}
                <div
                  className={cn(
                    "w-full pl-14 md:pl-0 md:w-[calc(50%-32px)]",
                    isEven ? "md:text-left md:ml-auto" : "md:mr-auto"
                  )}
                >
                  <div
                    className={cn(
                      "group relative p-5 sm:p-7 rounded-2xl transition-all duration-300 transform-gpu",
                      "bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-card-soft",
                      "hover:shadow-card-hover hover:-translate-y-1",
                      isCrimson
                        ? "hover:border-red-300 hover:shadow-[0_12px_30px_-4px_rgba(220,38,38,0.12)]"
                        : "hover:border-blue-300 hover:shadow-[0_12px_30px_-4px_rgba(29,78,216,0.12)]"
                    )}
                  >
                    {/* Top Accent Strip */}
                    <div
                      className={cn(
                        "absolute top-0 left-6 right-6 h-1 rounded-b-full transition-all",
                        isCrimson
                          ? "bg-gradient-to-r from-red-500 to-rose-600"
                          : "bg-gradient-to-r from-blue-600 to-indigo-600"
                      )}
                    />

                    {/* Header Row: Role & Duration */}
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2.5">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={cn(
                              "text-[11px] px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider border",
                              isCrimson
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-blue-50 text-blue-700 border-blue-200"
                            )}
                          >
                            {milestone.badgeText}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                          {milestone.role}
                        </h3>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg font-medium border border-slate-200">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{milestone.period}</span>
                      </div>
                    </div>

                    {/* Company & Location */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-slate-600 mb-3 font-medium">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-slate-800">
                        {milestone.id === "education-bsc-it" ? (
                          <GraduationCap className="w-4 h-4 text-red-600" />
                        ) : (
                          <Briefcase className="w-4 h-4 text-blue-600" />
                        )}
                        <span>{milestone.company}</span>
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="inline-flex items-center gap-1 text-slate-500 text-xs">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{milestone.location}</span>
                      </span>
                    </div>

                    {/* Bullet Points */}
                    <ul className="space-y-1.5 mb-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {milestone.description.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1 flex-shrink-0">
                            <ChevronRight
                              className={cn(
                                "w-3.5 h-3.5",
                                isCrimson ? "text-red-500" : "text-blue-600"
                              )}
                            />
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Metrics / Highlights */}
                    {milestone.metrics && milestone.metrics.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 mb-4">
                        {milestone.metrics.map((metric, idx) => (
                          <div key={idx} className="flex flex-col">
                            <span className="text-[10.5px] text-slate-500 uppercase tracking-wider flex items-center gap-1 font-medium">
                              <TrendingUp className="w-3 h-3 text-blue-600" />
                              {metric.label}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-slate-900 font-mono mt-0.5">
                              {metric.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1 pt-2.5 border-t border-slate-100">
                      {milestone.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Central Timeline Node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center top-6 md:top-8 z-20">
                  <motion.div
                    animate={{
                      scale: isHovered ? 1.25 : 1,
                      boxShadow: isHovered
                        ? isCrimson
                          ? "0 0 20px rgba(220, 38, 38, 0.45)"
                          : "0 0 20px rgba(29, 78, 216, 0.45)"
                        : "0 2px 8px rgba(15, 23, 42, 0.1)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className={cn(
                      "relative w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center cursor-pointer",
                      "border-2 bg-white transform-gpu",
                      isCrimson
                        ? "border-red-600 bg-red-50 text-red-600"
                        : "border-blue-600 bg-blue-50 text-blue-600"
                    )}
                  >
                    <div
                      className={cn(
                        "w-2.5 h-2.5 rounded-full animate-ping opacity-50",
                        isCrimson ? "bg-red-600" : "bg-blue-600"
                      )}
                    />
                    <div
                      className={cn(
                        "absolute w-2.5 h-2.5 rounded-full",
                        isCrimson ? "bg-red-600" : "bg-blue-600"
                      )}
                    />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
