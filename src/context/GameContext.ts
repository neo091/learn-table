import { type GameState } from "@/types/game";
import { createContext, type Dispatch } from "react";
import type { GameAction } from "./GameReducer";

interface GameContextType {
  progress: GameState["progress"];
  currentMode: GameState["currentMode"];
  dispatch: Dispatch<GameAction>
}

export const GameContext = createContext<GameContextType | undefined>(undefined)