import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

type IntervalConfig = Record<number, string>;
type AutoRefreshProps = {
  darkMode: boolean;
  onRefresh: () => void;
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  intervals?: IntervalConfig;
  defaultInterval?: number;
};

export default function AutoRefresh({
  darkMode,
  onRefresh,
  enabled,
  setEnabled,
  intervals = {
    5: "5s",
    10: "10s",
    30: "30s",
    60: "1m",
    300: "5m",
  },
  defaultInterval = 5,
}: AutoRefreshProps) {
  const intervalKeys = Object.keys(intervals).map(Number);

  const [interval, setIntervalValue] = useState<number>(
    intervalKeys.includes(defaultInterval) ? defaultInterval : intervalKeys[0],
  );
  const [time, setTime] = useState(new Date());
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const timer = setInterval(() => {
      onRefresh();
    }, interval * 1000);

    return () => clearInterval(timer);
  }, [enabled, interval, onRefresh]);

  useEffect(() => {
    if (isRotating) {
      const timer = setTimeout(() => setIsRotating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isRotating]);

  return (
    <div className="flex items-center gap-4">
      {/* TOGGLE */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setEnabled(!enabled)}
          className={`w-11 h-6 flex items-center rounded-full p-0.5 transition ${
            enabled ? "bg-blue-500" : `${darkMode ? "bg-gray-600" :"bg-gray-200"}`
          }`}
        >
          <div
            className={`${darkMode ? "bg-gray-900" : "bg-gray-100"} w-5 h-5 rounded-full shadow-md transform transition ${
              enabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        <span className={`${darkMode ? "text-gray-400" : "text-gray-600"} text-xs`}>Auto Refresh</span>
      </div>

      {/* INTERVAL OPTIONS */}
      {enabled && (
        <div className={`flex ${darkMode ? "bg-gray-900 border-gray-700" : "bg-gray-100 border-gray-300"} rounded-full border p-1`}>
          {intervalKeys.map((key) => (
            <button
              key={key}
              onClick={() => {
                setIntervalValue(key);
                console.log(typeof key, key);
              }}
              className={`px-3 py-1 text-xs rounded-full transition ${
                Number(interval) === Number(key)
                  ? "bg-blue-500 text-white"
                  : `${darkMode ? "text-gray-400" : "text-gray-600"}`
              }`}
            >
              {intervals[key]}
            </button>
          ))}
        </div>
      )}

      {/* REFRESH BUTTON */}
      <button
        onClick={() => {
          setIsRotating(true);
          onRefresh();
        }}
        className={`flex items-center gap-2 px-3 py-1.5 border ${darkMode ? "hover:bg-gray-800 border-gray-700 text-gray-400" : "hover:bg-gray-50 border-gray-300"} rounded-lg text-sm`}
      >
        <RefreshCcw size={14} className={isRotating ? 'animate-spin' : ''} />
        <span className="text-xs">Refresh</span>
      </button>

      {/* CLOCK */}
      <span className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-xs`}>{time.toLocaleTimeString()}</span>
    </div>
  );
}
