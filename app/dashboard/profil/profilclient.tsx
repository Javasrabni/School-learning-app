"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User2Icon, TrophyIcon, FlameIcon, CheckCircleIcon } from "lucide-react";
import { useUser } from "@/context/userDataCookie";
import PerformanceChart from "@/components/PerformanceChart";
import QuizHistory from "@/components/QuizHistory";
import Leaderboard from "@/components/Leaderboard";
import AvatarUpload from "@/components/AvatarUpload";

type ProgressType = {
  materialTitle: string;
  subTopicIndex: number;
  isRead: boolean;
  score: number;
  createdAt?: string;
};

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

export default function ProfileClient() {
  const { user, loading: userLoading, refreshUser } = useUser();
  const [progress, setProgress] = useState<ProgressType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user?._id) return setLoading(false);

      setLoading(true);
      try {
        const res = await fetch(`/api/progress?userId=${user._id}`);
        const data: ProgressType[] = await res.json();
        setProgress(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProgress();
  }, [user]);

  const totalScore = progress.reduce((acc, p) => acc + (p.score || 0), 0);
  const totalRead = progress.filter((p) => p.isRead).length;
  const level = Math.floor(totalScore / 50) + 1;
  const nextLevelProgress = totalScore % 50;
  const streak = Math.min(totalRead, 30);
  const totalCorrect = progress.filter((p) => p.score >= 10).length;
  const totalWrong = progress.filter((p) => p.score === 0 && p.isRead).length;
  const materials = Array.from(new Set(progress.map((p) => p.materialTitle)));

  const badges = [
    ...(totalRead >= 10 ? ["Materi Novice"] : []),
    ...(totalRead >= 30 ? ["Materi Expert"] : []),
    ...(totalScore >= 100 ? ["Quiz Master"] : [])
  ];

  if (userLoading) return <div className="p-6">Loading profile...</div>;

  return (
    <motion.div
      className="w-full h-screen overflow-y-auto bg-gray-50"
      {...fadeUp}
    >
      <motion.div className="max-w-4xl mx-auto p-6" {...fadeUp}>
        
        {/* HEADER */}
        <motion.div className="flex items-center justify-between gap-4 mb-6" {...fadeUp}>
          
          <motion.div className="flex items-center gap-4" {...fadeUp}>
            <motion.div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 shrink-0" {...fadeUp}>
              <img
                src={user?.avatar || "/default-avatar.png"}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div {...fadeUp}>
              <h2 className="text-xl font-semibold text-gray-900">
                {user?.username || user?.email || "User"}
              </h2>
              <p className="text-sm text-gray-600">
                Level {user?.level ?? level} • {user?.points ?? totalScore} poin
              </p>
            </motion.div>
          </motion.div>

          <motion.div {...fadeUp}>
            <AvatarUpload onUploaded={refreshUser} />
          </motion.div>
        </motion.div>

        {/* STATS + CHART */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" {...fadeUp}>
          
          <motion.div className="md:col-span-2 bg-white p-4 rounded shadow" {...fadeUp}>
            <motion.div className="flex items-center justify-between mb-3" {...fadeUp}>
              <h3 className="text-lg font-semibold text-gray-800">Statistik Anda</h3>

              <button
                onClick={() => {
                  setLoading(true);
                  fetch(`/api/progress?userId=${user?._id}`)
                    .then((r) => r.json())
                    .then((d) => setProgress(d))
                    .finally(() => setLoading(false));
                }}
                className="text-sm px-2 py-1 bg-gray-100 rounded"
              >
                Refresh
              </button>
            </motion.div>

            {/* STAT CARDS */}
            <motion.div className="grid grid-cols-2 gap-3 mb-4" {...fadeUp}>
              <motion.div className="p-3 bg-blue-50 rounded" {...fadeUp}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-600">Total Poin</div>
                    <div className="text-xl font-bold text-blue-700">
                      {user?.points ?? totalScore}
                    </div>
                  </div>
                  <CheckCircleIcon width={32} className="text-blue-600" />
                </div>
              </motion.div>

              <motion.div className="p-3 bg-green-50 rounded" {...fadeUp}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-600">Materi Dibaca</div>
                    <div className="text-xl font-bold text-green-700">
                      {totalRead}
                    </div>
                  </div>
                  <FlameIcon width={32} className="text-orange-500" />
                </div>
              </motion.div>

              <motion.div className="p-3 bg-yellow-50 rounded" {...fadeUp}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-600">Level</div>
                    <div className="text-xl font-bold text-yellow-700">
                      {user?.level ?? level}
                    </div>
                  </div>
                  <User2Icon width={32} className="text-yellow-600" />
                </div>
              </motion.div>

              <motion.div className="p-3 bg-purple-50 rounded" {...fadeUp}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-600">Streak</div>
                    <div className="text-xl font-bold text-purple-700">
                      {user?.streak ?? streak}
                    </div>
                  </div>
                  <TrophyIcon width={32} className="text-purple-600" />
                </div>
              </motion.div>
            </motion.div>

            <PerformanceChart data={progress} />
          </motion.div>

          {/* RINGKASAN */}
          <motion.div className="bg-white p-4 rounded shadow" {...fadeUp}>
            <h4 className="font-semibold text-gray-800 mb-3">Ringkasan</h4>
            <div className="space-y-3">

              <motion.div className="flex items-center justify-between" {...fadeUp}>
                <span className="text-sm text-gray-600">Jawaban Benar</span>
                <span className="font-medium text-green-700">{totalCorrect}</span>
              </motion.div>

              <motion.div className="flex items-center justify-between" {...fadeUp}>
                <span className="text-sm text-gray-600">Jawaban Salah</span>
                <span className="font-medium text-red-600">{totalWrong}</span>
              </motion.div>

              <motion.div className="flex items-center justify-between" {...fadeUp}>
                <span className="text-sm text-gray-600">Materi Dibaca</span>
                <span className="font-medium">{materials.length}</span>
              </motion.div>

              {/* Progress bar */}
              <motion.div {...fadeUp}>
                <p className="text-xs text-gray-500 mb-1">Progress ke level berikutnya</p>
                <div className="w-full bg-gray-200 h-3 rounded overflow-hidden">
                  <div
                    className="h-full bg-blue-600"
                    style={{ width: `${(nextLevelProgress / 50) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{nextLevelProgress} / 50 XP</p>
              </motion.div>

              {/* Badges */}
              <motion.div {...fadeUp}>
                <h5 className="text-sm font-semibold text-gray-700">Badges</h5>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {badges.length ? (
                    badges.map((b, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-yellow-200 rounded text-xs text-yellow-900"
                      >
                        {b}
                      </span>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500">Belum ada badges</p>
                  )}
                </div>
              </motion.div>

            </div>
          </motion.div>
        </motion.div>

        {/* QUIZ HISTORY + LEADERBOARD */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6" {...fadeUp}>
          <motion.div className="bg-white p-4 rounded shadow" {...fadeUp}>
            <h4 className="font-semibold mb-3 text-gray-800">Riwayat Quiz</h4>
            <QuizHistory userId={user?._id} />
          </motion.div>

          <motion.div className="bg-white p-4 rounded shadow" {...fadeUp}>
            <h4 className="font-semibold mb-3 text-gray-800">Leaderboard</h4>
            <Leaderboard />
          </motion.div>
        </motion.div>

        {/* MATERI DIBACA */}
        <motion.div className="bg-white p-4 rounded shadow mb-8" {...fadeUp}>
          <h4 className="font-semibold mb-3 text-gray-800">Materi yang sudah dibaca</h4>

          {materials.length === 0 ? (
            <p className="text-sm text-gray-500">Belum membaca materi.</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {materials.map((m, idx) => {
                const count = progress.filter(
                  (p) => p.materialTitle === m && p.isRead
                ).length;

                return (
                  <motion.li key={idx} className="p-3 rounded bg-gray-50" {...fadeUp}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-800">{m}</span>
                      <span className="text-sm text-gray-600">{count} bagian</span>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
