// app/components/AvatarUpload.tsx
"use client";

import { useState } from "react";
import { useUser } from "@/context/userDataCookie";

export default function AvatarUpload({ onUploaded }: { onUploaded?: () => void }) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        setLoading(true);
        // send base64 string
        const base64 = reader.result as string;
        const res = await fetch("/api/avatar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user._id, avatar: base64 }),
        });
        if (res.ok) {
          onUploaded?.();
          alert("Avatar diperbarui");
        } else {
          alert("Gagal upload avatar");
        }
      } catch (err) { console.error(err); alert("Gagal upload"); }
      finally { setLoading(false); }
    };
    reader.readAsDataURL(file);
  };

  return (
    <label className="inline-flex items-center gap-2 cursor-pointer px-3 py-2 bg-gray-100 rounded-md">
      <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
      <span className="text-xs font-[urbanist] font-semibold">{loading ? "Uploading..." : "Ubah Avatar"}</span>
    </label>
  );
}
