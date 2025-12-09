"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@/context/userDataCookie";
import {
    TrophyIcon,
    User2Icon,
    FlameIcon,
    CheckCircleIcon,
} from "lucide-react";

type ProgressType = {
    materialTitle: string;
    isRead: boolean;
    score: number;
};

export default function SignedPage() {
    const { user, loading } = useUser();
    const [progress, setProgress] = useState<ProgressType[]>([]);
    const [leaders, setLeaders] = useState<any[]>([]);
    const [loadingProgress, setLoadingProgress] = useState(true);

    useEffect(() => {
        if (!user?._id) return;

        const fetchData = async () => {
            try {
                const p = await fetch(`/api/progress?userId=${user._id}`);
                const pData = await p.json();
                setProgress(pData || []);

                const res = await fetch("/api/leaderboard");
                const lead = await res.json();
                setLeaders(lead.slice(0, 3));
            } catch (e) {
                console.error(e);
            } finally {
                setLoadingProgress(false);
            }
        };

        fetchData();
    }, [user]);

    if (loading || loadingProgress)
        return <div className="p-6">Loading dashboard...</div>;

    const totalScore = progress.reduce((a, b) => a + (b.score || 0), 0);
    const totalRead = progress.filter((p) => p.isRead).length;
    const level = user?.level ?? Math.floor(totalScore / 50) + 1;
    const streak = user?.streak ?? Math.min(totalRead, 30);

    const readMaterials = new Set(
        progress.filter((p) => p.isRead).map((p) => p.materialTitle)
    );
    const allMaterials = Array.from(new Set(progress.map((p) => p.materialTitle)));
    const recommended = allMaterials.find((m) => !readMaterials.has(m));

    return (
        <motion.div
            className="w-full px-6 pt-6 space-y-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Greeting */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
            >
                <h1 className="font-bold text-2xl">
                    Halo, {user?.username}!
                </h1>
                <p className="text-sm text-neutral-500">Siap belajar hari ini?</p>
            </motion.div>

            {/* Stats */}
            <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
            >
                {/* Poin */}
                <motion.div
                    className="p-4 bg-blue-50 border border-blue-200 rounded-xl"
                    whileHover={{ scale: 1.03 }}
                >
                    <p className="text-xs text-gray-500">Total Poin</p>
                    <p className="text-xl font-bold text-blue-700">
                        {user?.points ?? totalScore}
                    </p>
                </motion.div>

                {/* Level */}
                <motion.div
                    className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl"
                    whileHover={{ scale: 1.03 }}
                >
                    <p className="text-xs text-gray-500">Level</p>
                    <p className="text-xl font-bold text-yellow-700">{level}</p>
                </motion.div>

                {/* Read */}
                <motion.div
                    className="p-4 bg-green-50 border border-green-200 rounded-xl"
                    whileHover={{ scale: 1.03 }}
                >
                    <p className="text-xs text-gray-500">Materi Dibaca</p>
                    <p className="text-xl font-bold text-green-700">{totalRead}</p>
                </motion.div>

                {/* Streak */}
                <motion.div
                    className="p-4 bg-purple-50 border border-purple-200 rounded-xl"
                    whileHover={{ scale: 1.03 }}
                >
                    <p className="text-xs text-gray-500">Streak</p>
                    <p className="text-xl font-bold text-purple-700">{streak} hari</p>
                </motion.div>
            </motion.div>

            {/* Leaderboard Mini */}
            <motion.div
                className="bg-white rounded-xl p-4 shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
            >
                <div className="flex items-center justify-between mb-3">
                    <h2 className="font-semibold text-lg">Leaderboard</h2>
                </div>

                {leaders.length === 0 && (
                    <p className="text-sm text-neutral-500">
                        Belum ada leaderboard.
                    </p>
                )}

                <ul className="space-y-3">
                    {leaders.map((u, i) => (
                        <motion.li
                            key={i}
                            className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-blue-600">{i + 1}</span>

                                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                                    <img
                                        src={u.avatar || "/default-avatar.png"}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <span className="font-medium">{u.username}</span>
                            </div>

                            <span className="text-sm text-gray-500">
                                {u.points} poin
                            </span>
                        </motion.li>
                    ))}
                </ul>
            </motion.div>

            {/* Rekomendasi Materi */}
            <motion.div
                className="p-4 bg-white border rounded-xl shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
            >
                <h3 className="font-semibold text-lg mb-2">
                    Rekomendasi Materi
                </h3>

                {!recommended ? (
                    <p className="text-sm text-neutral-500">
                        Semua materi sudah selesai.
                    </p>
                ) : (
                    <div className="space-y-2">
                        <p className="font-medium text-gray-800">{recommended}</p>

                        <a
                            href={`/materi/${encodeURIComponent(recommended)}`}
                            className="inline-block mt-2 px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                        >
                            Mulai
                        </a>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}
