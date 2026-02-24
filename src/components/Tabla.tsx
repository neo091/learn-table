import { useEffect, useState, type MouseEvent } from "react";
import { Button } from "./ui/button";
import confetti from "canvas-confetti";

export default function Tabla({
  numero,
  reset,
  levelUp,
}: {
  numero: number;
  reset: () => void;
  levelUp: (tablaLevel: number) => void;
}) {
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [corrects, setCorrects] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const [showVictory, setShowVictory] = useState(false);

  const datos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const selectNumber = (e: MouseEvent<HTMLButtonElement>) => {
    const currentNumberSelect = e.currentTarget.dataset.number;
    if (Number(currentNumberSelect) === correctAnswer) {
      setCorrects((prev) => prev + 1);
    }

    if (datos.length <= index + 1) {
      setFinished(true);
      return;
    }

    setIndex((prev) => prev + 1);
  };

  const loadData = () => {
    const correct = Number(numero) * datos[index];
    setCorrectAnswer(correct);

    const options = new Set<number>();
    options.add(correct);

    while (options.size < 3) {
      const variation = Math.floor(Math.random() * 5) + 1;
      const fake =
        Math.random() > 0.5 ? correct + variation : correct - variation;

      if (fake > 0 && fake !== correct) {
        options.add(fake);
      }
    }

    const shuffled = Array.from(options).sort(() => Math.random() - 0.5);

    setAnswers(shuffled);
  };

  useEffect(() => {
    loadData();
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

  useEffect(() => {
    if (finished && corrects === datos.length) {
      levelUp(numero);
      setShowVictory(true);
      launchConfetti();
    }
  }, [finished, corrects]);

  return (
    <>
      <div className="flex flex-col w-full px-6 gap-4 text-center">
        <h1 className="text-3xl font-bold">Learn Table</h1>
        <h2 className="text-4xl">
          {numero} x {datos[index]}?
        </h2>
        {finished && "Terminado"}
        <p>
          {corrects}/{datos.length}
        </p>
        {answers.map((a) => (
          <Button
            key={a}
            data-number={String(a)}
            onClick={selectNumber}
            className="text-lg"
            disabled={finished}
          >
            {a}
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
              className="mt-6 text-lg font-bold bg-gradient-to-r from-yellow-400 to-orange-500 hover:scale-105 transition-transform"
            >
              Continuar
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
