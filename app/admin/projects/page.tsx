"use client";

import React, { useEffect, useState } from "react";
import {
  FolderGit2,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  Tag,
  X,
  Save,
  Image as ImageIcon,
  UploadCloud,
} from "lucide-react";
import {
  getAdminProjects,
  createAdminProject,
  updateAdminProject,
  deleteAdminProject,
  toggleAdminProjectPublish,
  uploadAdminMedia,
} from "@/lib/adminApi";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImg, setIsUploadingImg] = useState(false);
  const [notification, setNotification] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "Web Application",
    role_title: "Full-Stack Developer",
    summary: "",
    full_description: "",
    challenge: "",
    solution: "",
    key_deliverables: "Dynamic product catalog\nRole-based access control\nAPI integrations",
    tech_stack: "Laravel, PHP, MySQL, JavaScript",
    metrics_label: "Architecture",
    metrics_value: "100% Production Grade",
    thumbnail_url: "",
    demo_url: "",
    github_url: "",
    is_featured: true,
    is_published: true,
  });

  const loadProjects = async () => {
    setIsLoading(true);
    const res = await getAdminProjects();
    if (res.success && res.data) setProjects(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("folder", "projects");
    data.append("alt_text", formData.title || "Project Screenshot");

    setIsUploadingImg(true);
    const res = await uploadAdminMedia(data);
    setIsUploadingImg(false);

    const uploadedUrl = res.data?.public_url || res.data?.url || (typeof res.data === "string" ? res.data : "");
    if (res.success && uploadedUrl) {
      setFormData((prev) => ({
        ...prev,
        thumbnail_url: uploadedUrl,
      }));
      setNotification("Project image uploaded successfully!");
      setTimeout(() => setNotification(""), 3500);
    } else {
      alert(res.message || "Failed to upload image.");
    }
  };

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      slug: "",
      category: "Web Application",
      role_title: "Full-Stack Developer",
      summary: "",
      full_description: "",
      challenge: "",
      solution: "",
      key_deliverables: "Dynamic product catalog\nRole-based access control\nAPI integrations",
      tech_stack: "Laravel, PHP, MySQL, JavaScript",
      metrics_label: "Architecture",
      metrics_value: "100% Production Grade",
      thumbnail_url: "",
      demo_url: "",
      github_url: "",
      is_featured: true,
      is_published: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p: any) => {
    setEditingProject(p);
    setFormData({
      title: p.title || "",
      slug: p.slug || "",
      category: p.category || "",
      role_title: p.role_title || "Full-Stack Developer",
      summary: p.summary || "",
      full_description: p.full_description || "",
      challenge: p.challenge || "",
      solution: p.solution || "",
      key_deliverables: Array.isArray(p.key_deliverables)
        ? p.key_deliverables.join("\n")
        : typeof p.key_deliverables === "string"
        ? p.key_deliverables
        : "",
      tech_stack: Array.isArray(p.tech_stack)
        ? p.tech_stack.join(", ")
        : typeof p.tech_stack === "string"
        ? p.tech_stack
        : "",
      metrics_label: p.metrics_label || "Architecture",
      metrics_value: p.metrics_value || "100% Production Grade",
      thumbnail_url: p.thumbnail_url || (Array.isArray(p.gallery_urls) ? p.gallery_urls[0] : "") || "",
      demo_url: p.demo_url || "",
      github_url: p.github_url || "",
      is_featured: Boolean(p.is_featured),
      is_published: Boolean(p.is_published),
    });
    setIsModalOpen(true);
  };

  const handleTogglePublish = async (id: number | string) => {
    const res = await toggleAdminProjectPublish(id);
    if (res.success) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, is_published: res.data.is_published } : p
        )
      );
      setNotification("Project publish status updated.");
    }
  };

  const handleDelete = async (id: number | string) => {
    if (!confirm("Are you sure you want to delete this project case study?"))
      return;
    const res = await deleteAdminProject(id);
    if (res.success) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setNotification("Project deleted successfully.");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      ...formData,
      thumbnail_url: formData.thumbnail_url || null,
      gallery_urls: formData.thumbnail_url ? [formData.thumbnail_url] : [],
      key_deliverables: formData.key_deliverables
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      tech_stack: formData.tech_stack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    let res;
    if (editingProject) {
      res = await updateAdminProject(editingProject.id, payload);
    } else {
      res = await createAdminProject(payload);
    }

    setIsSaving(false);

    if (res.success) {
      setIsModalOpen(false);
      loadProjects();
      setNotification(
        editingProject ? "Project updated successfully!" : "New project created!"
      );
    } else {
      alert(res.message || "Failed to save project.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Projects &amp; Case Studies
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Create, edit, toggle publishing, and manage case study architecture.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {notification && (
        <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center justify-between">
          <span>{notification}</span>
          <button
            onClick={() => setNotification("")}
            className="text-emerald-400"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Projects Table */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800/80 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-mono border-b border-slate-800">
              <tr>
                <th className="p-4 font-semibold w-28">Preview Image</th>
                <th className="p-4 font-semibold">Title &amp; Category</th>
                <th className="p-4 font-semibold">Slug</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Featured</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
                    <span>Loading projects...</span>
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No projects found. Add one above!
                  </td>
                </tr>
              ) : (
                projects.map((p, idx) => {
                  let imgPath = p.thumbnail_url || (Array.isArray(p.gallery_urls) ? p.gallery_urls[0] : "");
                  if (imgPath && imgPath.startsWith("/storage/")) {
                    imgPath = `http://localhost:8000${imgPath}`;
                  }
                  if (!imgPath) {
                    imgPath =
                      idx === 0
                        ? "/projects/inventory_billing_system.jpg"
                        : idx === 1
                        ? "/projects/merchant_analytics_dashboard.jpg"
                        : "/projects/ndpc_payment_dashboard.jpg";
                  }

                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-900/40 transition-colors"
                    >
                      <td className="p-4">
                        <div className="relative group/img w-20 h-12 rounded-lg overflow-hidden border border-slate-800 bg-slate-900 flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={imgPath}
                            alt={p.title}
                            className="w-full h-full object-cover object-top"
                          />
                          <label className="absolute inset-0 bg-slate-950/75 opacity-0 group-hover/img:opacity-100 flex flex-col items-center justify-center text-[9px] text-white font-bold cursor-pointer transition-opacity">
                            <UploadCloud className="w-3.5 h-3.5 text-blue-400 mb-0.5" />
                            <span>Change</span>
                            <input
                              type="file"
                              accept="image/png,image/jpeg,image/webp,image/jpg"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const data = new FormData();
                                data.append("file", file);
                                data.append("folder", "projects");
                                data.append("alt_text", p.title);
                                setIsLoading(true);
                                const uploadRes = await uploadAdminMedia(data);
                                const uploadedUrl = uploadRes.data?.public_url || uploadRes.data?.url || (typeof uploadRes.data === "string" ? uploadRes.data : "");
                                if (uploadRes.success && uploadedUrl) {
                                  await updateAdminProject(p.id, {
                                    ...p,
                                    thumbnail_url: uploadedUrl,
                                    gallery_urls: [uploadedUrl],
                                  });
                                  loadProjects();
                                  setNotification(`Image for "${p.title}" updated successfully!`);
                                } else {
                                  alert(uploadRes.message || "Failed to upload image.");
                                  setIsLoading(false);
                                }
                              }}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-0.5 max-w-sm">
                          <p className="font-bold text-white text-sm">
                            {p.title}
                          </p>
                          <span className="text-[11px] text-blue-400 font-mono">
                            {p.category}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-slate-400">{p.slug}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleTogglePublish(p.id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-pointer transition-colors ${
                            p.is_published
                              ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800"
                              : "bg-amber-950/80 text-amber-300 border border-amber-800"
                          }`}
                        >
                          {p.is_published ? (
                            <>
                              <Eye className="w-3 h-3" />
                              <span>Published</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3" />
                              <span>Draft</span>
                            </>
                          )}
                        </button>
                      </td>
                      <td className="p-4">
                        <span
                          className={`text-[11px] font-semibold ${
                            p.is_featured ? "text-emerald-400" : "text-slate-500"
                          }`}
                        >
                          {p.is_featured ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            title="Edit Project"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/40 transition-colors"
                            title="Delete Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-hidden">
          <div className="max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[88vh] sm:max-h-[92vh] overflow-hidden animate-fadeIn">
            {/* Header (Sticky) */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900 flex-shrink-0">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {editingProject ? "Edit Project Case Study" : "Add New Project"}
                </h2>
                <p className="text-[11px] text-slate-400">
                  Configure project attributes, narrative, deliverables, and media.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form
              id="project-cms-form"
              onSubmit={handleSave}
              className="flex-1 overflow-y-auto p-6 space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-300 uppercase tracking-wider">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 uppercase tracking-wider">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 uppercase tracking-wider">
                    Role Title
                  </label>
                  <input
                    type="text"
                    value={formData.role_title}
                    onChange={(e) =>
                      setFormData({ ...formData, role_title: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-300 uppercase tracking-wider">
                    Summary (Short High-Level Hook)
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.summary}
                    onChange={(e) =>
                      setFormData({ ...formData, summary: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-300 uppercase tracking-wider">
                    Project Overview &amp; Background (Full Narrative)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.full_description}
                    onChange={(e) =>
                      setFormData({ ...formData, full_description: e.target.value })
                    }
                    placeholder="In-depth overview of the project, operational context, and architecture..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-300 uppercase tracking-wider">
                    The Engineering Challenge
                  </label>
                  <textarea
                    rows={2}
                    value={formData.challenge}
                    onChange={(e) =>
                      setFormData({ ...formData, challenge: e.target.value })
                    }
                    placeholder="System complexities, transaction boundaries, performance bottlenecks..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-300 uppercase tracking-wider">
                    Architectural Solution
                  </label>
                  <textarea
                    rows={2}
                    value={formData.solution}
                    onChange={(e) =>
                      setFormData({ ...formData, solution: e.target.value })
                    }
                    placeholder="Structured MVC execution, indexing, caching, queues..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 uppercase tracking-wider">
                    Live Demo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.demo_url}
                    onChange={(e) =>
                      setFormData({ ...formData, demo_url: e.target.value })
                    }
                    placeholder="https://example.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300 uppercase tracking-wider">
                    GitHub / Source Code URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.github_url}
                    onChange={(e) =>
                      setFormData({ ...formData, github_url: e.target.value })
                    }
                    placeholder="https://github.com/username/repo"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-300 uppercase tracking-wider">
                    Key Deliverables (1 per line)
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.key_deliverables}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        key_deliverables: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-blue-400" />
                      <span>Featured Project Screenshot / Thumbnail</span>
                    </label>
                    {isUploadingImg && (
                      <span className="text-[11px] text-blue-400 flex items-center gap-1">
                        <Loader2 className="w-3 h-3 animate-spin" /> Uploading image...
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer transition-all shadow-sm">
                      <UploadCloud className="w-4 h-4" />
                      <span>Choose &amp; Upload Image File</span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/jpg"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>

                    <div className="flex-1 w-full">
                      <input
                        type="text"
                        value={formData.thumbnail_url}
                        onChange={(e) =>
                          setFormData({ ...formData, thumbnail_url: e.target.value })
                        }
                        placeholder="or paste image URL / relative storage path..."
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-500 font-mono"
                      />
                    </div>
                  </div>

                  {formData.thumbnail_url && (
                    <div className="relative mt-2 p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={
                          formData.thumbnail_url.startsWith("/storage/")
                            ? `http://localhost:8000${formData.thumbnail_url}`
                            : formData.thumbnail_url
                        }
                        alt="Project Preview"
                        className="w-20 h-12 object-cover rounded-lg border border-slate-700 bg-slate-950"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-mono text-emerald-400 truncate">
                          {formData.thumbnail_url}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          Active thumbnail image
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, thumbnail_url: "" })
                        }
                        className="p-1 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800"
                        title="Remove Image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="font-bold text-slate-300 uppercase tracking-wider">
                    Tech Stack (Comma Separated)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.tech_stack}
                    onChange={(e) =>
                      setFormData({ ...formData, tech_stack: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>
            </form>

            {/* Sticky Footer */}
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
                form="project-cms-form"
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold inline-flex items-center gap-2 shadow-md shadow-blue-600/30 transition-all cursor-pointer"
              >
                {isSaving ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Save className="w-3.5 h-3.5" />
                )}
                <span>Save Project</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
