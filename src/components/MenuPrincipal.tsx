import { useGame } from "@/context/useGame";
import { isModeUnlocked } from "@/lib/unlockRules";
import type { MenuMode, MenuPrincipalProps } from "@/types/game";
import { Badge } from "./ui/badge";

const modos: MenuMode[] = [
  {
    mode: "tables",
    label: "Tablas",
    emoji: "📚",
    description: "Practica tabla por tabla y desbloquea nuevos retos.",
    cardClass: "from-amber-200 via-yellow-200 to-orange-200",
  },
  {
    mode: "addition",
    label: "Suma",
    emoji: "➕",
    description: "Mejora tu velocidad mental con sumas progresivas.",
    cardClass: "from-sky-200 via-cyan-200 to-blue-200",
  },
  {
    mode: "multiplication",
    label: "Multiplicación",
    emoji: "✖️",
    description: "Resuelve operaciones más rápidas en cada nivel.",
    cardClass: "from-emerald-200 via-teal-200 to-green-200",
  },
];

export default function MenuPrincipal({ onSelectMode }: MenuPrincipalProps) {
  const { progress } = useGame();

  return (
    <div className="flex flex-col gap-8">
      {/* Hero */}
      <header className="text-center mt-6">
        <h1 className="text-4xl md:text-5xl font-black bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Aprende Matemáticas Jugando 🚀
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Mejora tu nivel paso a paso
        </p>
      </header>

      {/* Modos */}
      <div className="grid gap-6 md:grid-cols-2">
        {modos.map(({ mode, label, emoji, description, cardClass }) => {
          const unlocked = isModeUnlocked(mode, progress);

          return (
            <button
              key={mode}
              type="button"
              onClick={() =>
                unlocked &&
                onSelectMode({ mode, label, emoji, description, cardClass })
              }
              disabled={!unlocked}
              className={`group relative overflow-hidden rounded-3xl p-6 text-left shadow-xl border border-white/70 transition-all duration-300 bg-linear-to-br ${cardClass} ${
                unlocked
                  ? "hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
                  : "opacity-55 grayscale"
              }`}
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10 flex items-start justify-between gap-3">
                <div className="text-4xl" aria-hidden="true">
                  {emoji}
                </div>
                <Badge className="bg-white text-slate-800 font-bold shadow-sm">
                  {unlocked ? `Nivel ${progress[mode]}` : "Bloqueado"}
                </Badge>
              </div>

              <h2 className="relative z-10 text-3xl font-black mt-6">
                {label}
              </h2>
              <p className="relative z-10 mt-2 text-slate-700 font-medium">
                {description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
