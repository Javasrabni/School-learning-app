// app/components/PerformanceChart.tsx
"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

type ProgressType = { score: number; createdAt?: string; };

export default function PerformanceChart({ data }: { data: ProgressType[] }) {
  // aggregate by date (yyyy-mm-dd)
  const map = new Map<string, number>();
  data.forEach(d => {
    const date = d.createdAt ? new Date(d.createdAt).toISOString().slice(0,10) : new Date().toISOString().slice(0,10);
    map.set(date, (map.get(date) || 0) + (d.score || 0));
  });
  const series = Array.from(map.entries()).sort((a,b)=> a[0].localeCompare(b[0])).map(([date, score])=> ({ date, score }));

  return (
    <div style={{ width: "100%", height: 220 }}>
      {series.length === 0 ? (
        <div className="text-xs px-6 text-gray-500">Belum ada aktivitas</div>
      ) : (
        <ResponsiveContainer width="100%" height="100%" >
          <LineChart data={series}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis tick={{fontSize: 10}}/>
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="var(--accentColor)" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
