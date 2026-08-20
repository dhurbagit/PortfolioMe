"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Link from "next/link";
import {
  CreditCard,
  Maximize2,
  X,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Project {
  id: string;
  projectNumber: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  role: string;
  description: string;
  achievements: string[];
  tags: string[];
  metrics: { label: string; value: string };
  accent: "crimson" | "royal";
}

const PROJECTS: Project[] = [
  {
    id: "barari-nepal-pasta",
    projectNumber: "01",
    title: "Barari / Nepal Pasta Food Company",
    subtitle: "Business Website, Dynamic CMS & Product Management Platform",
    category: "Business CMS & Web Application",
    image: "/projects/inventory_billing_system.jpg",
    role: "Laravel / Full-Stack Developer",
    description:
      "A comprehensive business website and custom CMS platform developed for a food/product company. Allows administrators to manage business content dynamically without directly modifying source code.",
    achievements: [
      "Built dynamic product catalog, product categories, and barcode-related product integration.",
      "Implemented full content management: dynamic website sections, blog/news, careers, and media/gallery.",
      "Engineered secure admin dashboard with role-based access control, SEO management, and multilingual content support.",
      "Delivered a fully responsive frontend utilizing Bootstrap 5, JavaScript, jQuery, and AJAX-based interactions.",
    ],
    tags: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap", "jQuery", "AJAX", "SEO Management", "Barcode Integration"],
    metrics: { label: "System Architecture", value: "Dynamic Centralized CMS" },
    accent: "crimson",
  },
  {
    id: "sixvilla-cms",
    projectNumber: "02",
    title: "Sixvilla Project",
    subtitle: "Laravel-Powered Business Website & Centralized CMS Solution",
    category: "Custom CMS & Brand Platform",
    image: "/projects/merchant_analytics_dashboard.jpg",
    role: "Laravel Developer",
    description:
      "A Laravel-powered business website and custom CMS solution designed to showcase products and brands while providing administrative control over all digital content and customer inquiries.",
    achievements: [
      "Developed custom administration dashboard for managing brands, media assets, and dynamic site sections.",
      "Integrated SEO metadata management, multilingual content capabilities, and structured business inquiry forms.",
      "Implemented responsive, cross-browser frontend using HTML5, CSS3, JavaScript, jQuery, and Bootstrap.",
      "Secured administrative routes with role verification and server-side request validation.",
    ],
    tags: ["Laravel", "PHP", "MySQL", "Bootstrap", "jQuery", "AJAX", "Inquiry Workflow", "Multilingual"],
    metrics: { label: "Administration Control", value: "100% Dynamic Content" },
    accent: "royal",
  },
  {
    id: "off-hour-tracking",
    projectNumber: "03",
    title: "Off-Hour Tracking System",
    subtitle: "Business Task & Workforce Workflow Management System",
    category: "Business Workflow System",
    image: "/projects/ndpc_payment_dashboard.jpg",
    role: "Full-Stack Developer",
    description:
      "A business-oriented task and workforce tracking system engineered to monitor and manage organizational work processes, shift schedules, task submissions, and review workflows.",
    achievements: [
      "Engineered task management and shift scheduling modules tailored to real business operational processes.",
      "Implemented screenshot upload handling, task submission verification, and multi-tier review workflows.",
      "Built user-based permission access separating team members, team leads, and administrative managers.",
      "Structured relational MySQL database tables to record timestamps, task statuses, and audit history.",
    ],
    tags: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap", "Task Management", "Shift Scheduling"],
    metrics: { label: "Workflow Scope", value: "Multi-Tier Review Pipeline" },
    accent: "royal",
  },
  {
    id: "healthcare-marketplace",
    projectNumber: "04",
    title: "Hospital Healthcare Distribution Marketplace",
    subtitle: "Enterprise B2B Medical Procurement & Distribution Marketplace",
    category: "Modern Full-Stack Marketplace Concept",
    image: "/projects/merchant_analytics_dashboard.jpg",
    role: "Full-Stack Architecture Planning & Developer",
    description:
      "A large-scale healthcare distribution marketplace concept connecting hospitals, distributors, and vendors across end-to-end procurement and fulfillment workflows.",
    achievements: [
      "Architected domain workflows: Product Catalog, RFQ, Quotations, Orders, Fulfillment, Invoicing, and Payment Readiness.",
      "Built modern frontend and API structures with Next.js, React.js, Node.js, NestJS, and PostgreSQL via Prisma ORM.",
      "Integrated Redis caching, Docker/Docker Compose environment orchestration, notifications, and comprehensive audit trails.",
    ],
    tags: ["Next.js", "React.js", "Node.js", "NestJS", "PostgreSQL", "Prisma", "Redis", "Docker", "REST APIs"],
    metrics: { label: "Architecture", value: "B2B Marketplace Platform" },
    accent: "royal",
  },
  {
    id: "scos-smart-classroom",
    projectNumber: "05",
    title: "Smart Classroom Operating System (SCOS)",
    subtitle: "Education Technology & School Management SaaS Platform",
    category: "EdTech & SaaS Platform Concept",
    image: "/projects/inventory_billing_system.jpg",
    role: "SaaS Concept & Product Developer",
    description:
      "A smart classroom management platform designed for schools to unify smart board classroom interactions, teacher management tools, homework delivery, and student attendance.",
    achievements: [
      "Designed software architecture for smart board integration, teacher applications, homework tracking, and school notices.",
      "Planned extended SaaS modules for online classes, digital examinations, and real-time student performance analytics.",
      "Demonstrates practical experience in designing software around real-world institutional and educational workflows.",
    ],
    tags: ["Laravel", "React.js", "Node.js", "MySQL", "EdTech SaaS", "Smart Board UI", "Attendance Tracking"],
    metrics: { label: "Domain", value: "Education Technology SaaS" },
    accent: "crimson",
  },
];

interface ProjectShowcaseProps {
  projectsData?: any[];
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  projectsData,
}) => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const activeProjects: Project[] =
    projectsData && projectsData.length > 0
      ? projectsData.map((p: any, idx: number) => {
          let rawImg = p.thumbnail_url || p.gallery_urls?.[0];
          if (rawImg && rawImg.startsWith("/storage/")) {
            rawImg = `http://localhost:8000${rawImg}`;
          }
          const finalImg =
            rawImg ||
            (idx === 0
              ? "/projects/inventory_billing_system.jpg"
              : idx === 1
              ? "/projects/merchant_analytics_dashboard.jpg"
              : "/projects/ndpc_payment_dashboard.jpg");

          return {
            id: p.slug || String(p.id),
            projectNumber: `0${idx + 1}`,
            title: p.title,
            subtitle: `${p.category} Platform`,
            category: p.category,
            image: finalImg,
            role: p.role_title || "Laravel / Full-Stack Developer",
            description: p.summary,
            achievements: Array.isArray(p.key_deliverables)
              ? p.key_deliverables
              : typeof p.key_deliverables === "string"
              ? p.key_deliverables.split("\n").map((s: string) => s.trim()).filter(Boolean)
              : [],
            tags: Array.isArray(p.tech_stack)
              ? p.tech_stack
              : typeof p.tech_stack === "string"
              ? p.tech_stack.split(",").map((s: string) => s.trim()).filter(Boolean)
              : [],
            metrics: {
              label: p.metrics_label || "Architecture",
              value: p.metrics_value || "Production Grade",
            },
            accent: idx % 2 === 0 ? "crimson" : "royal",
          };
        })
      : PROJECTS;

  return (
    <section id="projects" className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header with Swiper Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-200 bg-red-50 text-red-700 text-xs font-semibold uppercase tracking-wider mb-2">
              <CreditCard className="w-3.5 h-3.5 text-red-600" />
              <span>Interactive Swiper Showcase</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured <span className="text-blue-700">Software Projects</span>
            </h2>
          </div>

          {/* Swiper Controls Header */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="text-xs font-mono text-slate-500 font-semibold mr-1">
              <span className="text-blue-700 font-bold">0{activeSlide + 1}</span>
              <span className="mx-1">/</span>
              <span>0{activeProjects.length}</span>
            </div>

            <button
              onClick={() => swiperInstance?.slidePrev()}
              aria-label="Previous project"
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 shadow-xs transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => swiperInstance?.slideNext()}
              aria-label="Next project"
              className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Swiper Quick Jump Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
          {activeProjects.map((project, idx) => {
            const isSelected = idx === activeSlide;
            return (
              <button
                key={project.id}
                onClick={() => swiperInstance?.slideTo(idx)}
                className={cn(
                  "flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all cursor-pointer",
                  isSelected
                    ? "bg-blue-700 border-blue-700 text-white shadow-sm"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100 shadow-2xs"
                )}
              >
                <span
                  className={cn(
                    "w-5 h-5 rounded-md flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0",
                    isSelected ? "bg-white/20 text-white" : "bg-white text-slate-700 border border-slate-200"
                  )}
                >
                  {project.projectNumber}
                </span>
                <span className="truncate text-xs font-bold leading-tight">
                  {project.title.split("/")[0].trim()}
                </span>
              </button>
            );
          })}
        </div>

        {/* Swiper Carousel Container */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, Keyboard]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 7000, disableOnInteraction: false }}
            keyboard={{ enabled: true }}
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
            className="rounded-3xl"
          >
            {activeProjects.map((project) => {
              const isCrimson = project.accent === "crimson";

              return (
                <SwiperSlide key={project.id}>
                  <div className="bg-slate-50/70 border border-slate-200 rounded-3xl p-5 sm:p-7 lg:p-8 shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                      
                      {/* Visual Screenshot Column (7 cols) */}
                      <div className="lg:col-span-7">
                        <div className="rounded-2xl border border-slate-200 bg-slate-900 overflow-hidden shadow-md group relative">
                          <div className="flex items-center justify-between px-3.5 py-2 bg-slate-100 border-b border-slate-200">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                            </div>
                            <div className="text-[10.5px] font-mono text-slate-500 bg-white px-2.5 py-0.5 rounded-md border border-slate-200 truncate max-w-[180px] sm:max-w-xs">
                              project://dhurba/{project.id}
                            </div>
                            <button
                              onClick={() => setSelectedImage({ src: project.image, title: project.title })}
                              className="text-slate-500 hover:text-blue-700 text-xs flex items-center gap-1 font-medium transition-colors cursor-pointer"
                              title="Click to zoom screenshot"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline text-[11px]">Zoom</span>
                            </button>
                          </div>

                          <div
                            onClick={() => setSelectedImage({ src: project.image, title: project.title })}
                            className="relative cursor-pointer overflow-hidden aspect-video bg-slate-100"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all flex items-center justify-center">
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity px-3.5 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-2 shadow-lg">
                                <Maximize2 className="w-3.5 h-3.5" />
                                <span>View Full Screenshot</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Project Details Column (5 cols) */}
                      <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                        <div>
                          {/* Category & Role Header */}
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span
                              className={cn(
                                "text-[11px] px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider border font-mono",
                                isCrimson
                                  ? "bg-red-50 text-red-700 border-red-200"
                                  : "bg-blue-50 text-blue-700 border-blue-200"
                              )}
                            >
                              {project.category}
                            </span>
                            <span className="text-[11px] text-slate-500 font-mono">
                              {project.role}
                            </span>
                          </div>

                          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-1">
                            {project.title}
                          </h3>
                          <p className="text-xs text-blue-700 font-semibold mb-2.5">
                            {project.subtitle}
                          </p>

                          <p className="text-xs text-slate-600 leading-relaxed mb-3.5">
                            {project.description}
                          </p>

                          {/* Key Features & Architecture Points */}
                          <div className="space-y-1.5 mb-4">
                            {project.achievements.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          {/* Metric Highlights */}
                          <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between mb-3 text-xs shadow-2xs">
                            <span className="text-slate-500 font-medium text-[11.5px]">{project.metrics.label}</span>
                            <span className="font-bold font-mono text-slate-900 text-xs sm:text-sm">
                              {project.metrics.value}
                            </span>
                          </div>

                          {/* Technology Badges & Case Study Link */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60">
                            <div className="flex flex-wrap gap-1">
                              {project.tags.slice(0, 4).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[9.5px] sm:text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <Link
                              href={`/projects/${project.id}`}
                              className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors"
                            >
                              <span>Case Study</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Swiper Pagination Indicator Bullets */}
          <div className="flex items-center justify-center gap-1.5 mt-6">
            {PROJECTS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => swiperInstance?.slideTo(idx)}
                className={cn(
                  "h-2 rounded-full transition-all cursor-pointer",
                  idx === activeSlide
                    ? "w-8 bg-blue-600 shadow-sm"
                    : "w-2 bg-slate-200 hover:bg-slate-300"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl z-10 border border-slate-200"
            >
              <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-slate-900 text-white">
                <span className="font-semibold text-xs sm:text-sm truncate">{selectedImage.title}</span>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="max-h-[80vh] overflow-auto bg-slate-950 p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-auto rounded-lg object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
