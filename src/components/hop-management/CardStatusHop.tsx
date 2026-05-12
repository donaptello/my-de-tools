import { Cpu, HardDrive, Server } from "lucide-react";
import { HopStatus } from "../../services/types/HopManagement.types";

type CardStatusHopProps = {
  darkMode: boolean;
  hopStatus?: HopStatus | undefined;
  loading: boolean;
};

export default function CardStatusHop({
  darkMode,
  hopStatus
}: CardStatusHopProps) {
  const memoryPercent =
    ((hopStatus?.memoryUsed ?? 0) / (hopStatus?.memoryTotal ?? 1)) * 100;
  return (
    <>
      {/* <div
        className={`rounded-xl border  p-4 shadow-sm transition hover:shadow-2xl hover:-translate-y-1 ${
          darkMode ? "bg-gray-800" : "border-gray-200 bg-white"
        }`}
      > */}
      {/* Hop Server */}
      <div
        className={`rounded-xl border p-5 shadow-sm ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center gap-2 mb-6">
          <Server
            size={18}
            className={`text-muted-foreground ${darkMode ? "text-gray-400" : ""}`}
          />
          <h3
            className={`tracking-tight text-sm font-medium flex items-center gap-2 ${darkMode ? "text-gray-200" : ""}`}
          >
            Hop Server
          </h3>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-xs`}>Status</span>
            <span className={`px-3 py-0.5 text-xs rounded-full ${darkMode ? "bg-green-600 text-green-200" : "bg-green-100 text-green-600"}`}>
              {hopStatus?.statusHop}
            </span>
          </div>

          <div className="flex justify-between">
            <span className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-xs`}>Uptime</span>
            <span className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>{hopStatus?.uptime}</span>
          </div>

          <div className="flex justify-between">
            <span className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-xs`}>Threads</span>
            <span className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>{hopStatus?.cpuCores}</span>
          </div>

          <div className="flex justify-between">
            <span className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-xs`}>Load Avg</span>
            <span className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>{hopStatus?.loadAvg}</span>
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
            className={`text-muted-foreground ${darkMode ? "text-gray-400" : ""}`}
          />
          <h3
            className={`tracking-tight text-sm font-medium flex items-center gap-2 ${darkMode ? "text-gray-200" : ""}`}
          >
            Memory Usage
          </h3>
        </div>

        <div className="flex justify-between text-sm mb-2">
          <span className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-xs`}>Used</span>
          <span className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-xs`}>
            {hopStatus?.memoryUsed.toFixed(2)} /{" "}
            {hopStatus?.memoryTotal.toFixed(2)} GB
          </span>
        </div>

        <div className={`w-full h-2 ${darkMode ? "bg-gray-700/80" : "bg-gray-200"} rounded-full overflow-hidden mb-4`}>
          <div
            className={`h-full ${darkMode ? "bg-blue-600" :"bg-blue-500"} transition-all duration-500 ease-out`}
            style={{ width: `${memoryPercent}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className={`rounded-lg ${darkMode ? "bg-gray-900/50" : "bg-gray-50"} p-4 text-center`}>
            <p className="text-xs text-gray-500">Free</p>
            <p className={`${darkMode ? "text-green-600/80": "text-green-500"} font-semibold`}>
              {hopStatus?.memoryFree.toFixed(2)} GB
            </p>
          </div>

          <div className={`rounded-lg ${darkMode ? "bg-gray-900/50": "bg-gray-50"} p-4 text-center`}>
            <p className="text-xs text-gray-500">Used</p>
            <p className={`${darkMode ? "text-red-800/90" : "text-red-500"} font-semibold`}>
              {hopStatus?.memoryUsed.toFixed(2)} GB
            </p>
          </div>
        </div>
      </div>

      {/* CPU */}
      <div
        className={`rounded-xl border p-6 shadow-sm ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center gap-2 mb-6">
          <Cpu
            size={18}
            className={`text-muted-foreground ${darkMode ? "text-gray-400" : ""}`}
          />
          <h3
            className={`tracking-tight text-sm font-medium flex items-center gap-2 ${darkMode ? "text-gray-200" : ""}`}
          >
            CPU Info
          </h3>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between items-center">
            <span className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-xs`}>Cores</span>
            <span className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-3xl font-bold`}>{hopStatus?.cpuCores}</span>
          </div>

          <div className="flex justify-between">
            <span className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-xs`}>Load Average</span>
            <span className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>{hopStatus?.loadAvg}</span>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className={`${darkMode ? "text-gray-400" : "text-gray-500"} text-xs`}>CPU Load</span>
              <span className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>{hopStatus?.cpuCores}%</span>
            </div>

            <div className={`w-full h-2 ${darkMode ? "bg-gray-700/80" : "bg-gray-200"} rounded-full overflow-hidden`}>
              <div
                className={`h-full ${darkMode ? "bg-blue-600" :"bg-blue-500"} transition-all duration-500 ease-out`}
                style={{ width: `${hopStatus?.loadAvg}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
