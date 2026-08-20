"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Server,
  Code2,
  Database,
  CheckCircle,
  Zap,
  Workflow,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SkillCategory {
  id: string;
  title: string;
  shortDesc: string;
  icon: React.ElementType;
  skills: {
    name: string;
    level: "Strong / Primary" | "Working / Project Experience";
    description: string;
    tags: string[];
  }[];
  philosophyHighlights: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "backend",
    title: "Backend & Laravel Development",
    shortDesc: "Core specialization in Laravel, PHP, RESTful APIs, authentication systems, and business logic.",
    icon: Server,
    skills: [
      {
        name: "Laravel & PHP",
        level: "Strong / Primary",
        description:
          "MVC architecture, service layers, CRUD systems, authentication, authorization, role-based access control (RBAC), and server-side logic.",
        tags: ["PHP", "Laravel", "MVC", "Auth & RBAC", "Business Logic"],
      },
      {
        name: "REST APIs & Integration",
        level: "Strong / Primary",
        description:
          "Designing secure Laravel RESTful APIs, JSON endpoints, third-party integrations, and AJAX backend services.",
        tags: ["REST APIs", "API Integration", "JSON Endpoints", "AJAX"],
      },
      {
        name: "Node.js & Express.js",
        level: "Working / Project Experience",
        description:
          "Building asynchronous backend services, middleware, and lightweight API endpoints.",
        tags: ["Node.js", "Express.js", "Asynchronous Backend"],
      },
      {
        name: "NestJS & Socket.io",
        level: "Working / Project Experience",
        description:
          "Modular enterprise architecture and real-time bidirectional communication patterns.",
        tags: ["NestJS", "Socket.io", "Real-Time APIs"],
      },
    ],
    philosophyHighlights: [
      "Clean Architecture: Building applications with maintainable structure and clear separation of concerns.",
      "Business First: Understanding real-world business workflows before writing code.",
      "Scalable Thinking: Designing maintainable systems that adapt as organizations grow.",
    ],
  },
  {
    id: "frontend",
    title: "Frontend & Responsive UI",
    shortDesc: "Creating responsive, accessible, and user-focused web interfaces with modern styling.",
    icon: Code2,
    skills: [
      {
        name: "HTML5, CSS3 & Bootstrap",
        level: "Strong / Primary",
        description:
          "Semantic markup, modern CSS3 styling, Bootstrap 5 responsive grids, and clean cross-browser layouts.",
        tags: ["HTML5", "CSS3", "Bootstrap", "Responsive Layouts"],
      },
      {
        name: "JavaScript, jQuery & AJAX",
        level: "Strong / Primary",
        description:
          "Client-side scripting, DOM manipulation, asynchronous AJAX-based interfaces, and dynamic components.",
        tags: ["JavaScript", "jQuery", "AJAX UI", "DOM Scripting"],
      },
      {
        name: "React.js & Next.js",
        level: "Working / Project Experience",
        description:
          "Single-page applications, component-based architectures, and modern web application development.",
        tags: ["React.js", "Next.js", "SPA", "Component Architecture"],
      },
      {
        name: "Web & UI Design",
        level: "Strong / Primary",
        description:
          "Practical UI design, usability, content hierarchy, and design-to-code implementation.",
        tags: ["Web Design", "UI Design", "Visual Hierarchy", "Design-to-Code"],
      },
    ],
    philosophyHighlights: [
      "User Focused: Creating interfaces that are practical, responsive, intuitive, and easy to use.",
      "Design-to-Code: Direct translation of UI/UX concepts into semantic production code.",
      "Continuous Evolution: Expanding into React.js, Next.js, and modern full-stack workflows.",
    ],
  },
  {
    id: "database",
    title: "Databases & Full Stack Ecosystem",
    shortDesc: "Relational schema design, query optimization, ORM data relationships, and caching.",
    icon: Database,
    skills: [
      {
        name: "MySQL",
        level: "Strong / Primary",
        description:
          "Relational database design, table relationships (1:1, 1:N, N:M), indexing, query development, and data integrity.",
        tags: ["MySQL", "Relational Design", "Query Development", "Foreign Keys"],
      },
      {
        name: "PostgreSQL & Prisma",
        level: "Working / Project Experience",
        description:
          "PostgreSQL relational schemas, complex queries, migrations, and type-safe database queries via Prisma ORM.",
        tags: ["PostgreSQL", "Prisma ORM", "Schema Migrations"],
      },
      {
        name: "Redis",
        level: "Working / Project Experience",
        description:
          "In-memory data structures, caching layers, and session storage for high-throughput workflows.",
        tags: ["Redis", "Caching", "Performance"],
      },
    ],
    philosophyHighlights: [
      "Data Integrity: Ensuring normalized schemas, foreign-key constraints, and reliable state.",
      "Optimized Queries: Writing clean, performant queries to prevent bottlenecks.",
      "Modern ORM Adoption: Leveraging Prisma and Eloquent for rapid, type-safe development.",
    ],
  },
  {
    id: "tools",
    title: "DevOps, Tools & CMS Systems",
    shortDesc: "Git collaboration, Linux environments, Docker containerization, and custom CMS platforms.",
    icon: Wrench,
    skills: [
      {
        name: "Custom CMS & Admin Dashboards",
        level: "Strong / Primary",
        description:
          "Developing centralized business CMS platforms, dynamic content management, product catalogs, and SEO controls.",
        tags: ["CMS Development", "Admin Dashboards", "SEO", "Barcode Integration"],
      },
      {
        name: "Git & GitHub",
        level: "Strong / Primary",
        description:
          "Branching strategies, collaborative workflows, commit hygiene, pull requests, and repository management.",
        tags: ["Git", "GitHub", "Version Control", "VS Code"],
      },
      {
        name: "Linux, Docker & Docker Compose",
        level: "Working / Project Experience",
        description:
          "Linux terminal environments, Docker containerization, Docker Compose orchestration, and package managers (npm, pnpm).",
        tags: ["Linux", "Docker", "Docker Compose", "npm / pnpm"],
      },
      {
        name: "Business Applications & Workflows",
        level: "Strong / Primary",
        description:
          "Task tracking systems, shift scheduling, review workflows, and business automation software.",
        tags: ["Business Applications", "Workflow Systems", "Task Tracking"],
      },
    ],
    philosophyHighlights: [
      "Business Empowerment: Building systems that allow administrators to manage digital content effortlessly.",
      "Consistent Environments: Leveraging Docker and Linux for dependable development cycles.",
      "Authentic Engineering: Categorized real-world skills without inflated or arbitrary percentages.",
    ],
  },
];

