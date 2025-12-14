"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useUser } from "@/context/userDataCookie";
import {
  ArrowLeft,
  CheckCircle,
  BookOpen,
  MessageSquare,
  Clock
} from "lucide-react";
import QuizQuestion from "@/components/QuizQuestion";
import CommentSection from "@/components/CommentSection";
import ReactMarkdown from "react-markdown";

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

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

export default function MaterialPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useUser();

  const [material, setMaterial] = useState<MaterialDetailType | null>(null);
  const [currentTab, setCurrentTab] = useState<number | "comments">(0);
  const [progress, setProgress] = useState<ProgressType[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(true);

  // Fetch Material (dengan cache, langsung render)
  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const res = await fetch("/api/materials", {
          cache: "force-cache"
        });
        const data: MaterialDetailType[] = await res.json();
        const m = data.find((mat) => mat._id === id) || null;
        setMaterial(m);
      } catch (error) {
        console.error("Error fetching material:", error);
      }
    };
    fetchMaterial();
  }, [id]);

  // Fetch Progress (tanpa cache, ada skeleton)
  useEffect(() => {
    if (!user?._id) {
      setLoadingProgress(false);
      return;
    }

    const fetchProgress = async () => {
      try {
        const res = await fetch(`/api/progress?userId=${user._id}`);
        const data = await res.json();
        setProgress(data || []);
      } catch (error) {
        console.error("Error fetching progress:", error);
        setProgress([]);
      } finally {
        setLoadingProgress(false);
      }
    };
    fetchProgress();
  }, [user]);

  const handleQuizScore = async (score: number) => {
    if (!user?._id) return;

    const subTopicIndex = typeof currentTab === "number" ? currentTab : 0;

    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          materialTitle: material?.title,
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
                p.materialTitle === material?.title &&
                p.subTopicIndex === subTopicIndex
              )
          );

          return [
            ...filtered,
            {
              materialTitle: material?.title || "",
              subTopicIndex,
              score,
              isRead: true,
            },
          ];
        });
      }
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  // Material tidak ditemukan
  if (material === null && !loadingProgress) {
    return (
      <div className="w-full min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto" />
          <p className="text-gray-500 font-[poppins]">Materi tidak ditemukan</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-[var(--accentColor)] text-white rounded-lg hover:bg-blue-700 transition font-[urbanist] font-semibold"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const subTopic = typeof currentTab === "number" && material ? material.subTopics[currentTab] : null;

  const totalSubTopics = material?.subTopics.length || 0;
  const completedSubTopics = material ? material.subTopics.filter((_, idx) =>
    progress.some(
      (p) =>
        p.materialTitle === material.title &&
        p.subTopicIndex === idx &&
        p.isRead
    )
  ).length : 0;

  const progressPercentage = totalSubTopics > 0 ? Math.round((completedSubTopics / totalSubTopics) * 100) : 0;

  return (
    <motion.div
      className="w-full min-h-screen bg-stone-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-4xl mx-auto pb-24 space-y-2">

        {/* HEADER SECTION */}
        <motion.div {...fadeUp}>
          <button
            onClick={() => router.back()}
            className="fixed bottom-12 right-2 flex items-center gap-2 px-2 py-1 text-gray-700 outline-1 outline-blue-200 hover:text-gray-900 transition-colors mb-4 text-xs font-[poppins] bg-stone-100 rounded-md"
          >
            <ArrowLeft width={16} />
            <span className="font-semibold font-[urbanist]">Kembali</span>
          </button>

          {/* Title & Progress Card */}
          <div className="bg-white pt-8 px-6 pb-6  flex flex-col gap-4">
            <div className="flex items-start justify-between mb-1">
              <div className="flex flex-col gap-[2px]">
                {material ? (
                  <>
                    <h1 className="text-base font-bold text-gray-900 font-[poppins]">
                      {material.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-500 font-[urbanist]">
                      <span className="flex items-center gap-2 text-xs font-[poppins]">
                        <BookOpen width={12} />
                        Kelas {material.class}
                      </span>
                      <span className="flex items-center gap-2 text-xs font-[poppins]">
                        <Clock width={12} />
                        {totalSubTopics} Submateri
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
                  </>
                )}
              </div>

              {/* Progress Badge - Skeleton saat loading progress */}
              {loadingProgress ? (
                <div className="bg-gray-100 rounded-lg px-4 py-2 min-w-[80px]">
                  <div className="h-8 w-12 bg-gray-200 rounded animate-pulse mx-auto mb-1" />
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                </div>
              ) : (
                <div className="bg-blue-50 rounded-lg px-4 py-1 text-center min-w-[80px]">
                  <p className="text-xl font-bold text-blue-600 font-[poppins]">{progressPercentage}%</p>
                  {/* <p className="text-xs text-gray-600 font-[urbanist]">Selesai</p> */}
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div>

              {loadingProgress ? (
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden animate-pulse" />
              ) : (
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              )}

              {loadingProgress ? (
                <div className="h-3 w-48 bg-gray-200 rounded animate-pulse mt-2" />
              ) : (
                <p className="text-xs text-gray-500 mt-2 font-[urbanist] font-semibold">
                  {completedSubTopics} dari {totalSubTopics} sub-topik selesai
                </p>
              )}
            </div>

          </div>
        </motion.div>

        {/* TAB NAVIGATION */}
        {material && (
          <motion.div
            className="bg-white p-4 "
            {...fadeUp}
          >
            <div className="flex flex-col gap-2 pb-2 scrollbar-hide">
              {material.subTopics.map((s, idx) => {
                const isRead = progress.some(
                  (p) =>
                    p.materialTitle === material.title &&
                    p.subTopicIndex === idx &&
                    p.isRead
                );

                const isActive = currentTab === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentTab(idx)}
                    className={`
                      relative px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap ransition-all font-[poppins]
                      ${isActive
                        ? "bg-[var(--accentColor)] text-white shadow-md"
                        : isRead
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
                      }
                    `}
                  >
                    <span className="flex items-center gap-2">
                      {isRead && !isActive && (
                        <CheckCircle width={12} />
                      )}
                      {s.title}
                    </span>
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentTab("comments")}
                className={`
                  px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 font-[urbanist]
                  ${currentTab === "comments"
                    ? "bg-[var(--accentColor)] text-white shadow-md"
                    : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
                  }
                `}
              >
                <MessageSquare width={16} />
                Komentar
              </button>
            </div>
          </motion.div>
        )}

        {/* CONTENT SECTION */}
        {!material ? (
          // Skeleton untuk content saat material belum load
          <div className="space-y-4">
            <div className="bg-white p-6 ">
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ) : currentTab === "comments" ? (
          <motion.div
            className="bg-white p-6 "
            {...fadeUp}
          >
            <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2 font-[poppins]">
              <MessageSquare width={16} className=" text-blue-600" />
              Diskusi & Komentar
            </h2>
            <CommentSection materialTitle={material.title} />
          </motion.div>
        ) : (
          <>
            {/* CONTENT CARD */}
            <motion.div
              className="bg-white p-6 "
              {...fadeUp}
            >
              <h2 className="text-base font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200 font-[poppins]">
                {subTopic?.title}
              </h2>
              <div className="prose prose-gray max-w-none">
                <div className="leading-relaxed text-gray-700 whitespace-pre-line prose prose-gray max-w-none font-[inter] text-base">
                  <ReactMarkdown>{subTopic?.content || ""}</ReactMarkdown>
                </div>
              </div>
            </motion.div>

            {/* QUIZ SECTION */}
            {subTopic?.quiz?.length ? (
              <motion.div className="space-y-4" {...fadeUp}>
                <div className="flex flex-col gap-6 px-6 text-gray-700 py-6 bg-white">
                  <div className="flex flex-row gap-4 items-center border-b-1 border-gray-200 pb-4">
                    {/* <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"> */}
                      <CheckCircle width={16} />
                    {/* </div> */}
                    <h3 className="text-sm font-semibold font-[poppins]">
                      Latihan Soal ({subTopic.quiz.length} Pertanyaan)
                    </h3>
                  </div>

                  {subTopic.quiz.map((q, idx) => {
                    const answered = progress.some(
                      (p) =>
                        p.materialTitle === material.title &&
                        p.subTopicIndex === currentTab &&
                        p.isRead
                    );

                    return (
                      <div className="flex flex-col gap-4">
                        <div className="text-center">
                          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium font-[urbanist] ">
                            Soal {idx + 1}
                          </span>
                        </div>

                        <QuizQuestion
                          question={q.question}
                          options={q.options}
                          correctAnswer={q.correctAnswer}
                          onScoreUpdate={handleQuizScore}
                        />

                        {answered && (
                          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-xs text-green-700  font-semibold font-[urbanist]">
                              ✓ Kamu sudah mengerjakan latihan ini. Gunakan tombol{" "}
                              <span className="font-semibold">Ulangi Jawaban</span> untuk mencoba lagi.
                            </p>
                          </div>
                        )}
                      </div>

                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200"
                {...fadeUp}
              >
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 font-[poppins]">
                  Tidak ada kuis pada sub-topik ini
                </p>
                <p className="text-sm text-gray-500 mt-1 font-[inter]">
                  Lanjut ke sub-topik berikutnya untuk latihan soal
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
}