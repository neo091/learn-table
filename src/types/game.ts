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
  onSelectMode: (mode: MenuMode) => void;
}

export interface MenuMode {
  mode: GameMode;
  label: string;
  emoji: string;
  description: string;
  cardClass: string;
}
