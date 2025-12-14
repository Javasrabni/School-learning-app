// components/QuizQuestion.tsx
"use client";

import { useState } from "react";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";

type QuizQuestionProps = {
  question: string;
  options: string[];
  correctAnswer: string;
  materialTitle?: string;
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
    <div className="space-y-4">
      {/* Question */}
      <p className="text-sm font-semibold text-gray-900 font-[poppins ]">{question}</p>

      {/* Options */}
      <div className="space-y-3">
        {options.map((opt, i) => {
          const isSelected = selected === opt;
          const isCorrect = opt === correctAnswer;
          
          // Determine styling based on state
          let buttonStyle = "";
          let icon = null;

          if (locked) {
            // After answer is locked (submitted)
            if (isCorrect) {
              // Show correct answer in green
              buttonStyle = "bg-green-50 border-green-500 text-green-900 shadow-sm";
              icon = <CheckCircle className="w-5 h-5 text-green-600" />;
            } else if (isSelected && !isCorrect) {
              // Show wrong selected answer in red
              buttonStyle = "bg-red-50 border-red-500 text-red-900 shadow-sm";
              icon = <XCircle className="w-5 h-5 text-red-600" />;
            } else {
              // Other options are grayed out
              buttonStyle = "bg-gray-50 border-gray-200 text-gray-500 opacity-60";
            }
          } else {
            // Before submission (not locked)
            buttonStyle = "bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 cursor-pointer";
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              disabled={locked}
              className={`
                w-full px-4 py-2 rounded-lg border-2 text-left transition-all
                flex items-center justify-between gap-3
                ${buttonStyle}
                ${locked ? 'cursor-default' : ''}
              `}
            >
              <span className="flex-1 text-xs font-medium">{opt}</span>
              
              {/* Show icon only after submission (when locked) */}
              {locked && icon}
            </button>
          );
        })}
      </div>

      {/* Feedback Message */}
      {feedback && (
        <div
          className={`p-4 rounded-lg border ${
            feedback === "Benar!"
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <p
            className={`font-semibold text-xs ${
              feedback === "Benar!" ? "text-green-900" : "text-red-900"
            }`}
          >
            {feedback === "Benar!" 
              ? "✓ Jawaban Benar! +10 poin" 
              : `✗ ${feedback}`
            }
          </p>
        </div>
      )}

      {/* Retry Button */}
      {locked && (
        <div className="flex">
          <button
            onClick={handleRetry}
            className="text-xs px-6 py-2.5 rounded-lg text-sm font-medium bg-gray-600 text-white hover:bg-gray-700 transition-all shadow-sm hover:shadow-md flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Ulangi Jawaban
          </button>
        </div>
      )}
    </div>
  );
}