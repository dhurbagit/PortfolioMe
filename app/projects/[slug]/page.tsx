import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Layers,
  Workflow,
  Cpu,
  Tag,
  ArrowRight,
  Globe,
  FileCode2,
  ImageIcon,
  Sparkles,
} from "lucide-react";
import { Icons } from "@/components/Icons";
import { getProjectBySlug, getProjects } from "@/lib/api";
import { cvData } from "@/lib/cvData";

interface ProjectData {
  id?: number | string;
  title: string;
  slug: string;
  category: string;
  role_title?: string;
  summary: string;
  full_description?: string;
  challenge?: string;
  solution?: string;
  key_deliverables: string[] | string;
  tech_stack: string[] | string;
  metrics_label?: string;
  metrics_value?: string;
  thumbnail_url?: string;
  gallery_urls?: string[];
  demo_url?: string | null;
  github_url?: string | null;
  accent_theme?: string;
  seo_title?: string | null;
  seo_description?: string | null;
}

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function findFallbackProject(slug: string): ProjectData | null {
  const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  
  const match = cvData.featuredProjects.find(
    (p) => normalize(p.title) === slug || p.title.toLowerCase().includes(slug.replace(/-/g, " "))
  );

  if (!match) return null;

  return {
    id: 1,
    title: match.title,
    slug: slug,
    category: match.category,
    role_title: match.role,
    summary: match.description,
    full_description: match.description,
    challenge:
      "Designing high-reliability software architecture tailored to operational business constraints, data integrity requirements, and performance expectations.",
    solution:
      "Engineered a scalable, structured application using Laravel MVC paradigms, relational database normalization, and responsive user-centric interfaces.",
    key_deliverables: match.keyDeliverables,
    tech_stack: match.technologies,
    metrics_label: "Engineering Standard",
    metrics_value: "100% Production Grade",
    thumbnail_url: "/projects/merchant_analytics_dashboard.jpg",
    gallery_urls: [],
    demo_url: null,
    github_url: "https://github.com/dhurbagit",
  };
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project: any = (await getProjectBySlug(slug)) || findFallbackProject(slug);

  if (project) {
    return {
      title: project.seo_title || `${project.title} — Case Study | Dhurba Dhakal`,
      description: project.seo_description || project.summary,
      openGraph: {
        title: project.seo_title || `${project.title} — Case Study | Dhurba Dhakal`,
        description: project.seo_description || project.summary,
      },
    };
  }

  return {
    title: "Project Case Study — Dhurba Dhakal",
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const apiProject: any = await getProjectBySlug(slug);
  const project: ProjectData | null = apiProject || findFallbackProject(slug);

  if (!project) {
    notFound();
  }

  const allProjects: any = await getProjects();
  const otherProjects = (allProjects || [])
    .filter((p: any) => p.slug !== slug)
    .slice(0, 2);

  const resolveImg = (src?: string | null) => {
    if (!src) return "/projects/merchant_analytics_dashboard.jpg";
    if (src.startsWith("http://") || src.startsWith("https://")) return src;
    if (src.startsWith("/storage/")) return `http://localhost:8000${src}`;
    return src;
  };

  const mainImage = resolveImg(
    (project.gallery_urls && project.gallery_urls.length > 0
      ? project.gallery_urls[0]
      : null) || project.thumbnail_url
  );

  const deliverables: string[] = Array.isArray(project.key_deliverables)
    ? project.key_deliverables
    : typeof project.key_deliverables === "string"
    ? project.key_deliverables.split("\n").map((s: string) => s.trim()).filter(Boolean)
    : [];

  const techStack: string[] = Array.isArray(project.tech_stack)
    ? project.tech_stack
    : typeof project.tech_stack === "string"
    ? project.tech_stack.split(",").map((s: string) => s.trim()).filter(Boolean)
    : [];

  const extraGallery: string[] = Array.isArray(project.gallery_urls)
    ? project.gallery_urls.filter((url) => Boolean(url) && url !== mainImage)
    : [];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 selection:bg-blue-100 selection:text-blue-700">
      {/* Top Breadcrumb Navigation */}
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="inline-flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
              Case Study
            </span>
          </div>
        </div>
      </header>

      {/* Main Case Study Container */}
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
        {/* Project Hero Banner */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-800 text-xs font-semibold uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5 text-blue-600" />
              <span>{project.category}</span>
            </div>

            {/* Direct Action Links (Demo / GitHub) */}
            <div className="flex items-center gap-2">
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white shadow-xs transition-all"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                </a>
              )}

              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition-all"
                >
                  <Icons.GitHub className="w-3.5 h-3.5" />
                  <span>Repository</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
                </a>
              )}
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
            {project.summary}
          </p>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                Role
              </span>
              <p className="text-sm font-bold text-slate-900">
                {project.role_title || "Full-Stack Developer"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                Category
              </span>
              <p className="text-sm font-bold text-slate-900">
                {project.category}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                {project.metrics_label || "Quality"}
              </span>
              <p className="text-sm font-bold text-blue-700">
                {project.metrics_value || "Production Grade"}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                Author
              </span>
              <p className="text-sm font-bold text-slate-900">Dhurba Dhakal</p>
            </div>
          </div>

          {/* Featured Primary Screenshot */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg bg-slate-950 aspect-video max-h-[480px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mainImage}
              alt={project.title}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Detailed Narrative Section if available */}
        {project.full_description && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="inline-flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider">
              <FileCode2 className="w-4 h-4 text-indigo-600" />
              <span>Project Overview &amp; Background</span>
            </div>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {project.full_description}
            </p>
          </div>
        )}

        {/* Challenge & Architectural Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* The Challenge */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
            <div className="inline-flex items-center gap-2 text-rose-700 font-bold text-sm uppercase tracking-wider">
              <Workflow className="w-4 h-4 text-rose-600" />
              <span>The Engineering Challenge</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Business Objectives &amp; System Complexity
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {project.challenge ||
                "Designing transactional reliability, database schema normalization, and role-based permissions to streamline organizational workflows without latency or data discrepancies."}
            </p>
          </div>

          {/* The Solution */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-blue-200/80 bg-gradient-to-br from-blue-50/40 to-white shadow-sm space-y-4">
            <div className="inline-flex items-center gap-2 text-blue-700 font-bold text-sm uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-blue-600" />
              <span>Architectural Solution</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Structured MVC &amp; Data Pipeline Execution
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {project.solution ||
                "Engineered a scalable Laravel application with robust Eloquent models, indexing optimizations, modular controllers, and clean frontend UI implementation."}
            </p>
          </div>
        </div>

        {/* Key Deliverables */}
        {deliverables.length > 0 && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h3 className="text-xl font-extrabold text-slate-900">
                Key Deliverables &amp; Implemented Modules
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {deliverables.map((deliverable: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/60"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-800 leading-snug">
                    {deliverable}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies Used */}
        {techStack.length > 0 && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              <h3 className="text-xl font-extrabold text-slate-900">
                Technology Stack &amp; Tools
              </h3>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {techStack.map((tech: string, index: number) => (
                <span
                  key={index}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 text-sm font-medium hover:border-blue-300 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Additional Gallery Screenshots if available in CMS */}
        {extraGallery.length > 0 && (
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-extrabold text-slate-900">
                Additional Screenshots &amp; Media
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {extraGallery.map((shot: string, idx: number) => (
                <div
                  key={idx}
                  className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 aspect-video"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resolveImg(shot)}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Need a Similar Web Solution Built?
            </h3>
            <p className="text-blue-200 text-sm sm:text-base max-w-xl">
              Let&apos;s collaborate to design, develop, and deploy your custom web application or Laravel CMS with production-grade quality.
            </p>
          </div>

          <Link
            href="/#feedback"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-blue-900 font-bold text-sm shadow-md hover:bg-blue-50 transition-all transform hover:-translate-y-0.5"
          >
            <span>Start a Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Other Projects Preview */}
        {otherProjects.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-slate-200">
            <h3 className="text-xl font-extrabold text-slate-900">
              Explore More Case Studies
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherProjects.map((item: any) => (
                <Link
                  key={item.id}
                  href={`/projects/${item.slug}`}
                  className="group p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-md transition-all space-y-3"
                >
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {item.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
