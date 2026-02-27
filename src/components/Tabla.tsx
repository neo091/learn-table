import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { generateTable, type TableQuestion } from "@/lib/gameEngine";
import GameResultModal from "./GameResultModal";
import { useGame } from "@/context/useGame";

interface TablaProps {
  numero: number;
  onExit: () => void;
}
const DATOS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Tabla({ numero, onExit }: TablaProps) {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState<TableQuestion | null>(null);
  const [finished, setFinished] = useState(false);
  const [corrects, setCorrects] = useState(0);
  const { progress, dispatch } = useGame();

  const selectAnswer = (currentSelect: number) => {
    const isCorrect = question?.correctAnswer === currentSelect;
    const isPerfect = corrects + (isCorrect ? 1 : 0) === DATOS.length;

    if (isCorrect) setCorrects((prev) => prev + 1);

    if (isPerfect) {
      if (numero === progress.tables) {
        dispatch({ type: "LEVEL_UP", payload: "tables" });
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

  return (
    <>
      <div className="flex flex-col w-full px-6 gap-4 text-center">
        <h1 className="text-3xl font-bold">Learn Table</h1>
        <h2 className="text-4xl">
          {numero} x {DATOS[index]}?
        </h2>
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
        <Button onClick={onExit} className="mt-6 bg-blue-600">
          Volver
        </Button>
      </div>

      {finished && (
        <GameResultModal
          corrects={corrects}
          total={DATOS.length}
          onContinue={onExit}
        />
      )}
    </>
  );
}
