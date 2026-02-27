import type { GameMode, MenuMode } from "@/types/game";
import { Button } from "./ui/button";
import { useGame } from "@/context/useGame";
import { useEffect, useState } from "react";
import { generateQuestion, type Question } from "@/lib/gameEngine";
import GameResultModal from "./GameResultModal";

export default function Game({
  menu,
  onExit,
}: {
  menu?: MenuMode;
  onExit: () => void;
}) {
  const { progress, dispatch } = useGame();

  const [question, setQuestion] = useState<Question | null>(null);
  const [corrects, setCorrects] = useState(0);
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const TOTAL = 10;
  const level = (menu && progress[menu.mode]) || 1;
  const mode = (menu && menu.mode) || ("multiplication" as GameMode);

  useEffect(() => {
    const q = generateQuestion(mode, level);

    setQuestion(q);
  }, [index]);

  const selectAnswer = (currentSelect: number) => {
    const isCorrect = question?.correctAnswer === currentSelect;
    console.log(isCorrect);

    if (isCorrect) {
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
      dispatch({ type: "LEVEL_UP", payload: mode });
    }
  }, [finished]);

  return (
    <div className="flex flex-col gap-6 text-center mt-6">
      <h1 className="text-4xl font-black">Multiplicación</h1>

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
                onClick={() => selectAnswer(opt)}
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
        <GameResultModal
          corrects={corrects}
          total={TOTAL}
          onContinue={onExit}
        />
      )}
    </div>
  );
}
