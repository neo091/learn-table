import type { GameMode, GameState } from "@/types/game"

export type GameAction =
  | { type: "SET_MODE", payload: GameMode }
  | { type: "LEVEL_UP", payload: GameMode }
  | { type: "RESET_MODE" }

export const GameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "SET_MODE":
      return {
        ...state,
        currentMode: action.payload
      }
    case "LEVEL_UP":
      return {
        ...state,
        progress: {
          ...state.progress,
          [action.payload]: state.progress[action.payload] + 1,
        },
      };

    case "RESET_MODE":
      return { ...state, currentMode: null };

    default:
      return state;
  }
}