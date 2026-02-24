import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "./components/ui/avatar";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import Tabla from "./components/Tabla";

interface tablaInterface {
  tabla: number;
  bg: string;
  dificultad?: string;
}

function App() {
  const [selectedTable, setSelectedTable] = useState<number | null>(() => {
    const storedTable = localStorage.getItem("selectedTable");
    return storedTable ? Number(storedTable) : null;
  });

  const [level, setLevel] = useState<number>(() => {
    const storedTable = localStorage.getItem("level");
    return storedTable ? Number(storedTable) : 1;
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
  const [titleIndex, setTitleIndex] = useState(0);

  const titleArray = [
    (level: number) =>
      `Nivel ${level} desbloqueado 🎉. ¿Listo para la tabla del ${level}?`,
    (level: number) =>
      `Nivel ${level} – Practica la tabla del ${level} y sube de nivel`,
    (level: number) =>
      `¡Genial! Estás en el nivel ${level}. Vamos a aprender la tabla del ${level}`,
    (level: number) =>
      `¡Nivel ${level}! Aprende la tabla que acabas de desbloquear`,
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titleArray.length);
    }, 5000); // cambia cada 500ms
    return () => clearInterval(interval);
  }, []);

  const resetSelectedTableHandle = () => setSelectedTable(null);

  const resetHandle = () => {
    setSelectedTable(null);
    setLevel(1);
  };
  const levelUpHandle = (tablaCompletada: number) => {
    setLevel((prev) => {
      if (tablaCompletada === prev) {
        return prev + 1;
      }

      return prev;
    });
  };

  useEffect(() => {
    localStorage.setItem("level", String(level));
  }, [level]);
  return (
    <>
      <div className="bg-linear-to-br from-blue-100 to-purple-100">
        <main className="min-h-screen md:max-w-md lg:max-w-2xl m-auto flex flex-col gap-6  p-4">
          {/* Header */}
          <header className="bg-black text-white w-full p-4 flex items-center justify-between rounded-xl shadow-md">
            <p className="flex-1 text-xl md:text-2xl font-bold">
              Aprende las Tablas <Badge>Nivel {level}</Badge>
            </p>
            <Avatar>
              {/*<AvatarImage src="https://github.com/shadcn.png" />*/}
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
                {titleArray[titleIndex](level)}
              </h1>

              <div
                className={`grid ${level >= 2 ? "grid-cols-2" : "grid-cols-1"}  md:grid-cols-3  gap-4 px-2 max-w-5xl`}
              >
                {tablas
                  .filter((t) => t.tabla <= level)
                  .map((t) => (
                    <button
                      onClick={() => setSelectedTable(t.tabla)}
                      key={t.tabla}
                      className={`mx-auto w-full max-w-xs rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300 ${t.bg} ${t.tabla === level ? "animate-wiggle  ring-4 ring-white" : ""} p-4 group`}
                    >
                      <p className="font-bold text-xl">Tabla del:</p>
                      <h2 className="text-4xl font-black">{t.tabla}</h2>
                      <p>Comenzar</p>
                    </button>
                  ))}

                {level === tablas.length && (
                  <>
                    <button
                      className={`mx-auto w-full max-w-xs rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300 bg-gray-300 p-4`}
                    >
                      <p className="font-bold text-xl">Coming soon</p>
                    </button>
                    <Button className="mt-8" onClick={resetHandle}>
                      reset all
                    </Button>
                  </>
                )}
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
