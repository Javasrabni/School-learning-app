'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userDataCookie";

type Material = {
  _id: string;
  title: string;
  class: number;
  subTopics: { title: string }[];
};

type ProgressType = {
  materialTitle: string;
  subTopicIndex: number;
  isRead: boolean;
  score: number;
};

export default function ProgressPage() {
  const { user, loading: userLoading } = useUser();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [progress, setProgress] = useState<ProgressType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMaterials = async () => {
      const res = await fetch("/api/materials");
      const data = await res.json();
      setMaterials(data);
    };
    fetchMaterials();
  }, []);

  useEffect(() => {
    if (!user?._id) return;
    const fetchProgress = async () => {
      const res = await fetch(`/api/progress?userId=${user._id}`);
      const data = await res.json();
      setProgress(data);
    };
    fetchProgress();
  }, [user]);

  if (userLoading) return <p>Loading user...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Perjalanan Belajar</h1>

      {[7, 8, 9].map(cls => (
        <div key={cls} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Kelas {cls}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {materials
              .filter(m => m.class === cls)
              .map(m => {
                const completed = progress.filter(p => p.materialTitle === m.title && p.isRead).length;
                return (
                  <div
                    key={m._id}
                    className="border p-3 rounded cursor-pointer hover:bg-gray-100"
                    onClick={() => router.push(`/dashboard/material/${m._id}`)}
                  >
                    <h3 className="font-semibold">{m.title}</h3>
                    <p className="text-sm text-gray-500">{completed}/{m.subTopics.length} sub-topik selesai</p>
                    <ul className="text-sm mt-1 list-disc list-inside">
                      {m.subTopics.map((s, idx) => (
                        <li key={idx}>{s.title}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}
