"use client";

import { useMemo, useState } from "react";

type TokFamAdminUploaderProps = {
  onUploadComplete: () => void;
};

type GallerySlot = {
  slot: string;
  label: string;
  fileName: string;
};

const gallerySlots: GallerySlot[] = [
  { slot: "birthday", label: "Birthday smile and cake moment", fileName: "miari-01-birthday.jpg" },
  { slot: "outfit", label: "Favorite outfit photo", fileName: "miari-02-outfit.jpg" },
  { slot: "family-hug", label: "Family hug picture", fileName: "miari-03-family-hug.jpg" },
  { slot: "playtime", label: "Playtime memory", fileName: "miari-04-playtime.jpg" },
  { slot: "naptime", label: "Nap-time angel photo", fileName: "miari-05-naptime.jpg" },
  { slot: "highlight", label: "First-year highlight shot", fileName: "miari-06-highlight.jpg" },
];

export default function TokFamAdminUploader({ onUploadComplete }: TokFamAdminUploaderProps) {
  const [adminKey, setAdminKey] = useState("");
  const [busySlot, setBusySlot] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");

  const slotMap = useMemo(() => {
    const map = new Map<string, GallerySlot>();
    gallerySlots.forEach((slot) => map.set(slot.slot, slot));
    return map;
  }, []);

  const uploadFile = async (slot: string, file: File) => {
    if (!file.type.startsWith("image/")) {
      setStatus("Please upload an image file.");
      return;
    }

    setBusySlot(slot);
    setStatus("Uploading photo...");

    try {
      const formData = new FormData();
      formData.append("slot", slot);
      formData.append("file", file);
      if (adminKey.trim()) {
        formData.append("key", adminKey.trim());
      }

      const response = await fetch("/api/tokfam/upload", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        throw new Error(payload.error || "Upload failed.");
      }

      const selectedSlot = slotMap.get(slot);
      setStatus(`Uploaded ${selectedSlot?.fileName ?? "file"} successfully.`);
      onUploadComplete();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Upload failed.";
      setStatus(message);
    } finally {
      setBusySlot(null);
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>, slot: string) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (!droppedFile) {
      return;
    }
    await uploadFile(slot, droppedFile);
  };

  return (
    <section className="mt-10 rounded-3xl border border-cyan-300/25 bg-slate-950/60 p-8">
      <h2 className="text-3xl font-black text-white">TokFam Admin Uploader</h2>
      <p className="mt-4 text-base leading-8 text-slate-200">
        Drag and drop a photo into any slot or click to select a file. Uploads overwrite the current image in that slot.
      </p>

      <label className="mt-5 block text-sm font-semibold text-cyan-200" htmlFor="tokfam-admin-key">
        Admin key (if configured)
      </label>
      <input
        id="tokfam-admin-key"
        type="password"
        value={adminKey}
        onChange={(event) => setAdminKey(event.target.value)}
        placeholder="Enter TOKFAM_ADMIN_KEY when required"
        className="mt-2 w-full rounded-xl border border-white/20 bg-black/30 px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan-300 focus:outline-none"
      />

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {gallerySlots.map((slot) => (
          <div key={slot.slot} className="rounded-2xl border border-white/10 bg-black/25 p-4">
            <p className="text-sm font-semibold text-cyan-100">{slot.label}</p>
            <p className="mt-1 text-xs text-slate-300">File: {slot.fileName}</p>

            <div
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                void handleDrop(event, slot.slot);
              }}
              className="mt-3 rounded-xl border border-dashed border-cyan-300/40 bg-cyan-500/10 px-3 py-6 text-center text-sm text-cyan-100"
            >
              Drag photo here
            </div>

            <label className="mt-3 inline-block cursor-pointer rounded-lg bg-cyan-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500">
              {busySlot === slot.slot ? "Uploading..." : "Choose Photo"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={busySlot === slot.slot}
                onChange={(event) => {
                  const selectedFile = event.target.files?.[0];
                  if (!selectedFile) {
                    return;
                  }
                  void uploadFile(slot.slot, selectedFile);
                  event.currentTarget.value = "";
                }}
              />
            </label>
          </div>
        ))}
      </div>

      <p className="mt-5 text-sm text-slate-200">{status}</p>
    </section>
  );
}
