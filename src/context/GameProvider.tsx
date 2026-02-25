import { useEffect, useReducer, type ReactNode } from "react";
import { GameContext } from "./GameContext";
import type { GameState } from "@/types/game";
import { GameReducer } from "./GameReducer";

interface GameProviderProps {
  children: ReactNode;
}

const LOCAL_STORAGE_KEY = "gameState";

const initialState: GameState = {
  progress: { tables: 1, multiplication: 1, addition: 1 },
  currentMode: null,
};

const GameProvider = ({ children }: GameProviderProps) => {
  const [state, dispatch] = useReducer(GameReducer, undefined, () => {
    const storedProgress = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedProgress) {
      try {
        const parsed: GameState = JSON.parse(storedProgress);
        return {
          progress: parsed.progress,
          currentMode: parsed.currentMode, // cast explícito
        };
      } catch {
        return { ...initialState };
      }
    }
    return { ...initialState };
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state.progress, state.currentMode]);
  return (
    <GameContext.Provider
      value={{
        currentMode: state.currentMode,
        progress: state.progress,
        dispatch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
