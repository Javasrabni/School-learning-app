"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/context/userDataCookie";
import QuizQuestion from "@/components/QuizQuestion";
import CommentSection from "@/components/CommentSection";

type SubTopic = {
  title: string;
  content: string;
  quiz: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation?: string;
  }[];
};

type MaterialDetailType = {
  _id: string;
  title: string;
  class: number;
  subTopics: SubTopic[];
};

type ProgressType = {
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

  // Fetch Material
  useEffect(() => {
    const fetchMaterial = async () => {
      const res = await fetch("/api/materials");
      const data: MaterialDetailType[] = await res.json();
      const m = data.find((mat) => mat._id === id) || null;
      setMaterial(m);
    };
    fetchMaterial();
  }, [id]);

  // Fetch Progress
  useEffect(() => {
    if (!user?._id) return;

    const fetchProgress = async () => {
      const res = await fetch(`/api/progress?userId=${user._id}`);
      const data = await res.json();
      setProgress(data);
    };
    fetchProgress();
  }, [user]);

  if (!material)
    return <p className="p-6 text-gray-700">Memuat materi...</p>;

  const handleQuizScore = async (score: number) => {
    if (!user?._id) return;

    const subTopicIndex =
      typeof currentTab === "number" ? currentTab : 0;

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

    if (res.ok) {
      setProgress((prev) => {
        const filtered = prev.filter(
          (p) =>
            !(
              p.materialTitle === material.title &&
              p.subTopicIndex === subTopicIndex
            )
        );

        return [
          ...filtered,
          {
            materialTitle: material.title,
            subTopicIndex,
            score,
            isRead: true,
          },
        ];
      });
    }
  };

  const subTopic =
    typeof currentTab === "number"
      ? material.subTopics[currentTab]
      : null;

  return (
    <div className="w-full h-screen overflow-y-auto bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">

        {/* BACK BUTTON */}
        <button
          onClick={() => router.back()}
          className="mb-6 px-4 py-2 bg-white rounded shadow border text-gray-700 hover:bg-gray-50"
        >
          ← Kembali
        </button>

        {/* HEADER TITLE */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {material.title}
        </h1>

        {/* TAB LIST */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {material.subTopics.map((s, idx) => {
            const read = progress.some(
              (p) =>
                p.materialTitle === material.title &&
                p.subTopicIndex === idx &&
                p.isRead
            );

            return (
              <button
                key={idx}
                onClick={() => setCurrentTab(idx)}
                className={`
                  px-4 py-2 rounded-xl text-sm whitespace-nowrap transition
                  ${currentTab === idx
                    ? "bg-blue-600 text-white shadow"
                    : read
                    ? "bg-green-100 text-green-700"
                    : "bg-white text-gray-700 shadow"
                  }
                `}
              >
                {s.title}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentTab("comments")}
            className={`
              px-4 py-2 rounded-xl text-sm whitespace-nowrap transition
              ${
                currentTab === "comments"
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white text-gray-700 shadow"
              }
            `}
          >
            Komentar
          </button>
        </div>

        {/* COMMENT TAB */}
        {currentTab === "comments" ? (
          <div className="bg-white p-4 rounded shadow">
            <CommentSection materialTitle={material.title} />
          </div>
        ) : (
          <>
            {/* CONTENT CARD */}
            <div className="bg-white p-5 rounded shadow mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                {subTopic?.title}
              </h2>
              <p className="leading-relaxed text-gray-700 whitespace-pre-line">
                {subTopic?.content}
              </p>
            </div>

            {/* QUIZ SECTION */}
            {subTopic?.quiz?.length ? (
              <div className="space-y-5">
                {subTopic.quiz.map((q, idx) => {
                  const answered = progress.some(
                    (p) =>
                      p.materialTitle === material.title &&
                      p.subTopicIndex === currentTab &&
                      p.isRead
                  );

                  return (
                    <div
                      key={idx}
                      className="bg-white p-5 rounded shadow"
                    >
                      <QuizQuestion
                        question={q.question}
                        options={q.options}
                        correctAnswer={q.correctAnswer}
                        onScoreUpdate={handleQuizScore}
                      />

                      {answered && (
                        <p className="text-sm text-gray-600 mt-3">
                          Kamu sudah mengerjakan latihan ini.  
                          Gunakan tombol <b>Ulangi Jawaban</b> untuk mencoba ulang.
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-600 text-sm">
                Tidak ada kuis pada sub-topik ini.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
