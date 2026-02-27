import type { Progress, GameMode } from "@/types/game";

export function isModeUnlocked(mode: GameMode, progress: Progress) {
  switch (mode) {
    case "tables":
      return true;
    case "addition":
      return progress.tables >= 5;

    case "multiplication":
      return progress.addition >= 10;

    default:
      return false;
  }
}