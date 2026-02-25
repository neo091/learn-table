import { useEffect, useState, type MouseEvent } from "react";
import { useGame } from "@/context/useGame";
import { generateQuestion, type Question } from "@/lib/gameEngine";
import { Button } from "./ui/button";
import confetti from "canvas-confetti";
import GameResultModal from "./GameResultModal";

export default function AdditionMode({ onExit }: { onExit: () => void }) {
  const { progress, dispatch } = useGame();

  const [question, setQuestion] = useState<Question | null>(null);
  const [corrects, setCorrects] = useState(0);
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const TOTAL = 10;
  const level = progress.addition || 1;

  useEffect(() => {
    const q = generateQuestion("addition", level);
    setQuestion(q);
  }, [index]);

  const selectAnswer = (e: MouseEvent<HTMLButtonElement>) => {
    const value = Number(e.currentTarget.dataset.number);

    if (value === question?.correctAnswer) {
      setCorrects((prev) => prev + 1);
    }

    if (index + 1 >= TOTAL) {
      setFinished(true);
      return;
    }

    setIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (finished && corrects === TOTAL) {
      dispatch({ type: "LEVEL_UP", payload: "addition" });
      launchConfetti();
    }
  }, [finished]);

  const launchConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="flex flex-col gap-6 text-center mt-6">
      <h1 className="text-4xl font-black text-blue-600">Sumas</h1>

      <p className="text-lg text-gray-600">Nivel {level}</p>

      {!finished && question && (
        <>
          <h2 className="text-5xl font-bold mt-6">
            {question.a} {question.operator} {question.b}
          </h2>

          <div className="grid grid-cols-2 gap-4 mt-6">
            {question.options.map((opt) => (
              <Button
                key={opt}
                data-number={opt}
                onClick={selectAnswer}
                className="text-2xl py-6"
              >
                {opt}
              </Button>
            ))}
          </div>

          <p className="mt-4 font-bold">
            {corrects}/{TOTAL}
          </p>

          <Button onClick={onExit} className="mt-6 bg-blue-600">
            Volver
          </Button>
        </>
      )}

      {finished && (
        <GameResultModal
          corrects={corrects}
          total={TOTAL}
          onContinue={onExit}
        />
      )}
    </div>
  );
}
