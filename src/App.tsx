import type { GameMode } from "./types/game";
import { useGame } from "./context/useGame";
import MenuPrincipal from "./components/MenuPrincipal";
import MenuTablas from "./components/MenuTablas";
import MultiplicationMode from "./components/MultiplicationMode";
import AdditionMode from "./components/AdditionMode";

function App() {
  const { currentMode, dispatch } = useGame();

  const onSelectMode = (mode: GameMode) =>
    dispatch({ type: "SET_MODE", payload: mode });

  const handleReset = () => dispatch({ type: "RESET_MODE" });

  return (
    <>
      <div className="bg-linear-to-br from-blue-100 to-purple-100">
        <main className="min-h-screen md:max-w-md lg:max-w-2xl m-auto flex flex-col gap-6  p-4">
          {!currentMode ? (
            <MenuPrincipal onSelectMode={onSelectMode} />
          ) : currentMode === "tables" ? (
            <MenuTablas onExit={handleReset} />
          ) : currentMode === "multiplication" ? (
            <MultiplicationMode onExit={handleReset} />
          ) : currentMode === "addition" ? (
            <AdditionMode onExit={handleReset} />
          ) : null}
        </main>
      </div>
    </>
  );
}

export default App;