interface SkillsBentoProps {
  skillsData?: any[];
}

export const SkillsBento: React.FC<SkillsBentoProps> = ({ skillsData }) => {
  const activeCategories: SkillCategory[] =
    skillsData && skillsData.length > 0
      ? skillsData.map((cat: any, idx: number) => ({
          id: cat.slug || `cat-${cat.id || idx}`,
          title: cat.name,
          shortDesc:
            cat.description ||
            "Authentically categorized capabilities across development and tooling.",
          icon:
            idx === 0
              ? Server
              : idx === 1
              ? Database
              : idx === 2
              ? Code2
              : Wrench,
          skills: Array.isArray(cat.skills)
            ? cat.skills.map((s: any) => ({
                name: s.name,
                level:
                  s.proficiency_type === "primary"
                    ? "Strong / Primary"
                    : "Working / Project Experience",
                description: `${s.name} (${s.level_label || "Core Strength"})`,
                tags: [s.name, s.level_label || "Production"],
              }))
            : [],
          philosophyHighlights: [
            "Clean Architecture: Building applications with maintainable structure.",
            "Data Integrity: Ensuring normalized schemas and reliable state.",
            "Business Empowerment: Systems that streamline organizational workflows.",
          ],
        }))
      : SKILL_CATEGORIES;

  const [activeCategory, setActiveCategory] = useState<string>(
    activeCategories[0]?.id || "backend"
  );

  const current =
    activeCategories.find((c) => c.id === activeCategory) ||
    activeCategories[0] ||
    SKILL_CATEGORIES[0];

  return (
    <section id="skills" className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              <span>Technical Capabilities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Technical <span className="text-blue-700">Skills &amp; Specialization</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md">
            Authentically categorized capabilities across primary development specializations and modern full-stack/project experience.
          </p>
        </div>

        {/* Category Navigation Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-6">
          {activeCategories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex items-center gap-2.5 sm:gap-3 p-3.5 rounded-2xl border text-left transition-all cursor-pointer",
                  isSelected
                    ? "bg-blue-700 border-blue-700 text-white shadow-md"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100 shadow-2xs"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors",
                    isSelected ? "bg-white/20 text-white" : "bg-white text-blue-700 border border-slate-200"
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="font-bold text-xs sm:text-sm truncate leading-tight">
                    {cat.title.split("&")[0]}
                  </div>
                  <div
                    className={cn(
                      "text-[10px] truncate mt-0.5 font-medium",
                      isSelected ? "text-blue-100" : "text-slate-400"
                    )}
                  >
                    {cat.skills.length} capability areas
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 bg-slate-50/70 border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm"
          >
            {/* Left Column: Skill Cards (8 Cols) */}
            <div className="lg:col-span-8 space-y-3.5">
              <div className="border-b border-slate-200/80 pb-3 mb-3">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">{current.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{current.shortDesc}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {current.skills.map((skill, idx) => {
                  const isPrimary = skill.level === "Strong / Primary";

                  return (
                    <div
                      key={idx}
                      className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-sm transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="font-bold text-xs sm:text-sm text-slate-900">
                            {skill.name}
                          </span>
                          <span
                            className={cn(
                              "text-[9px] sm:text-[9.5px] font-semibold px-2 py-0.5 rounded-full font-mono",
                              isPrimary
                                ? "text-blue-700 bg-blue-50 border border-blue-200"
                                : "text-slate-700 bg-slate-100 border border-slate-200"
                            )}
                          >
                            {skill.level}
                          </span>
                        </div>
                        <p className="text-[11.5px] sm:text-xs text-slate-600 leading-relaxed mb-2.5">
                          {skill.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-100">
                        {skill.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9.5px] sm:text-[10px] font-mono px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Engineering Philosophy (4 Cols) */}
            <div className="lg:col-span-4 bg-slate-900 text-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-md">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 uppercase tracking-wider mb-3.5 pb-2.5 border-b border-slate-800">
                  <Workflow className="w-4 h-4 text-blue-400" />
                  <span>Development Standard</span>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  {current.philosophyHighlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-2.5 leading-relaxed">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-800 text-[10.5px] text-slate-400 flex items-center justify-between">
                <span className="font-mono text-emerald-400">● Authentic Categorization</span>
                <span>2+ Years Dev Exp</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
