import { useEffect, useState, type MouseEvent } from "react";
import { useGame } from "@/context/useGame";
import { generateQuestion, type Question } from "@/lib/gameEngine";
import { Button } from "./ui/button";
import confetti from "canvas-confetti";

export default function MultiplicationMode({ onExit }: { onExit: () => void }) {
  const { progress, dispatch } = useGame();

  const [question, setQuestion] = useState<Question | null>(null);
  const [corrects, setCorrects] = useState(0);
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const TOTAL = 10;

  useEffect(() => {
    const q = generateQuestion("multiplication", progress.multiplication || 1);
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

  // LEVEL UP
  useEffect(() => {
    if (finished && corrects === TOTAL) {
      dispatch({ type: "LEVEL_UP", payload: "multiplication" });
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
      <h1 className="text-4xl font-black">Multiplicación</h1>

      <p className="text-lg text-gray-600">Nivel {progress.multiplication}</p>

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

          <Button className="mt-8" onClick={onExit}>
            Menu principal
          </Button>
        </>
      )}

      {finished && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-10 shadow-2xl text-center animate-scaleIn">
            <div className="text-6xl animate-bounce">🏆</div>
            <h2 className="text-4xl font-black text-green-600 mt-4">
              ¡Perfecto!
            </h2>
            <p className="text-lg mt-2">10 de 10 correctas 🎉</p>

            <Button
              onClick={onExit}
              className="mt-6 text-lg font-bold bg-linear-to-r from-yellow-400 to-orange-500 hover:scale-105 transition-transform"
            >
              Continuar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
