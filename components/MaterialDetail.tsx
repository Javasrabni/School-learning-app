"use client";

import { useState } from "react";
import QuizQuestion from "./QuizQuestion";
import CommentSection from "./CommentSection";

type MaterialDetailProps = {
  material: {
    title: string;
    subTopics: string[];
  };
};

export default function MaterialDetail({ material }: MaterialDetailProps) {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const dummyQuiz = {
    question: "Contoh soal matematika",
    options: ["A", "B", "C", "D"],
    correctAnswer: "A"
  };

  const handleScoreUpdate = (score: number) => setTotalScore(prev => prev + score);

  return (
    <div className="mt-4 border p-4 rounded">
      <h2 className="text-xl font-bold">{material.title}</h2>
      <ul className="list-decimal ml-6 my-2">
        {material.subTopics.map((t, idx) => (
          <li
            key={idx}
            className={currentTopic === idx ? "text-blue-600 cursor-pointer" : "cursor-pointer"}
            onClick={() => setCurrentTopic(idx)}
          >
            {t}
          </li>
        ))}
      </ul>

      <div className="mt-2 p-2 border rounded bg-gray-50">
        <p className="font-semibold">Materi: {material.subTopics[currentTopic]}</p>
        <p className="text-sm mt-1">[Isi materi bisa di sini]</p>
      </div>

      {/* Quiz */}
      <QuizQuestion
        question={dummyQuiz.question}
        options={dummyQuiz.options}
        correctAnswer={dummyQuiz.correctAnswer}
        materialTitle={material.title}
        subTopicIndex={currentTopic}
        onScoreUpdate={handleScoreUpdate}
      />

      <p className="mt-2 font-semibold">Total Skor: {totalScore}</p>

      {/* Komentar */}
      <CommentSection materialTitle={material.title} />
    </div>
  );
}
