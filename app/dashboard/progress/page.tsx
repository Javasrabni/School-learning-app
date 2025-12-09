"use client";
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

  // Matikan sticky / snap scroll yang bikin "lengket"
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

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

  if (userLoading) return <p>Memuat data...</p>;

  return (
    <div className="px-6 pt-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Perjalanan Belajar</h1>
        <p className="text-sm text-neutral-500">
          Lihat perkembangan belajar kamu dari setiap kelas.
        </p>
      </div>

      {[7, 8, 9].map((cls) => (
        <section key={cls} className="space-y-4">
          <h2 className="text-xl font-semibold">Kelas {cls}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {materials
              .filter((m) => m.class === cls)
              .map((m) => {
                const completed = progress.filter(
                  (p) => p.materialTitle === m.title && p.isRead
                ).length;

                const percentage = Math.round(
                  (completed / m.subTopics.length) * 100
                );

                return (
                  <div
                    key={m._id}
                    className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition cursor-pointer"
                    onClick={() => router.push(`/dashboard/material/${m._id}`)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">{m.title}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-md ${
                          percentage === 100
                            ? "bg-green-100 text-green-700 border border-green-300"
                            : "bg-blue-100 text-blue-700 border border-blue-300"
                        }`}
                      >
                        {percentage}%
                      </span>
                    </div>

                    <p className="text-sm text-neutral-500 mt-1">
                      {completed}/{m.subTopics.length} sub-topik selesai
                    </p>

                    <div className="mt-4 bg-neutral-100 rounded-lg p-3 max-h-32 overflow-y-auto">
                      <ul className="text-sm space-y-1">
                        {m.subTopics.map((s, idx) => {
                          const read = progress.some(
                            (p) =>
                              p.materialTitle === m.title &&
                              p.subTopicIndex === idx &&
                              p.isRead
                          );

                          return (
                            <li
                              key={idx}
                              className={`flex items-center gap-2 ${
                                read ? "text-green-700 font-medium" : ""
                              }`}
                            >
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  read ? "bg-green-500" : "bg-gray-400"
                                }`}
                              />
                              {s.title}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      ))}
    </div>
  );
}
