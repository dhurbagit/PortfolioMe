"use client";

import React, { useEffect, useState } from "react";
import {
  Settings,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Globe,
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  Briefcase,
  Lightbulb,
  Plus,
  Trash2,
  Camera,
  UploadCloud,
  User,
  Image as ImageIcon,
} from "lucide-react";
import {
  getAdminSettings,
  updateAdminSettings,
  getAdminHero,
  updateAdminHero,
  getAdminServices,
  createAdminService,
  deleteAdminService,
  getAdminPhilosophies,
  createAdminPhilosophy,
  deleteAdminPhilosophy,
  uploadAdminMedia,
} from "@/lib/adminApi";
import { cn } from "@/lib/utils";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "general" | "hero" | "services" | "philosophy"
  >("general");
  const [settings, setSettings] = useState<any>({});
  const [hero, setHero] = useState<any>({});
  const [services, setServices] = useState<any[]>([]);
  const [philosophies, setPhilosophies] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Sub-forms
  const [newService, setNewService] = useState({
    title: "",
    subtitle: "Backend & Systems",
    description: "",
    capabilities: "Laravel, REST APIs, MySQL",
    accent_color: "blue",
  });

  const [newPhilosophy, setNewPhilosophy] = useState({
    title: "",
    tagline: "Impact-Driven Engineering",
    description: "",
  });

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [sRes, hRes, srvRes, phiRes] = await Promise.all([
        getAdminSettings(),
        getAdminHero(),
        getAdminServices(),
        getAdminPhilosophies(),
      ]);
      if (sRes.success && sRes.data) setSettings(sRes.data);
      if (hRes.success && hRes.data) setHero(hRes.data);
      if (srvRes.success && srvRes.data) setServices(srvRes.data);
      if (phiRes.success && phiRes.data) setPhilosophies(phiRes.data);
    } catch {
      // Ignored
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    const res = await updateAdminSettings(settings);
    setIsSaving(false);

    if (res.success) {
      setSuccessMsg("Global website settings updated successfully!");
      setTimeout(() => setSuccessMsg(""), 3500);
    } else {
      setErrorMsg(res.message || "Failed to update website settings.");
    }
  };

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    const res = await updateAdminHero(hero);
    setIsSaving(false);

    if (res.success) {
      setSuccessMsg("Hero profile and story updated successfully!");
      setTimeout(() => setSuccessMsg(""), 3500);
    } else {
      setErrorMsg(res.message || "Failed to update hero profile.");
    }
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createAdminService({
      ...newService,
      capabilities: newService.capabilities
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      service_number: `0${services.length + 1}`,
      display_order: services.length + 1,
      is_visible: true,
    });

    if (res.success) {
      setNewService({
        title: "",
        subtitle: "Backend & Systems",
        description: "",
        capabilities: "Laravel, REST APIs, MySQL",
        accent_color: "blue",
      });
      loadData();
      setSuccessMsg("Service offering added successfully.");
      setTimeout(() => setSuccessMsg(""), 3500);
    } else {
      setErrorMsg(res.message || "Failed to add service.");
    }
  };

  const handleDeleteService = async (id: number | string) => {
    if (!confirm("Are you sure you want to remove this service?")) return;
    const res = await deleteAdminService(id);
    if (res.success) {
      loadData();
      setSuccessMsg("Service removed.");
      setTimeout(() => setSuccessMsg(""), 3500);
    }
  };

  const handleCreatePhilosophy = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createAdminPhilosophy({
      ...newPhilosophy,
      principle_number: `0${philosophies.length + 1}`,
      display_order: philosophies.length + 1,
      is_visible: true,
    });

    if (res.success) {
      setNewPhilosophy({
        title: "",
        tagline: "Impact-Driven Engineering",
        description: "",
      });
      loadData();
      setSuccessMsg("Engineering philosophy added successfully.");
      setTimeout(() => setSuccessMsg(""), 3500);
    } else {
      setErrorMsg(res.message || "Failed to add philosophy.");
    }
  };

  const handleDeletePhilosophy = async (id: number | string) => {
    if (!confirm("Are you sure you want to remove this philosophy?")) return;
    const res = await deleteAdminPhilosophy(id);
    if (res.success) {
      loadData();
      setSuccessMsg("Philosophy principle removed.");
      setTimeout(() => setSuccessMsg(""), 3500);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        <span>Loading settings...</span>
      </div>
    );
  }

  const resolveImage = (url?: string) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) return url;
    if (url.startsWith("/storage/")) return `http://localhost:8000${url}`;
    return `http://localhost:8000/storage/${url.replace(/^\/?storage\//, '')}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-blue-500" />
            <span>Master Website Settings &amp; CMS</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure website metadata, hero profile, services offerings, and core development principles.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab("general")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2",
            activeTab === "general"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "bg-slate-800/60 text-slate-400 hover:text-white"
          )}
        >
          <Globe className="w-4 h-4" />
          <span>General &amp; Contacts</span>
        </button>

        <button
          onClick={() => setActiveTab("hero")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2",
            activeTab === "hero"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "bg-slate-800/60 text-slate-400 hover:text-white"
          )}
        >
          <Sparkles className="w-4 h-4" />
          <span>Hero Profile &amp; Bio</span>
        </button>

        <button
          onClick={() => setActiveTab("services")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2",
            activeTab === "services"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "bg-slate-800/60 text-slate-400 hover:text-white"
          )}
        >
          <Briefcase className="w-4 h-4" />
          <span>Services Offerings</span>
        </button>

        <button
          onClick={() => setActiveTab("philosophy")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2",
            activeTab === "philosophy"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "bg-slate-800/60 text-slate-400 hover:text-white"
          )}
        >
          <Lightbulb className="w-4 h-4" />
          <span>Guiding Philosophies</span>
        </button>
      </div>

      {/* Feedback Messages */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium flex items-center gap-2 animate-fadeIn">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* TAB 1: GENERAL SETTINGS */}
      {activeTab === "general" && (
        <form onSubmit={handleSaveSettings} className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-400" />
              <span>Website Identity &amp; SEO Metadata</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Site Title (Browser Tab)
                </label>
                <input
                  type="text"
                  value={settings.site_title || ""}
                  onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Availability Status Badge
                </label>
                <input
                  type="text"
                  value={settings.availability_status || ""}
                  onChange={(e) => setSettings({ ...settings, availability_status: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Meta Description (Search Engines)
              </label>
              <textarea
                rows={2}
                value={settings.meta_description || ""}
                onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
              />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" />
              <span>Contact Channels &amp; Social URLs</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Primary Email (Personal)
                </label>
                <input
                  type="email"
                  value={settings.primary_email || ""}
                  onChange={(e) => setSettings({ ...settings, primary_email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Secondary Email (Tech/Agency)
                </label>
                <input
                  type="email"
                  value={settings.secondary_email || ""}
                  onChange={(e) => setSettings({ ...settings, secondary_email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  type="text"
                  value={settings.phone_whatsapp || ""}
                  onChange={(e) => setSettings({ ...settings, phone_whatsapp: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Location (City, Country)
                </label>
                <input
                  type="text"
                  value={settings.location || ""}
                  onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Timezone
                </label>
                <input
                  type="text"
                  value={settings.timezone || ""}
                  onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">GitHub Profile URL</label>
                <input
                  type="url"
                  value={settings.github_url || ""}
                  onChange={(e) => setSettings({ ...settings, github_url: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={settings.linkedin_url || ""}
                  onChange={(e) => setSettings({ ...settings, linkedin_url: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Facebook Profile URL</label>
                <input
                  type="url"
                  value={settings.facebook_url || ""}
                  onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Website Settings</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: HERO PROFILE */}
      {activeTab === "hero" && (
        <form onSubmit={handleSaveHero} className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Camera className="w-4 h-4 text-blue-400" />
              <span>Profile Photo &amp; Cover Banner (Facebook Style)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Avatar Upload */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Profile Photo / Avatar
                </label>

                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full border-2 border-blue-500/50 bg-slate-900 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {hero.avatar_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={resolveImage(hero.avatar_url)}
                        alt="Avatar Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-mono text-xl font-black text-slate-500">DD</span>
                    )}
                  </div>

                  <div className="space-y-2 flex-1">
                    <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer transition-all shadow-sm">
                      <UploadCloud className="w-4 h-4" />
                      <span>{isSaving ? "Uploading..." : "Upload Profile Photo"}</span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/jpg"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const data = new FormData();
                          data.append("file", file);
                          data.append("folder", "avatar");
                          data.append("alt_text", "Profile Avatar");
                          setIsSaving(true);
                          const res = await uploadAdminMedia(data);
                          setIsSaving(false);
                          const uploadedUrl = res.data?.public_url || res.data?.url || (typeof res.data === 'string' ? res.data : '');
                          if (res.success && uploadedUrl) {
                            setHero((prev: any) => ({ ...prev, avatar_url: uploadedUrl }));
                            setSuccessMsg("Profile photo uploaded! Click Save to apply.");
                            setTimeout(() => setSuccessMsg(""), 3500);
                          } else {
                            setErrorMsg(res.message || "Failed to upload avatar.");
                          }
                        }}
                        className="hidden"
                      />
                    </label>

                    <input
                      type="text"
                      value={hero.avatar_url || ""}
                      onChange={(e) => setHero({ ...hero, avatar_url: e.target.value })}
                      placeholder="or paste avatar image URL..."
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-white font-mono placeholder:text-slate-600"
                    />
                  </div>
                </div>
              </div>

              {/* Cover Banner Upload */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Background Cover Banner
                </label>

                <div className="space-y-3">
                  <div className="w-full h-20 rounded-xl border border-slate-800 bg-gradient-to-r from-blue-700 via-indigo-700 to-red-600 overflow-hidden relative">
                    {hero.cover_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={resolveImage(hero.cover_url)}
                        alt="Cover Preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer transition-all border border-slate-700">
                      <UploadCloud className="w-4 h-4 text-blue-400" />
                      <span>{isSaving ? "Uploading..." : "Upload Cover Image"}</span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/jpg"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const data = new FormData();
                          data.append("file", file);
                          data.append("folder", "cover");
                          data.append("alt_text", "Profile Cover Banner");
                          setIsSaving(true);
                          const res = await uploadAdminMedia(data);
                          setIsSaving(false);
                          const uploadedUrl = res.data?.public_url || res.data?.url || (typeof res.data === 'string' ? res.data : '');
                          if (res.success && uploadedUrl) {
                            setHero((prev: any) => ({ ...prev, cover_url: uploadedUrl }));
                            setSuccessMsg("Cover banner uploaded! Click Save to apply.");
                            setTimeout(() => setSuccessMsg(""), 3500);
                          } else {
                            setErrorMsg(res.message || "Failed to upload cover.");
                          }
                        }}
                        className="hidden"
                      />
                    </label>

                    <input
                      type="text"
                      value={hero.cover_url || ""}
                      onChange={(e) => setHero({ ...hero, cover_url: e.target.value })}
                      placeholder="or paste cover image URL..."
                      className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-white font-mono placeholder:text-slate-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Hero Titles &amp; Branding</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={hero.full_name || ""}
                  onChange={(e) => setHero({ ...hero, full_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Primary Title</label>
                <input
                  type="text"
                  required
                  value={hero.primary_title || ""}
                  onChange={(e) => setHero({ ...hero, primary_title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Secondary Title</label>
                <input
                  type="text"
                  required
                  value={hero.secondary_title || ""}
                  onChange={(e) => setHero({ ...hero, secondary_title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Short Bio / About Narrative (Displayed on Hero Card)
              </label>
              <textarea
                rows={4}
                required
                value={hero.short_bio || ""}
                onChange={(e) => setHero({ ...hero, short_bio: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white leading-relaxed"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Hero Narrative &amp; Photos</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: SERVICES */}
      {activeTab === "services" && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Add New Service Offering</span>
            </h3>

            <form onSubmit={handleCreateService} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Service Title</label>
                  <input
                    type="text"
                    required
                    value={newService.title}
                    onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    placeholder="e.g. Laravel Development"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Subtitle / Category</label>
                  <input
                    type="text"
                    required
                    value={newService.subtitle}
                    onChange={(e) => setNewService({ ...newService, subtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    placeholder="e.g. Backend & Systems"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  placeholder="Comprehensive service description..."
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Capabilities (Comma-separated)</label>
                <input
                  type="text"
                  required
                  value={newService.capabilities}
                  onChange={(e) => setNewService({ ...newService, capabilities: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold cursor-pointer"
              >
                Add Service
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-blue-400">
                      {srv.service_number || "01"}
                    </span>
                    <button
                      onClick={() => handleDeleteService(srv.id)}
                      className="p-1 text-slate-500 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="text-base font-bold text-white">{srv.title}</h4>
                  <p className="text-xs text-slate-400 mb-2">{srv.subtitle}</p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">{srv.description}</p>
                </div>

                <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-800">
                  {Array.isArray(srv.capabilities) &&
                    srv.capabilities.map((c: string) => (
                      <span
                        key={c}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        {c}
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PHILOSOPHY */}
      {activeTab === "philosophy" && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Plus className="w-4 h-4 text-blue-400" />
              <span>Add Engineering Philosophy Principle</span>
            </h3>

            <form onSubmit={handleCreatePhilosophy} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Principle Title</label>
                  <input
                    type="text"
                    required
                    value={newPhilosophy.title}
                    onChange={(e) => setNewPhilosophy({ ...newPhilosophy, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                    placeholder="e.g. Build With Purpose"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Tagline / Motto</label>
                  <input
                    type="text"
                    required
                    value={newPhilosophy.tagline}
                    onChange={(e) => setNewPhilosophy({ ...newPhilosophy, tagline: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Principle Description</label>
                <textarea
                  rows={2}
                  required
                  value={newPhilosophy.description}
                  onChange={(e) => setNewPhilosophy({ ...newPhilosophy, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white"
                  placeholder="Explanation of the core guiding principle..."
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold cursor-pointer"
              >
                Add Philosophy Principle
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {philosophies.map((phi) => (
              <div
                key={phi.id}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-purple-400">
                      P-{phi.principle_number || "01"}
                    </span>
                    <button
                      onClick={() => handleDeletePhilosophy(phi.id)}
                      className="p-1 text-slate-500 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="text-base font-bold text-white">{phi.title}</h4>
                  <p className="text-xs font-semibold text-blue-400 mb-2">{phi.tagline}</p>
                  <p className="text-xs text-slate-300 leading-relaxed">{phi.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
