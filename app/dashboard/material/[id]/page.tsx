"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useUser } from "@/context/userDataCookie";
import { 
  ArrowLeftIcon, 
  CheckCircleIcon, 
  BookOpenIcon,
  MessageSquareIcon,
  ClockIcon
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
  const [loading, setLoading] = useState(true);

  // Fetch Material
  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const res = await fetch("/api/materials");
        const data: MaterialDetailType[] = await res.json();
        const m = data.find((mat) => mat._id === id) || null;
        setMaterial(m);
      } catch (error) {
        console.error("Error fetching material:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterial();
  }, [id]);

  // Fetch Progress
  useEffect(() => {
    if (!user?._id) return;

    const fetchProgress = async () => {
      try {
        const res = await fetch(`/api/progress?userId=${user._id}`);
        const data = await res.json();
        setProgress(data || []);
      } catch (error) {
        console.error("Error fetching progress:", error);
        setProgress([]);
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

  // Loading Skeleton
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-10 w-32 bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Materi tidak ditemukan</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const subTopic = typeof currentTab === "number" ? material.subTopics[currentTab] : null;

  const totalSubTopics = material.subTopics.length;
  const completedSubTopics = material.subTopics.filter((_, idx) =>
    progress.some(
      (p) =>
        p.materialTitle === material.title &&
        p.subTopicIndex === idx &&
        p.isRead
    )
  ).length;

  const progressPercentage = Math.round((completedSubTopics / totalSubTopics) * 100);

  return (
    <motion.div 
      className="w-full min-h-screen "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-4xl mx-auto px-6 pt-6 pb-24 space-y-6">
        
        {/* HEADER SECTION */}
        <motion.div {...fadeUp}>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="font-medium">Kembali</span>
          </button>

          {/* Title & Progress Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {material.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <BookOpenIcon className="w-4 h-4" />
                    Kelas {material.class}
                  </span>
                  <span className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    {totalSubTopics} Sub-topik
                  </span>
                </div>
              </div>
              
              {/* Progress Badge */}
              <div className="bg-blue-50 rounded-lg px-4 py-2 text-center min-w-[80px]">
                <p className="text-2xl font-bold text-blue-600">{progressPercentage}%</p>
                <p className="text-xs text-gray-600">Selesai</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {completedSubTopics} dari {totalSubTopics} sub-topik selesai
            </p>
          </div>
        </motion.div>

        {/* TAB NAVIGATION */}
        <motion.div 
          className="bg-white rounded-xl shadow-sm p-4 border border-gray-100"
          {...fadeUp}
        >
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
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
                    relative px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all
                    ${isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : isRead
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    {isRead && !isActive && (
                      <CheckCircleIcon className="w-4 h-4" />
                    )}
                    {s.title}
                  </span>
                </button>
              );
            })}

            <button
              onClick={() => setCurrentTab("comments")}
              className={`
                px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2
                ${
                  currentTab === "comments"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100"
                }
              `}
            >
              <MessageSquareIcon className="w-4 h-4" />
              Komentar
            </button>
          </div>
        </motion.div>

        {/* CONTENT SECTION */}
        {currentTab === "comments" ? (
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            {...fadeUp}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquareIcon className="w-5 h-5 text-blue-600" />
              Diskusi & Komentar
            </h2>
            <CommentSection materialTitle={material.title} />
          </motion.div>
        ) : (
          <>
            {/* CONTENT CARD */}
            <motion.div 
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
              {...fadeUp}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-3 border-b border-gray-200">
                {subTopic?.title}
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="leading-relaxed text-gray-700 whitespace-pre-line prose prose-gray max-w-none">
                  <ReactMarkdown>{subTopic?.content || ""}</ReactMarkdown>
                </p>
              </div>
            </motion.div>

            {/* QUIZ SECTION */}
            {subTopic?.quiz?.length ? (
              <motion.div className="space-y-4" {...fadeUp}>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <CheckCircleIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold">
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
                    <motion.div
                      key={idx}
                      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
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
                          <p className="text-sm text-green-700">
                            ✓ Kamu sudah mengerjakan latihan ini. Gunakan tombol{" "}
                            <span className="font-semibold">Ulangi Jawaban</span> untuk mencoba lagi.
                          </p>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div 
                className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200"
                {...fadeUp}
              >
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-3">
                  <BookOpenIcon className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600">
                  Tidak ada kuis pada sub-topik ini
                </p>
                <p className="text-sm text-gray-500 mt-1">
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