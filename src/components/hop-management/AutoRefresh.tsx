import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";

type AutoRefreshProps = {
  darkMode: boolean;
  onRefresh: () => void;
};

type IntervalOption = 5 | 10 | 30 | 60 | 300;
const intervalLabels: Record<IntervalOption, string> = {
  5: "5s",
  10: "10s",
  30: "30s",
  60: "1m",
  300: "5m",
};

export default function AutoRefresh({ darkMode, onRefresh }: AutoRefreshProps) {
  const [enabled, setEnabled] = useState(false);
  const [interval, setIntervalValue] = useState<IntervalOption>(5);
  const [time, setTime] = useState(new Date());

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

  return (
    <div className="flex items-center gap-4">
      {/* TOGGLE */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setEnabled(!enabled)}
          className={`w-11 h-6 flex items-center rounded-full p-0.5 transition ${
            enabled ? "bg-blue-500" : "bg-gray-200"
          }`}
        >
          <div
            className={`bg-gray-100 w-5 h-5 rounded-full shadow-md transform transition ${
              enabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        <span className="text-gray-600 text-xs">Auto Refresh</span>
      </div>

      {/* INTERVAL OPTIONS */}
      {enabled && (
        <div className="flex bg-gray-100 rounded-full border border-gray-300 p-1">
          {(Object.keys(intervalLabels) as unknown as IntervalOption[]).map(
            (key) => (
              <button
                key={key}
                onClick={() => {
                  setIntervalValue(key);
                  console.log(typeof key, key);
                }}
                className={`px-3 py-1 text-xs rounded-full transition ${
                  Number(interval) === Number(key) ? "bg-blue-500 text-white" : "text-gray-600"
                }`}
              >
                {intervalLabels[key]}
              </button>
            ),
          )}
        </div>
      )}

      {/* REFRESH BUTTON */}
      <button
        onClick={onRefresh}
        className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
      >
        <RefreshCcw size={14} />
        <span className="text-xs">Refresh</span>
      </button>

      {/* CLOCK */}
      <span className="text-gray-500 text-xs">{time.toLocaleTimeString()}</span>
    </div>
  );
}
