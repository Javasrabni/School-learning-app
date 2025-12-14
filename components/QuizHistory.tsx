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

  if (loading) return <div className="text-xs text-gray-500">Loading...</div>;
  if (!history.length) return <div className="text-xs text-gray-500">Belum ada riwayat quiz.</div>;

  return (
    <div className="space-y-4 max-h-56 overflow-y-auto">
      {history.map((h, i) => (
        <div key={i} className="p-2 rounded-md bg-stone-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-medium pb-1">{h.materialTitle} — Bagian {h.subTopicIndex + 1}</div>
            <div className="font-[urbanist] font-medium text-xs text-gray-500">{h.createdAt ? new Date(h.createdAt).toLocaleString() : "-"}</div>
          </div>
          <div className={`font-[urbanist] font-bold px-2 py-1 rounded text-xs ${h.score >= 10 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{h.score} poin</div>
        </div>
      ))}
    </div>
  );
}
