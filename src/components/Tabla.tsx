import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import confetti from "canvas-confetti";
import { generateTable, type TableQuestion } from "@/lib/gameEngine";
import type { GameMode } from "@/types/game";

interface TablaProps {
  numero: number;
  reset: () => void;
  levelUp: (tablaLevel: GameMode) => void;
}
const DATOS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Tabla({ numero, reset, levelUp }: TablaProps) {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState<TableQuestion | null>(null);
  const [finished, setFinished] = useState(false);
  const [corrects, setCorrects] = useState(0);
  const [showVictory, setShowVictory] = useState(false);

  const selectAnswer = (currentSelect: number) => {
    const isCorrect = question?.correctAnswer === currentSelect;
    if (isCorrect) setCorrects((prev) => prev + 1);

    if (DATOS.length <= index + 1) {
      const isPerfect = corrects + (isCorrect ? 1 : 0) === DATOS.length;

      if (isPerfect) {
        levelUp("tables");
        setShowVictory(true);
        launchConfetti();
      }
      setFinished(true);

      return;
    }

    setIndex((prev) => prev + 1);
  };

  useEffect(() => {
    const q = generateTable(numero, DATOS[index]);
    setQuestion(q);
  }, [index]);

  const launchConfetti = () => {
    const duration = 5000; // 5 segundos (15 es demasiado para niños)
    const animationEnd = Date.now() + duration;

    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 1000,
    };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: {
          x: randomInRange(0.1, 0.3),
          y: Math.random() * 0.4,
        },
      });

      confetti({
        ...defaults,
        particleCount,
        origin: {
          x: randomInRange(0.7, 0.9),
          y: Math.random() * 0.4,
        },
      });
    }, 250);
  };

  return (
    <>
      <div className="flex flex-col w-full px-6 gap-4 text-center">
        <h1 className="text-3xl font-bold">Learn Table</h1>
        <h2 className="text-4xl">
          {numero} x {DATOS[index]}?
        </h2>
        {finished && "Terminado"}
        <p>
          {corrects}/{DATOS.length}
        </p>
        {question?.options.map((q) => (
          <Button
            key={q}
            onClick={() => {
              selectAnswer(q);
            }}
            className="text-lg"
            disabled={finished}
          >
            {q}
          </Button>
        ))}
        <Button onClick={reset} className="mt-6 bg-blue-600">
          Volver
        </Button>
      </div>

      {showVictory && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-10 shadow-2xl text-center animate-scaleIn">
            <div className="text-6xl animate-bounce">🏆</div>
            <h2 className="text-4xl font-black text-green-600 mt-4">
              ¡Perfecto!
            </h2>
            <p className="text-lg mt-2">10 de 10 correctas 🎉</p>

            <Button
              onClick={reset}
              className="mt-6 text-lg font-bold bg-linear-to-r from-yellow-400 to-orange-500 hover:scale-105 transition-transform"
            >
              Continuar
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
