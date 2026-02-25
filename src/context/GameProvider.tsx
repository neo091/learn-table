import { useEffect, useReducer, type ReactNode } from "react";
import { GameContext } from "./GameContext";
import type { GameMode, GameState, Progress } from "@/types/game";
import { GameReducer } from "./GameReducer";

interface GameProviderProps {
  children: ReactNode;
}

const LOCAL_STORAGE_KEY = "progress";

const initialState: GameState = {
  progress: { tables: 1, multiplication: 0, addition: 0 },
  currentMode: "tables",
};

const GameProvider = ({ children }: GameProviderProps) => {
  const [state, dispatch] = useReducer(GameReducer, undefined, () => {
    const storedProgress = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedProgress) {
      try {
        const parsed: Progress = JSON.parse(storedProgress);
        return {
          progress: parsed,
          currentMode: "tables" as GameMode, // cast explícito
        } satisfies GameState;
      } catch {
        return { ...initialState };
      }
    }
    return { ...initialState };
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.progress));
  }, [state.progress]);
  return (
    <GameContext.Provider value={{ progress: state.progress, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
