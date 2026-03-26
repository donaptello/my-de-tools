import { Activity, CheckCircle, Clock, Code, FileText, RefreshCw, XCircle } from "lucide-react";

type HeaderCardProps = {
  darkMode: boolean;
  pipelineId: string | undefined;
  pipelineName: string | null;
}

type StatusType = "SUCCESS" | "ERROR" | "RUNNING";
const statusConfig: Record<StatusType, { label: string; className: string }> = {
  SUCCESS: {
    label: "Success",
    className: "bg-green-500 text-white",
  },
  ERROR: {
    label: "Error",
    className: "bg-red-500 text-white",
  },
  RUNNING: {
    label: "Running",
    className: "bg-yellow-500 text-white",
  },
};

export default function HeaderCard({
  darkMode,
  pipelineName,
  pipelineId,
}: HeaderCardProps) {
  const statusStyle = statusConfig["ERROR"];
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
          <div className="bg-blue-100 p-3 rounded-xl">
            <Activity className="text-blue-500" size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
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
              {statusStyle.label === "Finished" && <CheckCircle className="w-3 h-3 mr-1" />}
              {statusStyle.label === "Error" && <XCircle className="w-3 h-3 mr-1" />}
              {statusStyle.label === "Running" && <RefreshCw className="w-3 h-3 mr-1 animate-spin" />}
              {statusStyle.label}
            </span>
          </div>

          {/* START DATE */}
          <div className="text-left">
            <p className="text-xs text-gray-400">Start Date</p>
            <p className="text-sm text-gray-700">12/12/2026</p>
          </div>

          {/* DURATION */}
          <div className="text-left">
            <p className="text-xs text-gray-400">Duration</p>
            <div className="flex items-center gap-1">
              <Clock size={14} className="text-gray-400" />
              <p className="text-sm text-gray-700">1h</p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2">
            <button className="flex hover:cursor-not-allowed items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-gray-100">
              <FileText size={14} />
              View as XML
            </button>

            <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm bg-gray-100">
              <Code size={14} />
              View as JSON
            </button>
          </div>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Progress</span>
          <span>75%</span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `75%` }}
          />
        </div>
      </div>
    </div>
  );
}
