import {
  Activity,
  CheckCircle,
  Clock,
  Code,
  Play,
  RefreshCw,
  Square,
  Trash,
  XCircle,
} from "lucide-react";
import { formatDate } from "../../helpers/time";

type HeaderCardProps = {
  darkMode: boolean;
  pipelineId: string | undefined;
  pipelineName: string | null;
  headerData: {
    status: string | undefined;
    startDate: string | undefined;
    duration: string | undefined;
    progress: number;
  };
  pipelineMode: string | null;
  onOptions: (
    id_pipe: string,
    name_pipe: string,
    mode: string,
    options: string,
  ) => void;
};

type StatusType = "SUCCESS" | "ERROR" | "RUNNING";


export default function HeaderCard({
  darkMode,
  pipelineName,
  pipelineId,
  pipelineMode,
  headerData,
  onOptions,
}: HeaderCardProps) {
  const getStatusConfig = (): StatusType => {
    if (headerData.status === "Finished") {
      return "SUCCESS";
    } else if (headerData.status === "Running") {
      return "RUNNING";
    }
    return "ERROR";
  };

  const statusConfig: Record<StatusType, { label: string; className: string }> = {
    SUCCESS: {
      label: "Success",
      className: `${darkMode ? "bg-green-700 text-green-200" :"bg-green-500 text-white"}`,
    },
    ERROR: {
      label: "Error",
      className: `${darkMode ? "bg-red-700 text-red-200" :"bg-red-500 text-white"}`,
    },
    RUNNING: {
      label: "Running",
      className: `${darkMode ? "bg-yellow-700 text-yellow-200" :"bg-yellow-500 text-white"}`,
    },
  };

  const statusStyle = statusConfig[`${getStatusConfig()}`];
  return (
    <div
      className={`rounded-xl mb-6 border p-5 shadow-sm ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      {/* HEADER */}
      <div className="flex justify-between items-start">
        {/* LEFT */}
        <div className="flex items-start gap-3">
          <div className={`${darkMode ? "bg-blue-900/40" : "bg-blue-100"} p-3 rounded-xl`}>
            <Activity className={`${darkMode ? "text-blue-400": "text-blue-500"}`} size={20} />
          </div>

          <div>
            <h2 className={`text-lg font-semibold ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
              {pipelineName}
            </h2>
            <p className="text-xs font-mono text-gray-400">ID: {pipelineId}</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6">
          {/* STATUS */}
          <div className="text-left">
            <p className="text-xs text-gray-400">Status</p>
            <span
              className={`inline-flex items-center text-xs px-3 py-0.5 rounded-full font-medium ${statusStyle.className}`}
            >
              {statusStyle.label === "Finished" && (
                <CheckCircle className="w-3 h-3 mr-1" />
              )}
              {statusStyle.label === "Error" && (
                <XCircle className="w-3 h-3 mr-1" />
              )}
              {statusStyle.label === "Running" && (
                <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
              )}
              {statusStyle.label}
            </span>
          </div>

          {/* START DATE */}
          <div className="text-left">
            <p className={`text-xs text-gray-400`}>Start Date</p>
            <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              {formatDate(headerData.startDate, "yy/mm/dd")}
            </p>
          </div>

          {/* DURATION */}
          <div className="text-left">
            <p className="text-xs text-gray-400">Duration</p>
            <div className="flex items-center gap-1">
              <Clock size={14} className="text-gray-400" />
              <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{headerData.duration}</p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2">
            <button className={`flex items-center gap-1 px-3 py-1.5 border ${darkMode ? "border-gray-600 bg-gray-800 text-gray-200" :"text-gray-800 border-gray-200 bg-gray-100"} rounded-lg text-sm`}>
              <Code size={14} />
              View as JSON
            </button>
            <div className="flex gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOptions(pipelineId ?? "", pipelineName ?? "", pipelineMode ?? "", "start");
                }}
                disabled={headerData.status === "Running"}
                className="text-green-600 px-2 py-2 rounded-full hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOptions(pipelineId ?? "", pipelineName ?? "", pipelineMode ?? "", "stop");
                }}
                disabled={headerData.status !== "Running"}
                className="text-orange-600 px-2 py-2 rounded-full hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Square size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOptions(pipelineId ?? "", pipelineName ?? "", pipelineMode ?? "", "remove");
                }}
                disabled={headerData.status === "Running"}
                className="text-red-600 px-2 py-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Progress</span>
          <span>{headerData.progress}%</span>
        </div>

        <div className={`w-full ${darkMode ? "bg-gray-700/80" : "bg-gray-200"} rounded-full h-2`}>
          <div
            className={`${darkMode ? "bg-blue-600" :"bg-blue-500"} h-2 rounded-full transition-all duration-300 ease-out`}
            style={{ width: `${headerData.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
