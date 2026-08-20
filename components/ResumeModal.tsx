"use client";

import React, { useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Printer,
  Download,
  FileText,
  Mail,
  MapPin,
  Globe,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Code2,
  Server,
  Layers,
  Sparkles,
} from "lucide-react";
import { Icons } from "@/components/Icons";
import { cvData } from "@/lib/cvData";
import { cn } from "@/lib/utils";

export interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile?: any;
  settings?: any;
  experiences?: any[];
  skills?: any[];
  education?: any[];
  projects?: any[];
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  profile,
  settings,
  experiences,
  skills,
  education,
  projects,
}) => {
  const fullName = profile?.full_name || cvData.personalInfo.fullName;
  const primaryTitle = profile?.primary_title || cvData.personalInfo.primaryTitle;
  const secondaryTitle = profile?.secondary_title || cvData.personalInfo.secondaryTitle;
  const primaryEmail = settings?.primary_email || cvData.personalInfo.primaryEmail;
  const secondaryEmail = settings?.secondary_email || cvData.personalInfo.secondaryEmail;
  const location = settings?.location || cvData.personalInfo.location;
  const availability = settings?.availability_status || cvData.personalInfo.availability;
  const summary = profile?.short_bio || cvData.personalInfo.summary;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleKeyDown]);

  // Direct Print / Save as PDF action
  const handlePrint = () => {
    window.print();
  };

  // Download raw JSON for database/CMS backup
  const handleDownloadJSON = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(cvData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "dhurba_dhakal_cv.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Download formatted markdown
  const handleDownloadMarkdown = () => {
    const mdContent = `# ${fullName}
**${primaryTitle}**
*${secondaryTitle}*

- **Location**: ${location}
- **Primary Email**: ${primaryEmail}
- **Tech / Business Email**: ${secondaryEmail}
- **GitHub**: ${settings?.github_url || cvData.personalInfo.githubUrl}
- **LinkedIn**: ${settings?.linkedin_url || cvData.personalInfo.linkedinUrl}
- **Availability**: ${availability}

---

## Executive Summary
${summary}

---

## Professional Work Experience

${cvData.experience
  .map(
    (exp) => `### ${exp.position} — ${exp.company}
*Status: ${exp.status} | Location: ${exp.location}*
${exp.overview}

**Key Responsibilities:**
${exp.responsibilities.map((r) => `- ${r}`).join("\n")}

**Technologies:** ${exp.techStack.join(", ")}
`
  )
  .join("\n\n")}

---

## Freelance Practice & Independent Delivery
**Role:** ${cvData.freelancePractice.role}
**Identity:** ${cvData.freelancePractice.identity}
${cvData.freelancePractice.overview}

**Services Offered:**
${cvData.freelancePractice.services.map((s) => `- ${s}`).join("\n")}

---

## Higher Education
${cvData.education
  .map(
    (edu) => `### ${edu.degree} — ${edu.institution}
*Field: ${edu.field} | Location: ${edu.location}*
`
  )
  .join("\n\n")}

---

## Technical Skills Matrix

### Strong / Primary Specialization
${cvData.skills.primary
  .map((cat) => `- **${cat.category}**: ${cat.items.join(", ")}`)
  .join("\n")}

### Working / Project Experience
${cvData.skills.secondary
  .map((cat) => `- **${cat.category}**: ${cat.items.join(", ")}`)
  .join("\n")}

---

## Featured Software Projects
${cvData.featuredProjects
  .map(
    (proj) => `### ${proj.title}
*Role: ${proj.role} | Category: ${proj.category}*
${proj.description}

**Key Deliverables:**
${proj.keyDeliverables.map((d) => `- ${d}`).join("\n")}

**Tech Stack:** ${proj.technologies.join(", ")}`
  )
  .join("\n\n")}

---

## Guiding Principles & Development Philosophy
${cvData.philosophy
  .map((phi) => `- **${phi.title}**: ${phi.principle}`)
  .join("\n")}
`;

    const blob = new Blob([mdContent], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", url);
    downloadAnchor.setAttribute("download", "Dhurba_Dhakal_CV.md");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="printable-cv-modal-wrapper"
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto print:p-0 print:static print:overflow-visible print:bg-white"
        >
          {/* Backdrop Blur Overlay (Hidden in print) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md print:hidden"
          />

          {/* Modal Master Container */}
          <motion.div
            id="printable-cv-modal"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl overflow-hidden z-10 my-auto",
              "bg-white border border-slate-200/90 shadow-2xl",
              "print:max-w-none print:max-h-none print:rounded-none print:border-none print:shadow-none print:m-0 print:p-0 print:bg-white"
            )}
          >
            {/* Modal Actions Header Bar */}
            <div className="flex items-center justify-between px-6 py-3.5 bg-slate-900 text-white border-b border-slate-800 print:hidden">
              <div className="flex items-center gap-2 text-xs font-mono">
                <FileText className="w-4 h-4 text-blue-400" />
                <span className="font-bold">Curriculum Vitae</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">{fullName}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Print or Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save as PDF</span>
                </button>

                <button
                  onClick={handleDownloadMarkdown}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Download Markdown (.md)"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Markdown</span>
                </button>

                <button
                  onClick={handleDownloadJSON}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Download Database JSON (.json)"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">JSON</span>
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1 cursor-pointer"
                  aria-label="Close CV preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Printable Document Body */}
            <div
              id="printable-cv-content"
              className="overflow-y-auto p-6 sm:p-10 text-slate-900 bg-white font-sans space-y-6 print:p-0 print:space-y-4 print:overflow-visible print:bg-white"
            >
              {/* Document Header */}
              <div className="border-b-2 border-slate-900 pb-4 cv-section">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                      {fullName}
                    </h1>
                    <p className="text-sm font-bold text-blue-700 mt-0.5">
                      {primaryTitle}
                    </p>
                    <p className="text-xs font-semibold text-slate-600">
                      {secondaryTitle}
                    </p>
                  </div>

                  <div className="text-xs text-slate-600 sm:text-right space-y-1 font-medium">
                    <div className="flex items-center sm:justify-end gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-blue-700" />
                      <a href={`mailto:${primaryEmail}`} className="font-semibold text-slate-900">
                        {primaryEmail}
                      </a>
                    </div>
                    <div className="flex items-center sm:justify-end gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-indigo-700" />
                      <a href={`mailto:${secondaryEmail}`} className="font-semibold text-slate-900">
                        {secondaryEmail}
                      </a>
                    </div>
                    <div className="flex items-center sm:justify-end gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-600" />
                      <span>{location} • UTC+5:45</span>
                    </div>
                    <div className="flex items-center sm:justify-end gap-1.5 font-mono text-[11px]">
                      <span>github.com/dhurbagit</span>
                      <span>•</span>
                      <span>{availability}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="cv-section">
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Executive Summary</span>
                </h2>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {summary}
                </p>
              </div>

              {/* Professional Work Experience */}
              <div className="cv-section">
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 mb-2 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                  <span>Professional Work Experience</span>
                </h2>

                <div className="space-y-3">
                  {(Array.isArray(experiences) && experiences.length > 0 ? experiences : cvData.experience).map((exp: any, idx: number) => {
                    const pos = exp.position || "Developer";
                    const comp = exp.company_name || exp.company || "Company";
                    const status = exp.status || "Previous Role";
                    const loc = exp.location || "Nepal";
                    const overview = exp.overview || "";
                    const responsibilities = Array.isArray(exp.responsibilities)
                      ? exp.responsibilities
                      : typeof exp.responsibilities === "string"
                      ? exp.responsibilities.split("\n").filter(Boolean)
                      : [];
                    const techStack = Array.isArray(exp.tech_stack || exp.techStack)
                      ? (exp.tech_stack || exp.techStack)
                      : typeof (exp.tech_stack || exp.techStack) === "string"
                      ? (exp.tech_stack || exp.techStack).split(",").map((s: string) => s.trim())
                      : [];

                    return (
                      <div key={exp.id || idx} className="cv-card p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div>
                            <h3 className="font-extrabold text-xs sm:text-sm text-slate-900">
                              {pos} — <span className="text-blue-700">{comp}</span>
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 text-[10.5px] font-mono">
                            <span className="px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-semibold">
                              {status}
                            </span>
                            <span className="text-slate-500">{loc}</span>
                          </div>
                        </div>

                        {overview && (
                          <p className="text-[11.5px] text-slate-600 leading-relaxed font-medium">
                            {overview}
                          </p>
                        )}

                        {responsibilities.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1">
                            {responsibilities.map((resp: string, i: number) => (
                              <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-700">
                                <CheckCircle2 className="w-3 h-3 text-blue-600 flex-shrink-0 mt-0.5" />
                                <span className="leading-snug">{resp}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {techStack.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1.5 border-t border-slate-200/60">
                            {techStack.map((tech: string) => (
                              <span
                                key={tech}
                                className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Technical Skills Matrix */}
              <div className="cv-section">
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 mb-2 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Technical Skills &amp; Specialization</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="cv-card p-3 rounded-xl bg-blue-50/40 border border-blue-100 space-y-1.5">
                    <div className="text-[11px] font-bold text-blue-700 uppercase font-mono">
                      Strong / Primary (Production Grade)
                    </div>
                    {cvData.skills.primary.map((cat, idx) => (
                      <div key={idx} className="text-[11px]">
                        <span className="font-semibold text-slate-900">{cat.category}: </span>
                        <span className="text-slate-700">{cat.items.join(", ")}</span>
                      </div>
                    ))}
                  </div>

                  <div className="cv-card p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-700 uppercase font-mono">
                      Working / Project Experience
                    </div>
                    {cvData.skills.secondary.map((cat, idx) => (
                      <div key={idx} className="text-[11px]">
                        <span className="font-semibold text-slate-900">{cat.category}: </span>
                        <span className="text-slate-700">{cat.items.join(", ")}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Higher Education */}
              <div className="cv-section">
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 mb-1.5 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                  <span>Higher Education</span>
                </h2>

                <div className="space-y-2">
                  {(Array.isArray(education) && education.length > 0 ? education : cvData.education).map((edu: any, idx: number) => {
                    const degree = edu.degree || "Degree";
                    const field = edu.field_of_study || edu.field || "Information Technology";
                    const institution = edu.institution || "University";
                    const loc = edu.location || "Nepal";
                    const coursework = Array.isArray(edu.coursework)
                      ? edu.coursework
                      : typeof edu.coursework === "string"
                      ? edu.coursework.split(",").map((s: string) => s.trim())
                      : [];

                    return (
                      <div key={edu.id || idx} className="cv-card p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900">
                            {degree} — {field}
                          </span>
                          <span className="text-[11px] font-semibold text-blue-700">{loc}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 font-medium">
                          Institution: <strong className="text-slate-800">{institution}</strong>
                        </p>
                        {coursework.length > 0 && (
                          <p className="text-[10.5px] text-slate-500 pt-0.5">
                            <strong>Core Curriculum:</strong> {coursework.join(", ")}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Featured Projects Highlight */}
              <div className="cv-section">
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 mb-1.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-600" />
                  <span>Featured Software Projects</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(Array.isArray(projects) && projects.length > 0 ? projects : cvData.featuredProjects).map((proj: any, idx: number) => {
                    const title = proj.title || "Project";
                    const role = proj.role_title || proj.role || "Developer";
                    const category = proj.category || "Web App";
                    const desc = proj.summary || proj.description || "";
                    const stack = Array.isArray(proj.tech_stack || proj.technologies)
                      ? (proj.tech_stack || proj.technologies)
                      : typeof (proj.tech_stack || proj.technologies) === "string"
                      ? (proj.tech_stack || proj.technologies).split(",").map((s: string) => s.trim())
                      : [];

                    return (
                      <div key={proj.id || idx} className="cv-card p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-0.5 text-[11px]">
                        <div className="font-bold text-slate-900">{title}</div>
                        <div className="text-[10px] font-semibold text-blue-700">{role} • {category}</div>
                        <p className="text-slate-600 text-[10.5px] leading-relaxed line-clamp-2">{desc}</p>
                        {stack.length > 0 && (
                          <div className="text-[9.5px] font-mono text-slate-500 pt-0.5">
                            Stack: {stack.join(", ")}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Freelance Services */}
              <div className="cv-section">
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 mb-1 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-blue-600" />
                  <span>Freelance &amp; Client Capabilities</span>
                </h2>

                <div className="flex flex-wrap gap-1">
                  {cvData.freelancePractice.services.map((srv, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700">
                      {srv}
                    </span>
                  ))}
                </div>
              </div>

              {/* Document Footer */}
              <div className="pt-3 border-t border-slate-200 text-[10px] text-slate-500 flex items-center justify-between font-mono cv-section">
                <span>Dhurba Dhakal • Complete Curriculum Vitae</span>
                <span>Generated from Portfolio Database</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
