import { useEffect, useState, type MouseEvent } from "react";
import { Avatar, AvatarFallback } from "./components/ui/avatar";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";

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
      <main className="min-h-screen flex flex-col gap-6 bg-linear-to-br from-blue-100 to-purple-100 p-4">
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
            <h1 className="text-2xl md:text-5xl font-extrabold text-center text-indigo-700 drop-shadow-lg mb-6">
              ¡Hola! Elige la tabla que quieres aprender
            </h1>

            <div
              className={`grid ${level >= 2 && "grid-cols-2"}  md:grid-cols-3 xl:grid-cols-4 gap-4 px-2 max-w-5xl`}
            >
              {tablas
                .filter((t) => t.tabla <= level)
                .map((t) => (
                  <button
                    onClick={() => setSelectedTable(t.tabla)}
                    key={t.tabla}
                    className={`mx-auto w-full max-w-xs rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300 ${t.bg} p-4`}
                  >
                    {/*<CardHeader>
                      <CardTitle className="text-2xl font-bold text-center">
                        Tabla del {t.tabla}
                      </CardTitle>
                    </CardHeader>*/}

                    <p className="font-bold text-xl">Tabla del:</p>
                    <h2 className="text-4xl font-black">{t.tabla}</h2>
                    <Button className="bg-white text-black font-bold px-4 py-2 rounded-lg shadow-md hover:shadow-xl hover:bg-yellow-200 transition-all">
                      Comenzar
                    </Button>
                  </button>
                ))}
            </div>
            <Button className="mt-6" onClick={resetHandle}>
              Resetear todo
            </Button>
          </div>
        ) : (
          <Tabla
            levelUp={levelUpHandle}
            reset={resetHandle}
            numero={selectedTable}
          />
        )}
      </main>
    </>
  );
}

function Tabla({
  numero,
  reset,
  levelUp,
}: {
  numero: number;
  reset: () => void;
  levelUp: (tablaLevel: number) => void;
}) {
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [corrects, setCorrects] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const datos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const selectNumber = (e: MouseEvent<HTMLButtonElement>) => {
    const currentNumberSelect = e.currentTarget.dataset.number;
    if (Number(currentNumberSelect) === correctAnswer) {
      setCorrects((prev) => prev + 1);
    }

    if (datos.length <= index + 1) {
      setFinished(true);
      return;
    }

    setIndex((prev) => prev + 1);
  };

  const loadData = () => {
    const correct = Number(numero) * datos[index];
    setCorrectAnswer(correct);

    const options = new Set<number>();
    options.add(correct);

    while (options.size < 3) {
      const variation = Math.floor(Math.random() * 5) + 1;
      const fake =
        Math.random() > 0.5 ? correct + variation : correct - variation;

      if (fake > 0 && fake !== correct) {
        options.add(fake);
      }
    }

    const shuffled = Array.from(options).sort(() => Math.random() - 0.5);

    setAnswers(shuffled);
  };

  useEffect(() => {
    loadData();
  }, [index]);

  useEffect(() => {
    if (finished && corrects === datos.length) {
      levelUp(numero);
    }
  }, [finished, corrects]);

  return (
    <>
      <div className="flex flex-col w-full px-6 gap-4 text-center">
        <h1 className="text-3xl font-bold">Learn Table</h1>
        <h2 className="text-4xl">
          {numero} x {datos[index]}?
        </h2>
        {finished && "Terminado"}
        <p>
          {corrects}/{datos.length}
        </p>
        {answers.map((a) => (
          <Button
            key={a}
            data-number={String(a)}
            onClick={selectNumber}
            className="text-lg"
            disabled={finished}
          >
            {a}
          </Button>
        ))}

        {finished && <Button onClick={reset}>Volver</Button>}
      </div>
    </>
  );
}
export default App;
