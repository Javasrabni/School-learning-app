// app/components/Leaderboard.tsx
"use client";

import { useEffect, useState } from "react";

type UserShort = { _id: string; username: string; points: number; avatar?: string };

export default function Leaderboard() {
  const [users, setUsers] = useState<UserShort[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/leaderboard");
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        }
      } catch (err) { console.error(err); }
    })();
  }, []);
  if (!users.length) return <div className="text-sm text-gray-500">Leaderboard kosong</div>;
  return (
    <ol className="space-y-2">
      {users.map((u, i) => (
        <li key={u._id} className="flex items-center justify-between p-2 rounded bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200"><img src={u.avatar || "/default-avatar.png"} className="w-full h-full object-cover" /></div>
            <div>
              <div className="font-medium text-sm">{u.username}</div>
              <div className="text-xs text-gray-500">{u.points ?? "0    "} points</div>
            </div>
          </div>
          <div className="text-sm font-semibold">{i+1}</div>
        </li>
      ))}
    </ol>
  );
}
