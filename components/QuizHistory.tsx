// app/components/QuizHistory.tsx
"use client";

import { useEffect, useState } from "react";

type ProgressType = { materialTitle: string; subTopicIndex: number; score: number; createdAt?: string; };

export default function QuizHistory({ userId }: { userId?: string }) {
  const [history, setHistory] = useState<ProgressType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return setLoading(false);
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/progress?userId=${userId}`);
        const data: ProgressType[] = await res.json();
        // sort desc by createdAt
        setHistory((data || []).sort((a,b)=> (b.createdAt || "").localeCompare(a.createdAt || "")));
      } catch (err) {
        console.error(err);
      } finally { setLoading(false); }
    })();
  }, [userId]);

  if (loading) return <div className="text-sm text-gray-500">Loading...</div>;
  if (!history.length) return <div className="text-sm text-gray-500">Belum ada riwayat quiz.</div>;

  return (
    <div className="space-y-2 max-h-56 overflow-y-auto">
      {history.map((h, i) => (
        <div key={i} className="p-2 rounded bg-gray-50 flex items-center justify-between">
          <div>
            <div className="text-sm font-medium">{h.materialTitle} — Bagian {h.subTopicIndex + 1}</div>
            <div className="text-xs text-gray-500">{h.createdAt ? new Date(h.createdAt).toLocaleString() : "-"}</div>
          </div>
          <div className={`px-2 py-1 rounded text-sm ${h.score >= 10 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{h.score} pts</div>
        </div>
      ))}
    </div>
  );
}
