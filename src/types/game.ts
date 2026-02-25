export type GameMode = "tables" | "multiplication" | "addition"

export interface Progress {
  tables: number;
  multiplication: number;
  addition: number;
}

export interface GameState {
  progress: Progress;
  currentMode: GameMode | null
}

export interface MenuPrincipalProps {
  onSelectMode: (mode: GameMode) => void;
}