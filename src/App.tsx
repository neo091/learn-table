import type { MenuMode } from "./types/game";
import { useGame } from "./context/useGame";
import MenuPrincipal from "./components/MenuPrincipal";
import Game from "./components/Game";
import { useState } from "react";
import MenuTablas from "./components/MenuTablas";

function App() {
  const [menu, setMenu] = useState<MenuMode>();
  const { currentMode, dispatch } = useGame();

  const onSelectMode = (menu: MenuMode) => {
    setMenu(menu);
    dispatch({ type: "SET_MODE", payload: menu.mode });
  };

  const handleReset = () => dispatch({ type: "RESET_MODE" });

  return (
    <>
      <div className="bg-linear-to-br from-blue-100 to-purple-100">
        <main className="min-h-screen md:max-w-md lg:max-w-2xl m-auto flex flex-col gap-6  p-4">
          {!currentMode ? (
            <MenuPrincipal onSelectMode={onSelectMode} />
          ) : currentMode === "tables" ? (
            <MenuTablas onExit={handleReset} />
          ) : (
            <Game menu={menu} onExit={handleReset} />
          )}
        </main>
      </div>
    </>
  );
}

export default App;
