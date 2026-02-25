import type { GameMode } from "@/types/game";

export interface Question {
  a: number;
  b: number;
  operator: string;
  correctAnswer: number;
  options: number[];
}

export interface TableQuestion {
  correctAnswer: number;
  options: number[];
}

export function generateOptions(correct: number, optionsNumber: number): number[] {
  const options = new Set<number>();
  options.add(correct);

  while (options.size < optionsNumber) {
    const variation = Math.floor(Math.random() * 5) + 1;
    const fake =
      Math.random() > 0.5 ? correct + variation : correct - variation;

    if (fake > 0 && fake !== correct) {
      options.add(fake);
    }
  }

  return Array.from(options).sort(() => Math.random() - 0.5);
}

export function generateTable(level: number, multiplier: number): TableQuestion {
  const correctAnswer = level * multiplier

  return {
    correctAnswer,
    options: generateOptions(correctAnswer, 3)
  }
}

export function generateQuestion(
  mode: GameMode,
  level: number,
): Question {

  if (mode === "multiplication") {
    const max = level * 5
    const a = Math.floor(Math.random() * max) + 1;
    const b = Math.floor(Math.random() * max) + 1;
    const correctAnswer = a * b;

    return {
      a,
      b,
      operator: "×",
      correctAnswer,
      options: generateOptions(correctAnswer, 3),
    };
  }

  // futura suma
  const max = level * 5;
  const a = Math.floor(Math.random() * max) + 1;
  const b = Math.floor(Math.random() * max) + 1;
  const correctAnswer = a + b;

  return {
    a,
    b,
    operator: "+",
    correctAnswer,
    options: generateOptions(correctAnswer, 3),
  };
}
