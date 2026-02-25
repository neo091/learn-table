import { Button } from "./ui/button";

interface GameResultModalProps {
  corrects: number;
  total: number;
  onContinue: () => void;
}

export default function GameResultModal({
  corrects,
  total,
  onContinue,
}: GameResultModalProps) {
  const isPerfect = corrects === total;

  const getMessage = () => {
    if (isPerfect) return "¡Perfecto!";
    if (corrects >= total * 0.7) return "¡Muy bien!";
    return "¡Sigue practicando!";
  };

  const getColor = () => {
    if (isPerfect) return "text-green-600";
    if (corrects >= total * 0.7) return "text-blue-600";
    return "text-orange-500";
  };

  const getEmoji = () => {
    if (isPerfect) return "🏆";
    if (corrects >= total * 0.7) return "👏";
    return "💪";
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn">
      <div className="relative bg-white rounded-3xl p-10 shadow-2xl text-center animate-scaleIn w-[90%] max-w-md">
        {/* Glow decorativo */}
        <div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-yellow-400 via-pink-500 to-purple-500 blur opacity-30"></div>

        <div className="relative">
          <div className="text-7xl animate-bounce mb-4">{getEmoji()}</div>

          <h2 className={`text-4xl font-black ${getColor()}`}>
            {getMessage()}
          </h2>

          <p className="text-lg mt-3 font-semibold">
            {corrects} de {total} correctas
          </p>

          {/* Barra visual */}
          <div className="mt-6 h-4 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-green-400 to-emerald-600 transition-all duration-700"
              style={{ width: `${(corrects / total) * 100}%` }}
            />
          </div>

          <Button
            onClick={onContinue}
            className="mt-8 w-full text-lg font-bold bg-linear-to-r from-yellow-400 to-orange-500 hover:scale-105 transition-transform"
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
}
