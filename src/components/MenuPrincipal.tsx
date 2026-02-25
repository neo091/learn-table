import { useGame } from "@/context/useGame";
import { isModeUnlocked } from "@/lib/unlockRules";
import type { GameMode, MenuPrincipalProps } from "@/types/game";

const modos: { mode: GameMode; label: string; bg: string }[] = [
  { mode: "tables", label: "Tablas", bg: "bg-amber-300" },
  { mode: "addition", label: "Suma", bg: "bg-sky-300" },
  { mode: "multiplication", label: "Multiplicación", bg: "bg-emerald-300" },
];

export default function MenuPrincipal({ onSelectMode }: MenuPrincipalProps) {
  const { progress } = useGame();

  return (
    <div className="flex flex-col gap-8">
      {/* Hero */}
      <div className="text-center mt-6">
        <h1 className="text-4xl md:text-5xl font-black bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Aprende Matemáticas Jugando 🚀
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Mejora tu nivel paso a paso
        </p>
      </div>

      {/* Modos */}
      <div className="grid gap-6 md:grid-cols-3">
        {modos.map(({ mode, label, bg }) => {
          const unlocked = isModeUnlocked(mode, progress);

          return (
            <div
              key={mode}
              className={`relative rounded-3xl p-6 shadow-xl transition-all duration-300 
                ${bg}
                ${unlocked ? "hover:scale-105 cursor-pointer" : "opacity-40"}
              `}
              onClick={() => unlocked && onSelectMode(mode)}
            >
              {/* Badge nivel */}
              {unlocked && (
                <span className="absolute top-3 right-4 text-sm font-bold bg-white px-3 py-1 rounded-full shadow">
                  Nivel {progress[mode]}
                </span>
              )}

              <h2 className="text-3xl font-black text-center mt-6">{label}</h2>

              <div className="mt-6 flex justify-center">
                <button
                  disabled={!unlocked}
                  className="px-6 py-2 rounded-xl bg-black text-white font-bold hover:scale-105 transition-transform"
                >
                  {unlocked ? "Entrar" : "Bloqueado 🔒"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
