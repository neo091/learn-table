import { useState } from "react";
import { Avatar, AvatarFallback } from "./components/ui/avatar";
import { Badge } from "./components/ui/badge";
import Tabla from "./components/Tabla";
import type { GameMode } from "./types/game";
import { useGame } from "./context/useGame";

interface tablaInterface {
  tabla: number;
  bg: string;
  dificultad?: string;
}

function App() {
  const { progress, dispatch } = useGame();
  const [selectedTable, setSelectedTable] = useState<number | null>(() => {
    const storedTable = localStorage.getItem("selectedTable");
    return storedTable ? Number(storedTable) : null;
  });

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

  const resetSelectedTableHandle = () => setSelectedTable(null);

  const levelUpHandle = (mode: GameMode) => {
    dispatch({ type: "LEVEL_UP", payload: mode });
  };
  return (
    <>
      <div className="bg-linear-to-br from-blue-100 to-purple-100">
        <main className="min-h-screen md:max-w-md lg:max-w-2xl m-auto flex flex-col gap-6  p-4">
          {/* Header */}
          <header className="bg-black text-white w-full p-4 flex items-center justify-between rounded-xl shadow-md">
            <p className="flex-1 text-xl md:text-2xl font-bold">
              Aprende las Tablas <Badge>Nivel {progress.tables}</Badge>
            </p>
            <Avatar>
              {/*<AvatarImage src="https://github.com/neo091.png" />*/}
              <AvatarFallback>T</AvatarFallback>
            </Avatar>
          </header>

          {/* Home: selección de tabla */}
          {!selectedTable ? (
            <div className="flex flex-col items-center w-full">
              <h1
                className="text-3xl md:text-5xl font-extrabold text-center mb-6
    bg-gradient-to-r from-pink-500 via-indigo-500 to-cyan-500
    bg-[length:200%_200%]
    animate-gradient
    bg-clip-text text-transparent
    drop-shadow-lg"
              >
                Practica la tabla del {progress.tables} y sube de nivel
              </h1>

              <div
                className={`grid ${progress.tables >= 2 ? "grid-cols-2" : "grid-cols-1"}  md:grid-cols-3  gap-4 px-2 max-w-5xl`}
              >
                {tablas
                  .filter((t) => t.tabla <= progress.tables)
                  .map((t) => (
                    <button
                      onClick={() => setSelectedTable(t.tabla)}
                      key={t.tabla}
                      className={`mx-auto w-full max-w-xs rounded-2xl shadow-lg transform hover:scale-105 transition-transform hover:rotate-6 duration-300 ${t.bg} ring-4 ring-white p-4 group overflow-hidden 
                        ${t.tabla === progress.tables && "animate-wiggle"}`}
                    >
                      <p className="font-bold text-xl">Tabla del:</p>
                      <h2 className="text-4xl font-black">{t.tabla}</h2>
                      <p className=" font-bold  transition-all">Comenzar</p>
                    </button>
                  ))}

                {/*<button
                  className={`mx-auto w-full max-w-xs rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300 bg-gray-300 p-4`}
                >
                  <p className="font-bold text-xl">Coming soon</p>
                </button>*/}
              </div>

              {/*<Button className="mt-8" onClick={() => setLevel(tablas.length)}>
                complete all
              </Button>*/}
            </div>
          ) : (
            <Tabla
              levelUp={levelUpHandle}
              reset={resetSelectedTableHandle}
              numero={selectedTable}
            />
          )}
        </main>
      </div>
    </>
  );
}

export default App;
