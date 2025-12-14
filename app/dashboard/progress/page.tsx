"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userDataCookie";
import { motion } from "framer-motion";
import { ArrowRightIcon, BrainIcon, WaypointsIcon } from "lucide-react";

export type Material = {
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

export const fadeUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 }
};

export default function ProgressPage({ onData, index }: { onData: Material[], index: number | null }) {
  const { user } = useUser();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [progress, setProgress] = useState<ProgressType[]>([]);
  const [loadingMaterials, setLoadingMaterials] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const router = useRouter();

  // disable sticky scroll behaviour
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await fetch("/api/materials", {
          cache: "force-cache"
        });
        const data = await res.json();
        setMaterials(data);
      } catch (error) {
        console.error(error)
      }
      finally {
        setLoadingMaterials(false);
      }
    };
    fetchMaterials();
  }, []);

  useEffect(() => {
    if (!user?._id) {
      setProgress([]);
      setLoadingProgress(false);
      return;
    }

    const fetchProgress = async () => {
      try {
        const res = await fetch(`/api/progress?userId=${user._id}`);
        const data = await res.json();
        setProgress(data);
      } finally {
        setLoadingProgress(false);
      }
    };

    fetchProgress();
  }, [user]);

  const isLoading = loadingMaterials || loadingProgress;

  const renderSkeletonCard = () => (
    <div className="bg-white border rounded-xl p-5 shadow-sm animate-pulse">
      <div className="h-5 bg-neutral-200 rounded w-2/3"></div>
      <div className="mt-3 h-4 bg-neutral-200 rounded w-1/4"></div>
      <div className="mt-4 space-y-2">
        <div className="h-3 bg-neutral-200 rounded w-full"></div>
        <div className="h-3 bg-neutral-200 rounded w-4/5"></div>
        <div className="h-3 bg-neutral-200 rounded w-3/4"></div>
      </div>
    </div>
  );

  return (
    <div

      className="space-y-6 pt-2"
    >
      {/* Title */}
      {/* <div  className="flex flex-col gap-1">
        <span className="flex flex-row gap-2 items-center">
          <WaypointsIcon width={16} />
          <h1 className="text-base font-semibold font-[poppins]">Silabus dan materi belajar</h1>
        </span>
        <p className="text-xs text-stone-400">
          Mulai belajar matematika sesuai dengan tingkatan kamu, mulai dari kelas 7 - 9.
        </p>
      </div> */}
      <div className="flex flex-col  space-y-4">
        {[index].map((cls, cindex) => {
          const filtered = materials.filter((m) => m.class === cls);

          return (
            <section key={cls} className="space-y-4 ">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {/* Skeleton */}
                {isLoading &&
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i}>{renderSkeletonCard()}</div>
                  ))}

                {/* Data cards */}
                {!isLoading &&
                  filtered.map((m, index) => {
                    const completed = progress.filter(
                      (p) => p.materialTitle === m.title && p.isRead
                    ).length;

                    const percentage = Math.round(
                      (completed / m.subTopics.length) * 100
                    );

                    return (
                      <div key={m._id} className="bg-stone-100 rounded-xl p-4  cursor-pointer" onClick={() => router.push(`/dashboard/material/${m._id}`)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col gap-[2px]">
                            <h1 className="font-semibold text-base font-[poppins]">{m.title}</h1>
                            <p className="text-xs text-gray-500 font-[poppins]">
                              {completed}/{m.subTopics.length} Submateri selesai
                            </p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-md ${percentage === 100
                            ? "bg-green-100 text-green-700 border border-green-300"
                            : "bg-blue-100 text-blue-700 border border-blue-300"
                            }`}
                          >
                            {percentage}%
                          </span>
                        </div>



                        <div className="flex flex-row justify-between items-end mt-0 bg-neutral-100 rounded-lg pt-2 px-2 max-h-32 overflow-y-auto">
                          <ul className="text-xs space-y-1 font-[poppins]">
                            {m.subTopics.map((s, idx) => {
                              const read = progress.some(
                                (p) =>
                                  p.materialTitle === m.title &&
                                  p.subTopicIndex === idx &&
                                  p.isRead
                              );

                              return (
                                <li key={idx} className={`flex  items-center gap-2 ${read ? "text-green-500 font-medium" : "text-gray-500"}`}>
                                  <span className={`w-1 h-1 rounded-full ${read ? "bg-green-500" : "bg-gray-400"}`} />
                                  {s.title}
                                </li>
                              );
                            })}
                          </ul>
                          <ArrowRightIcon width={16} className="text-stone-400" />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </section>
          );
        })}
        {/* {onData?.map((i, idx) =>
          <div key={idx} className="w-full bg-stone-100 p-4 rounded-xl">
            <h1 className="font-semibold font-[poppins] text-sm">{i.title}</h1>
            <div className="w-full h-1 rounded-xl ">
              <div className={`w-[${}] bg-[var(--accentColor)] h-full rounded-full`} />
            </div>
          </div>
        )} */}
      </div>

    </div>
  );
}

