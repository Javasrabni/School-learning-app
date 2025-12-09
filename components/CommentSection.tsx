// components/CommentSection.tsx
"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/userDataCookie";

type CommentType = {
  _id?: string;
  materialTitle: string;
  userId?: string;
  username: string;
  comment: string;
  createdAt?: string;
};

export default function CommentSection({ materialTitle }: { materialTitle: string }) {
  const { user } = useUser();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?materialTitle=${encodeURIComponent(materialTitle)}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchComments(); }, [materialTitle]);

  const handleSubmit = async () => {
    if (!newComment.trim()) return alert("Komentar tidak boleh kosong");
    if (!user) return alert("Mohon login untuk komentar");

    setLoading(true);
    try {
      const body = {
        materialTitle,
        userId: user._id,
        username: user.username || user.email || "Anon",
        comment: newComment.trim()
      };
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        setNewComment("");
        fetchComments();
      } else {
        alert("Gagal mengirim komentar");
      }
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim komentar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Komentar</h3>
      <div className="space-y-3">
        {comments.map((c) => (
          <div key={c._id} className="p-2 border rounded bg-gray-50">
            <div className="text-sm text-gray-700 font-medium">{c.username}</div>
            <div className="text-sm text-gray-800 mt-1">{c.comment}</div>
            <div className="text-xs text-gray-400 mt-1">{new Date(c.createdAt || "").toLocaleString()}</div>
          </div>
        ))}
      </div>

      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full mt-3 p-2 border rounded"
        rows={3}
        placeholder="Tulis komentar..."
      />

      <div className="mt-2 flex gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSubmit} disabled={loading}>
          Kirim
        </button>
        <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setNewComment("")}>Batal</button>
      </div>
    </div>
  );
}
