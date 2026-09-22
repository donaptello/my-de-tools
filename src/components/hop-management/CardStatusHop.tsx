import { HardDrive, Server } from "lucide-react";
import { HopStatus } from "../../services/types/HopManagement.types";

type CardStatusHopProps = {
  darkMode: boolean;
  hopStatus?: HopStatus | undefined;
  loading: boolean;
};

function memoryColorAlert(value: number | undefined, darkMode: boolean, isMemoryFree: boolean = false): string {
  
  const percentage: number = value ?? 0
  if (isMemoryFree == false && percentage >= 80) {
    return `${darkMode ? "bg-red-600" :"bg-red-500"}`;
  } else if (isMemoryFree == true && percentage <= 20) {
    return `${darkMode ? "bg-red-600" :"bg-red-500"}`;
  }
  return `${darkMode ? "bg-blue-600" :"bg-blue-500"}`;
}

export default function CardStatusHop({
  darkMode,
  hopStatus
}: CardStatusHopProps) {
  const memoryPercent = ((hopStatus?.memoryUsed ?? 0) / (hopStatus?.memoryTotal ?? 1)) * 100;
  const memoryFreePercent = (((hopStatus?.memoryFree ?? 0) / (hopStatus?.memoryTotal ?? 1)) * 100);
  return (
    <>
      {/* Hop Server */}
      <div
        className={`rounded-xl border p-5 shadow-sm ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center gap-2 mb-6">
          <Server
            size={18}
            className={`text-muted-foreground ${darkMode ? "text-gray-300" : ""}`}
          />
          <h3
            className={`tracking-tight text-sm font-medium flex items-center gap-2 ${darkMode ? "text-gray-200" : ""}`}
          >
            Hop Server
          </h3>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className={`${darkMode ? "text-gray-300" : "text-gray-500"} text-xs`}>Status</span>
            <span className={`px-3 py-0.5 text-xs rounded-full ${darkMode ? "bg-green-600 text-green-200" : "bg-green-100 text-green-600"}`}>
              {hopStatus?.statusHop}
            </span>
          </div>

          <div className="flex justify-between">
            <span className={`${darkMode ? "text-gray-300" : "text-gray-500"} text-xs`}>Uptime</span>
            <span className={`${darkMode ? "text-gray-300" : "text-gray-500"}`}>{hopStatus?.uptime}</span>
          </div>

          <div className="flex justify-between">
            <span className={`${darkMode ? "text-gray-300" : "text-gray-500"} text-xs`}>Threads</span>
            <span className={`${darkMode ? "text-gray-300" : "text-gray-500"}`}>{hopStatus?.threadCount}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className={`${darkMode ? "text-gray-300" : "text-gray-500"} text-xs`}>Cores</span>
            <span className={`${darkMode ? "text-gray-300" : "text-gray-500"} font-bold`}>{hopStatus?.cpuCores}</span>
          </div>
        </div>
      </div>

      {/* Memory */}
      <div
        className={`rounded-xl border p-6 shadow-sm ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center gap-2 mb-4">
          <HardDrive
            size={18}
            className={`text-muted-foreground ${darkMode ? "text-gray-300" : ""}`}
          />
          <h3
            className={`tracking-tight text-sm font-medium flex items-center gap-2 ${darkMode ? "text-gray-200" : ""}`}
          >
            Statistic Usage
          </h3>
        </div>

        <div className="flex justify-between text-sm mb-2">
          <span className={`${darkMode ? "text-gray-300" : "text-gray-500"} text-xs`}>Memory Free</span>
          <span className={`${darkMode ? "text-gray-300" : "text-gray-500"} text-xs`}>
            {hopStatus?.memoryFree.toFixed(2)} /{" "}
            {hopStatus?.memoryTotal.toFixed(2)} GB
          </span>
        </div>

        <div className={`w-full h-2 ${darkMode ? "bg-gray-700/80" : "bg-gray-200"} rounded-full overflow-hidden mb-4`}>
          <div
            className={`h-full ${memoryColorAlert(memoryFreePercent, darkMode, true)} transition-all duration-500 ease-out`}
            style={{ width: `${memoryFreePercent}%` }}
          />
        </div>
        
        <div className="flex justify-between text-sm mb-2">
          <span className={`${darkMode ? "text-gray-300" : "text-gray-500"} text-xs`}>Memory Used</span>
          <span className={`${darkMode ? "text-gray-300" : "text-gray-500"} text-xs`}>
            {hopStatus?.memoryUsed.toFixed(2)} /{" "}
            {hopStatus?.memoryTotal.toFixed(2)} GB
          </span>
        </div>

        <div className={`w-full h-2 ${darkMode ? "bg-gray-700/80" : "bg-gray-200"} rounded-full overflow-hidden mb-4`}>
          <div
            className={`h-full ${memoryColorAlert(memoryPercent, darkMode)} transition-all duration-500 ease-out`}
            style={{ width: `${memoryPercent}%` }}
          />
        </div>


        <div className="space-y-4 text-sm">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className={`${darkMode ? "text-gray-300" : "text-gray-500"} text-xs`}>CPU Load</span>
              <span className={`${darkMode ? "text-gray-300" : "text-gray-500"} text-xs`}>{hopStatus?.loadAvg}%</span>
            </div>

            <div className={`w-full h-2 ${darkMode ? "bg-gray-700/80" : "bg-gray-200"} rounded-full overflow-hidden`}>
              <div
                className={`h-full ${memoryColorAlert(hopStatus?.loadAvg, darkMode)} transition-all duration-500 ease-out`}
                style={{ width: `${hopStatus?.loadAvg}%` }}
              />
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
