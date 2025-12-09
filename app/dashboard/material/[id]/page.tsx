// app/dashboard/material/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/context/userDataCookie";
import QuizQuestion from "@/components/QuizQuestion";
import CommentSection from "@/components/CommentSection";

type SubTopic = {
  title: string;
  content: string;
  quiz: { question: string; options: string[]; correctAnswer: string; explanation?: string }[];
};

type MaterialDetailType = {
  _id: string;
  title: string;
  class: number;
  subTopics: SubTopic[];
};

type ProgressType = {
  _id?: string;
  userId?: string;
  materialTitle: string;
  subTopicIndex: number;
  isRead: boolean;
  score: number;
};

export default function MaterialPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useUser();
  const [material, setMaterial] = useState<MaterialDetailType | null>(null);
  const [currentTab, setCurrentTab] = useState<number | "comments">(0);
  const [progress, setProgress] = useState<ProgressType[]>([]);

  useEffect(() => {
    const fetchMaterial = async () => {
      const res = await fetch("/api/materials");
      const data: MaterialDetailType[] = await res.json();
      const m = data.find(mat => mat._id === id) || null;
      setMaterial(m);
    };
    fetchMaterial();
  }, [id]);

  useEffect(() => {
    if (!user?._id) return;
    const fetchProgress = async () => {
      const res = await fetch(`/api/progress?userId=${user._id}`);
      if (res.ok) {
        const data = await res.json();
        setProgress(data);
      }
    };
    fetchProgress();
  }, [user]);

  if (!material) return <p>Loading material...</p>;

  const handleQuizScore = async (score: number) => {
    if (!user?._id) return;
    const subTopicIndex = typeof currentTab === "number" ? currentTab : 0;
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          materialTitle: material.title,
          subTopicIndex,
          score,
          isRead: true,
        }),
      });
      if (!res.ok) throw new Error("Gagal update progress");

      // update local progress (upsert logic)
      setProgress(prev => {
        const filtered = prev.filter(p => !(p.materialTitle === material.title && p.subTopicIndex === subTopicIndex));
        return [...filtered, { userId: user._id, materialTitle: material.title, subTopicIndex, score, isRead: true }];
      });
    } catch (err) {
      console.error(err);
    }
  };

  const subTopic = typeof currentTab === "number" ? material.subTopics[currentTab] : null;

  return (
    <div className="p-4">
      <button onClick={() => router.back()} className="mb-4 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">← Kembali</button>

      <h1 className="text-2xl font-bold mb-2">{material.title}</h1>

      <ul className="flex gap-2 mb-4 overflow-x-auto">
        {material.subTopics.map((s, idx) => {
          const read = progress.some(p => p.materialTitle === material.title && p.subTopicIndex === idx && p.isRead);
          return (
            <li
              key={idx}
              onClick={() => setCurrentTab(idx)}
              className={`px-3 py-1 rounded cursor-pointer ${currentTab === idx ? "bg-blue-600 text-white" : read ? "bg-green-200" : "bg-gray-200"}`}
            >
              {s.title}
            </li>
          );
        })}

        <li
          key="comments"
          onClick={() => setCurrentTab("comments")}
          className={`px-3 py-1 rounded cursor-pointer ${currentTab === "comments" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Komentar
        </li>
      </ul>

      {currentTab === "comments" ? (
        <CommentSection materialTitle={material.title} />
      ) : (
        <>
          <div className="border p-4 rounded bg-gray-50 mb-4">
            <p className="font-semibold mb-2">{subTopic?.title}</p>
            <p>{subTopic?.content}</p>
          </div>

          {/* Quiz area — only render when subTopic has quiz */}
          {subTopic?.quiz?.length ? (
            <div>
              {subTopic.quiz.map((q, idx) => {
                // find whether user already answered this subTopic (any progress record with isRead)
                const answered = progress.some(p => p.materialTitle === material.title && p.subTopicIndex === currentTab && p.isRead);
                return (
                  <div key={idx} className="mb-4">
                    {/* disable QuizQuestion internal lock will handle preventing repeat until user retries */}
                    <QuizQuestion
                      question={q.question}
                      options={q.options}
                      correctAnswer={q.correctAnswer}
                      onScoreUpdate={handleQuizScore}
                    />
                    {/* show explanation if user already answered and correct */}
                    {answered && <div className="mt-2 text-sm text-gray-600">Jika ingin mengerjakan ulang, tekan "Ulangi Jawaban" pada soal (skor tidak akan bertambah jika lebih kecil dari skor sebelumnya).</div>}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-sm text-gray-500">Tidak ada latihan pada sub-topik ini.</div>
          )}
        </>
      )}
    </div>
  );
}
