// components/QuizQuestion.tsx
"use client";

import { useState } from "react";

type QuizQuestionProps = {
  question: string;
  options: string[];
  correctAnswer: string;
  materialTitle?: string; // optional here, main update done by parent
  subTopicIndex?: number;
  onScoreUpdate: (score: number) => Promise<void> | void;
};

export default function QuizQuestion({
  question,
  options,
  correctAnswer,
  onScoreUpdate
}: QuizQuestionProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [locked, setLocked] = useState(false);

  const handleAnswer = async (option: string) => {
    if (locked) return;
    setSelected(option);
    setLocked(true);
    const score = option === correctAnswer ? 10 : 0;
    setFeedback(option === correctAnswer ? "Benar!" : `Salah. Jawaban: ${correctAnswer}`);
    try {
      await onScoreUpdate(score);
    } catch (err) {
      console.error("onScoreUpdate error:", err);
    }
  };

  const handleRetry = () => {
    setSelected(null);
    setFeedback("");
    setLocked(false);
  };

  return (
    <div className="mt-4 p-3 border rounded bg-white">
      <p className="font-semibold mb-2">{question}</p>
      <div className="flex flex-col gap-2">
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            disabled={!!selected}
            className={`p-2 text-left border rounded ${selected === opt ? "bg-blue-100" : "hover:bg-gray-100"}`}
          >
            {opt}
          </button>
        ))}
      </div>

      {feedback && <p className="mt-2 font-medium">{feedback}</p>}

      <div className="mt-3">
        <button
          onClick={handleRetry}
          className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
        >
          Ulangi Jawaban
        </button>
      </div>
    </div>
  );
}
