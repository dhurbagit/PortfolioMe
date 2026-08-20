"use client";

import React, { useEffect, useState } from "react";
import {
  Image as ImageIcon,
  UploadCloud,
  Trash2,
  Copy,
  Check,
  Loader2,
  X,
  FileText,
} from "lucide-react";
import { getAdminMedia, uploadAdminMedia, deleteAdminMedia } from "@/lib/adminApi";

export default function AdminMediaPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [notification, setNotification] = useState("");

  const loadMedia = async () => {
    setIsLoading(true);
    const res = await getAdminMedia();
    if (res.success && res.data) setMedia(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "general");
    formData.append("alt_text", file.name);

    const res = await uploadAdminMedia(formData);
    setIsUploading(false);

    if (res.success) {
      loadMedia();
      setNotification("Media file uploaded successfully.");
    } else {
      alert(res.message || "Failed to upload media file.");
    }
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this media file?"))
      return;
    const res = await deleteAdminMedia(id);
    if (res.success) {
      setMedia((prev) => prev.filter((m) => m.id !== id));
      setNotification("Media asset deleted.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Media Manager &amp; File Storage
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Upload, preview, copy public URLs, and manage project screenshots and assets.
          </p>
        </div>

        {/* Upload Button */}
        <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all cursor-pointer">
          <UploadCloud className="w-4 h-4" />
          <span>{isUploading ? "Uploading..." : "Upload File"}</span>
          <input
            type="file"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="hidden"
            accept="image/*,.pdf"
          />
        </label>
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

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <div className="col-span-full p-12 text-center text-slate-500 text-xs">
            <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2" />
            <span>Loading media library...</span>
          </div>
        ) : media.length === 0 ? (
          <div className="col-span-full p-12 text-center text-slate-500 text-xs">
            No media files uploaded yet.
          </div>
        ) : (
          media.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3 group shadow-md"
            >
              <div className="aspect-video rounded-xl bg-slate-900 overflow-hidden relative flex items-center justify-center">
                {item.mime_type?.startsWith("image/") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.public_url}
                    alt={item.alt_text || "Uploaded asset"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <FileText className="w-8 h-8 text-slate-500" />
                )}
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-white truncate">
                  {item.original_name}
                </p>
                <p className="text-[10px] font-mono text-slate-500">
                  {item.formatted_size || `${Math.round(item.file_size_bytes / 1024)} KB`}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                <button
                  onClick={() => handleCopyUrl(item.public_url, item.id)}
                  className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1 rounded-lg text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Delete File"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
