"use client";

import React, { useEffect, useState } from "react";
import {
  Briefcase,
  Plus,
  Trash2,
  CheckCircle2,
  Building,
  MapPin,
  Calendar,
  Loader2,
  X,
  GraduationCap,
  Layers,
  Palette,
  Sparkles,
} from "lucide-react";
import {
  getAdminWorkExperience,
  createAdminWorkExperience,
  deleteAdminWorkExperience,
  getAdminFreelanceSuites,
  createAdminFreelanceSuite,
  deleteAdminFreelanceSuite,
  getAdminDesignExperiences,
  createAdminDesignExperience,
  deleteAdminDesignExperience,
  getAdminEducation,
  createAdminEducation,
  deleteAdminEducation,
} from "@/lib/adminApi";
import { cn } from "@/lib/utils";

export default function AdminExperiencePage() {
  const [activeTab, setActiveTab] = useState<"work" | "freelance" | "design" | "education">("work");
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // States
  const [workExp, setWorkExp] = useState<any[]>([]);
  const [freelanceSuites, setFreelanceSuites] = useState<any[]>([]);
  const [designExp, setDesignExp] = useState<any[]>([]);
  const [educationList, setEducationList] = useState<any[]>([]);

  // Form states
  const [workForm, setWorkForm] = useState({
    company_name: "",
    position: "",
    status: "Currently Working",
    location: "Nepal",
    overview: "",
    responsibilities: "Engineered scalable backend systems\nOptimized database performance",
    tech_stack: "Laravel, PHP, MySQL",
  });

  const [freelanceForm, setFreelanceForm] = useState({
    title: "",
    subtitle: "Custom Web Engineering",
    description: "",
    capabilities: "End-to-end custom application development\nREST API integrations",
    technologies: "Laravel, PHP, MySQL, React",
    accent_color: "emerald",
  });

  const [designForm, setDesignForm] = useState({
    title: "",
    description: "",
    design_tags: "UI/UX, Responsive Design, Design Systems",
  });

  const [eduForm, setEduForm] = useState({
    degree: "BSc IT",
    field_of_study: "Bachelor of Science in Information Technology",
    institution: "Lord Buddha Education Foundation",
    location: "Nepal",
    coursework: "Software Engineering, Relational Databases, Web Technologies",
  });

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [wRes, fRes, dRes, eRes] = await Promise.all([
        getAdminWorkExperience(),
        getAdminFreelanceSuites(),
        getAdminDesignExperiences(),
        getAdminEducation(),
      ]);

      if (wRes.success && wRes.data) setWorkExp(wRes.data);
      if (fRes.success && fRes.data) setFreelanceSuites(fRes.data);
      if (dRes.success && dRes.data) setDesignExp(dRes.data);
      if (eRes.success && eRes.data) setEducationList(eRes.data);
    } catch {
      // Ignored
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    let res: any = { success: false };

    if (activeTab === "work") {
      res = await createAdminWorkExperience({
        ...workForm,
        responsibilities: workForm.responsibilities
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        tech_stack: workForm.tech_stack
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        accent_theme: "royal",
        display_order: workExp.length + 1,
        is_visible: true,
      });
    } else if (activeTab === "freelance") {
      res = await createAdminFreelanceSuite({
        ...freelanceForm,
        capabilities: freelanceForm.capabilities
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        technologies: freelanceForm.technologies
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        suite_number: `0${freelanceSuites.length + 1}`,
        display_order: freelanceSuites.length + 1,
        is_visible: true,
      });
    } else if (activeTab === "design") {
      res = await createAdminDesignExperience({
        ...designForm,
        design_tags: designForm.design_tags
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        capability_number: `0${designExp.length + 1}`,
        display_order: designExp.length + 1,
        is_visible: true,
      });
    } else if (activeTab === "education") {
      res = await createAdminEducation({
        ...eduForm,
        coursework: eduForm.coursework
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        duration: "Completed",
        display_order: educationList.length + 1,
        is_visible: true,
      });
    }

    if (res.success) {
      setIsModalOpen(false);
      loadData();
      setNotification("Record created and synced with live frontend.");
      setTimeout(() => setNotification(""), 3500);
    } else {
      alert(res.message || "Failed to create record.");
    }
  };

  const handleDelete = async (id: number | string) => {
    if (!confirm("Are you sure you want to remove this record?")) return;
    let res: any = { success: false };

    if (activeTab === "work") res = await deleteAdminWorkExperience(id);
    else if (activeTab === "freelance") res = await deleteAdminFreelanceSuite(id);
    else if (activeTab === "design") res = await deleteAdminDesignExperience(id);
    else if (activeTab === "education") res = await deleteAdminEducation(id);

    if (res.success) {
      loadData();
      setNotification("Record deleted successfully.");
      setTimeout(() => setNotification(""), 3500);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Career, Experience &amp; Academic Modules
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Manage professional software roles, freelance suites, design capabilities, and academic degrees.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>
            {activeTab === "work" && "Add Work Role"}
            {activeTab === "freelance" && "Add Freelance Suite"}
            {activeTab === "design" && "Add Design Capability"}
            {activeTab === "education" && "Add Academic Degree"}
          </span>
        </button>
      </div>

      {notification && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Sub-Tab Navigation Bar */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab("work")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap",
            activeTab === "work"
              ? "bg-blue-600 text-white shadow-md"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          )}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Work Experience ({workExp.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("freelance")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap",
            activeTab === "freelance"
              ? "bg-blue-600 text-white shadow-md"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          )}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Freelance Suites ({freelanceSuites.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("design")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap",
            activeTab === "design"
              ? "bg-blue-600 text-white shadow-md"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          )}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Design Capabilities ({designExp.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("education")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap",
            activeTab === "education"
              ? "bg-blue-600 text-white shadow-md"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          )}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Higher Education ({educationList.length})</span>
        </button>
      </div>

      {isLoading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-xs text-slate-400 font-mono">Loading records from database...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* TAB 1: WORK EXPERIENCE */}
          {activeTab === "work" && (
            <div className="grid grid-cols-1 gap-4">
              {workExp.map((exp) => (
                <div
                  key={exp.id}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                        {exp.role_number || "Role"}
                      </span>
                      <h3 className="text-base font-bold text-white">{exp.position}</h3>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs font-semibold text-emerald-400">{exp.company_name}</span>
                    </div>
                    <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">{exp.overview}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {Array.isArray(exp.tech_stack) &&
                        exp.tech_stack.map((t: string) => (
                          <span
                            key={t}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                          >
                            {t}
                          </span>
                        ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors cursor-pointer self-end md:self-center"
                    title="Delete Role"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: FREELANCE SUITES */}
          {activeTab === "freelance" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {freelanceSuites.map((s) => (
                <div
                  key={s.id}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Suite {s.suite_number || "01"}
                      </span>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="text-base font-bold text-white">{s.title}</h3>
                    <p className="text-xs text-slate-400">{s.subtitle}</p>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">{s.description}</p>
                  </div>

                  <div className="space-y-1 pt-3 border-t border-slate-800">
                    {Array.isArray(s.capabilities) &&
                      s.capabilities.map((c: string, i: number) => (
                        <div key={i} className="text-xs text-slate-400 flex items-start gap-1.5">
                          <span className="text-emerald-400">•</span>
                          <span>{c}</span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: DESIGN CAPABILITIES */}
          {activeTab === "design" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {designExp.map((d) => (
                <div
                  key={d.id}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                        {d.capability_number || "01"}
                      </span>
                      <button
                        onClick={() => handleDelete(d.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="text-base font-bold text-white">{d.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{d.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-3 border-t border-slate-800">
                    {Array.isArray(d.design_tags) &&
                      d.design_tags.map((t: string) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20"
                        >
                          {t}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: EDUCATION */}
          {activeTab === "education" && (
            <div className="grid grid-cols-1 gap-4">
              {educationList.map((edu) => (
                <div
                  key={edu.id}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                        Academic Degree
                      </span>
                      <h3 className="text-base font-bold text-white">{edu.degree}</h3>
                      <span className="text-xs text-slate-400">•</span>
                      <span className="text-xs font-semibold text-slate-300">{edu.field_of_study}</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      {edu.institution} ({edu.location})
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {Array.isArray(edu.coursework) &&
                        edu.coursework.map((c: string) => (
                          <span
                            key={c}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                          >
                            {c}
                          </span>
                        ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(edu.id)}
                    className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-colors cursor-pointer self-end md:self-center"
                    title="Delete Degree"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-hidden animate-fadeIn">
          <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[88vh] sm:max-h-[92vh] overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900 flex-shrink-0">
              <h3 className="text-lg font-bold text-white">
                {activeTab === "work" && "Add Professional Work Role"}
                {activeTab === "freelance" && "Add Freelance Practice Suite"}
                {activeTab === "design" && "Add Design & UI/UX Capability"}
                {activeTab === "education" && "Add Higher Education Degree"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              id="experience-cms-form"
              onSubmit={handleCreate}
              className="flex-1 overflow-y-auto p-6 space-y-4 text-xs"
            >
              {/* WORK FORM */}
              {activeTab === "work" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 font-medium mb-1">Company Name</label>
                      <input
                        type="text"
                        required
                        value={workForm.company_name}
                        onChange={(e) => setWorkForm({ ...workForm, company_name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                        placeholder="e.g. Acme Corporation"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-medium mb-1">Position / Title</label>
                      <input
                        type="text"
                        required
                        value={workForm.position}
                        onChange={(e) => setWorkForm({ ...workForm, position: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                        placeholder="e.g. Senior Backend Developer"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Role Overview &amp; Impact</label>
                    <textarea
                      rows={3}
                      required
                      value={workForm.overview}
                      onChange={(e) => setWorkForm({ ...workForm, overview: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white leading-relaxed"
                      placeholder="Brief overview of software architecture and achievements..."
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-medium mb-1">
                      Key Responsibilities (One per line)
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={workForm.responsibilities}
                      onChange={(e) => setWorkForm({ ...workForm, responsibilities: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white leading-relaxed font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-medium mb-1">
                      Tech Stack (Comma-separated)
                    </label>
                    <input
                      type="text"
                      required
                      value={workForm.tech_stack}
                      onChange={(e) => setWorkForm({ ...workForm, tech_stack: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                </>
              )}

              {/* FREELANCE FORM */}
              {activeTab === "freelance" && (
                <>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Suite Title</label>
                    <input
                      type="text"
                      required
                      value={freelanceForm.title}
                      onChange={(e) => setFreelanceForm({ ...freelanceForm, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                      placeholder="e.g. Enterprise Microservices & APIs"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Subtitle</label>
                    <input
                      type="text"
                      required
                      value={freelanceForm.subtitle}
                      onChange={(e) => setFreelanceForm({ ...freelanceForm, subtitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                      placeholder="e.g. Scalable Backend Architecture"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Suite Description</label>
                    <textarea
                      rows={3}
                      required
                      value={freelanceForm.description}
                      onChange={(e) => setFreelanceForm({ ...freelanceForm, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white leading-relaxed"
                      placeholder="Description of freelance offering..."
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-medium mb-1">
                      Capabilities (One per line)
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={freelanceForm.capabilities}
                      onChange={(e) => setFreelanceForm({ ...freelanceForm, capabilities: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white leading-relaxed font-mono"
                    />
                  </div>
                </>
              )}

              {/* DESIGN FORM */}
              {activeTab === "design" && (
                <>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Capability Title</label>
                    <input
                      type="text"
                      required
                      value={designForm.title}
                      onChange={(e) => setDesignForm({ ...designForm, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                      placeholder="e.g. Design Systems & Component Architecture"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Description</label>
                    <textarea
                      rows={3}
                      required
                      value={designForm.description}
                      onChange={(e) => setDesignForm({ ...designForm, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white leading-relaxed"
                      placeholder="Explanation of visual design expertise..."
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-medium mb-1">
                      Design Tags (Comma-separated)
                    </label>
                    <input
                      type="text"
                      required
                      value={designForm.design_tags}
                      onChange={(e) => setDesignForm({ ...designForm, design_tags: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                      placeholder="Figma, Tailwind, Component States"
                    />
                  </div>
                </>
              )}

              {/* EDUCATION FORM */}
              {activeTab === "education" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 font-medium mb-1">Degree Title</label>
                      <input
                        type="text"
                        required
                        value={eduForm.degree}
                        onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                        placeholder="e.g. BSc IT"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-medium mb-1">Field of Study</label>
                      <input
                        type="text"
                        required
                        value={eduForm.field_of_study}
                        onChange={(e) => setEduForm({ ...eduForm, field_of_study: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 font-medium mb-1">Institution</label>
                      <input
                        type="text"
                        required
                        value={eduForm.institution}
                        onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 font-medium mb-1">Location</label>
                      <input
                        type="text"
                        required
                        value={eduForm.location}
                        onChange={(e) => setEduForm({ ...eduForm, location: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 font-medium mb-1">
                      Coursework &amp; Foundations (Comma-separated)
                    </label>
                    <input
                      type="text"
                      required
                      value={eduForm.coursework}
                      onChange={(e) => setEduForm({ ...eduForm, coursework: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    />
                  </div>
                </>
              )}
            </form>

            <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex items-center justify-end gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="experience-cms-form"
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all cursor-pointer"
              >
                Save Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
