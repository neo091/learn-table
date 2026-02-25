import { useState } from "react";
import Tabla from "./Tabla";
import { useGame } from "@/context/useGame";
import { Button } from "./ui/button";

interface tablaInterface {
  tabla: number;
  bg: string;
  dificultad?: string;
}

const tablas: tablaInterface[] = [
  { tabla: 1, bg: "bg-amber-300" },
  { tabla: 2, bg: "bg-emerald-300" },
  { tabla: 3, bg: "bg-sky-300" },
  { tabla: 4, bg: "bg-pink-300" },
  { tabla: 5, bg: "bg-violet-300" },
  { tabla: 6, bg: "bg-rose-300" },
  { tabla: 7, bg: "bg-lime-300" },
  { tabla: 8, bg: "bg-orange-300" },
  { tabla: 9, bg: "bg-cyan-300" },
];

const MenuTablas = ({ onExit }: { onExit: () => void }) => {
  const { progress } = useGame();
  const [currentTable, setCurrentTable] = useState<number | null>(() => {
    const storedTable = localStorage.getItem("selectedTable");
    return storedTable ? Number(storedTable) : null;
  });

  const resetTables = () => setCurrentTable(null);

  return (
    <>
      <header className="flex items-center justify-between bg-slate-900 text-white rounded-2xl p-4 shadow-lg">
        <div>
          <h2 className="text-2xl font-black">Tablas de Multiplicar</h2>
          <p className="text-sm text-gray-200">
            Nivel actual:{" "}
            <span className="font-bold text-indigo-300">{progress.tables}</span>
          </p>
        </div>
        <div className="text-3xl">📚</div>
      </header>

      {/* Home: selección de tabla */}
      {!currentTable ? (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-4xl md:text-5xl font-black text-center mt-6 mb-8">
            Elige tu tabla
          </h1>

          <div
            className={`grid ${progress.tables >= 2 ? "grid-cols-2" : "grid-cols-1"}  md:grid-cols-3  gap-4 px-2 max-w-5xl`}
          >
            {tablas
              .filter((t) => t.tabla <= progress.tables)
              .map((t) => (
                <button
                  onClick={() => setCurrentTable(t.tabla)}
                  key={t.tabla}
                  className={`
                    relative rounded-3xl shadow-xl p-6 
                    transition-all duration-300
                    hover:scale-105 hover:-translate-y-2
                    ${t.tabla === progress.tables && "animate-wiggle"}
                    ${t.bg}
                    ${t.tabla === progress.tables && "ring-4 ring-indigo-500"}
                  `}
                >
                  {t.tabla === progress.tables && (
                    <span className="absolute top-3 right-4 text-xs font-bold bg-white px-2 py-1 rounded-full shadow">
                      Nuevo 🔥
                    </span>
                  )}

                  <div className="text-center">
                    <p className="text-lg font-bold">Tabla del</p>
                    <h2 className="text-5xl font-black">{t.tabla}</h2>
                  </div>
                </button>
              ))}
          </div>

          <Button className="mt-8" onClick={onExit}>
            Menu principal
          </Button>
        </div>
      ) : (
        <Tabla onExit={resetTables} numero={currentTable} />
      )}
    </>
  );
};

export default MenuTablas;
