import { PencilIcon, Trash, Database, ArrowRight } from "lucide-react";

interface MonitoringConfigurationCardProps {
  darkMode: boolean;
}

export default function MonitoringConfigurationCard({
  darkMode,
}: MonitoringConfigurationCardProps) {
  const getLayerColor = (layer: string) => {
    switch (`${layer}_${darkMode}`) {
      case "bronze_true":
        return "bg-amber-400 text-amber-50";
      case "silver_true":
        return "bg-slate-400 text-slate-50";
      case "gold_true":
        return "bg-yellow-400 text-yellow-50";
      case "bronze_false":
        return "bg-amber-300 text-amber-700";
      case "silver_false":
        return "bg-slate-300 text-slate-700";
      case "gold_false":
        return "bg-yellow-300 text-yellow-700";
      default:
        return "bg-blue-500 text-gray-200";
    }
  };

  const getLayerLetter = (layer: string) => {
    return layer.charAt(0).toUpperCase();
  };

  const getSourceLabel = (layer: string) => {
    switch (layer.toLowerCase()) {
      case "silver":
        return "Bronze Sources";
      case "gold":
        return "Silver & Bronze Sources";
      default:
        return "Sources";
    }
  };

  const selectedConfig = {
    name: "Sample Configuration",
    database: "postgres_db",
    layer: "bronze",
    sources: ["bronze_raw_data", "bronze_events"],
    schema: "public",
    targetTable: "target_table",
    dateColumn: "created_at",
    dataSource: "s3://bucket/path",
    withDetail: true,
  };

  return (
    <div
      className={`w-full bg-card rounded-xl border border-border overflow-hidden flex flex-col ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      {/* Header */}
      <div
        className={`p-4 border-b ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className={`w-10 h-10 rounded-lg ${getLayerColor(selectedConfig.layer)} flex items-center justify-center font-bold`}
          >
            {getLayerLetter(selectedConfig.layer)}
          </div>
          <div className="flex-1">
            <h3
              className={`font-semibold text-sm ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {selectedConfig.name}
            </h3>
            <p
              className={`text-xs ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              DB: {selectedConfig.database}
            </p>
          </div>
          <div className="flex gap-1">
            <button
              type="button"
              className={`p-2 rounded-md transition-colors ${
                darkMode
                  ? "text-yellow-400 hover:bg-yellow-500/10"
                  : "text-yellow-600 hover:bg-yellow-50"
              }`}
              title="Update"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              className={`p-2 rounded-md transition-colors ${
                darkMode
                  ? "text-red-400 hover:bg-red-500/10"
                  : "text-red-600 hover:bg-red-50"
              }`}
              title="Delete"
            >
              <Trash className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1 rounded-md text-xs font-medium capitalize ${
              selectedConfig.layer === "bronze"
                ? "bg-amber-100 text-amber-700"
                : selectedConfig.layer === "silver"
                  ? "bg-slate-100 text-slate-700"
                  : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {selectedConfig.layer} Layer
          </span>
        </div>
      </div>

      {/* Configuration Details */}
      <div className="flex-1 overflow-y-auto p-4">
        {selectedConfig.layer === "bronze" ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Database
              className={`w-12 h-12 mb-3 ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}
            />
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Bronze layer is the source layer
            </p>
            <p
              className={`text-xs mt-1 ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Raw data ingestion point
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-4">
              <ArrowRight
                className={`w-4 h-4 ${
                  darkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <h4
                className={`text-sm font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {getSourceLabel(selectedConfig.layer)}
              </h4>
            </div>
            <div className="space-y-2">
              {selectedConfig.sources.map((source, index) => {
                const isSilver =
                  source.startsWith("silver") ||
                  source.startsWith("stg_silver");
                const isBronze =
                  source.startsWith("bronze") ||
                  source.startsWith("stg_bronze");

                return (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      darkMode
                        ? "bg-gray-700/50 hover:bg-gray-700"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold ${
                        isSilver
                          ? "bg-slate-500"
                          : isBronze
                            ? "bg-amber-500"
                            : "bg-blue-500"
                      }`}
                    >
                      {isSilver ? "S" : isBronze ? "B" : "T"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm truncate ${
                          darkMode ? "text-gray-300" : "text-gray-900"
                        }`}
                      >
                        {source}
                      </p>
                      <p
                        className={`text-xs capitalize ${
                          darkMode ? "text-gray-500" : "text-gray-500"
                        }`}
                      >
                        {isSilver
                          ? "Silver Layer"
                          : isBronze
                            ? "Bronze Layer"
                            : "Table"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Configuration Details */}
            <div className="mt-6 space-y-3">
              <div
                className={`p-3 rounded-lg border border-dashed ${
                  darkMode ? "border-gray-600" : "border-gray-300"
                }`}
              >
                <h5
                  className={`text-xs font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Configuration Details
                </h5>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span
                      className={darkMode ? "text-gray-400" : "text-gray-500"}
                    >
                      Schema:
                    </span>
                    <span
                      className={darkMode ? "text-gray-300" : "text-gray-900"}
                    >
                      {selectedConfig.schema}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={darkMode ? "text-gray-400" : "text-gray-500"}
                    >
                      Target Table:
                    </span>
                    <span
                      className={darkMode ? "text-gray-300" : "text-gray-900"}
                    >
                      {selectedConfig.targetTable}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={darkMode ? "text-gray-400" : "text-gray-500"}
                    >
                      Date Column:
                    </span>
                    <span
                      className={darkMode ? "text-gray-300" : "text-gray-900"}
                    >
                      {selectedConfig.dateColumn}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={darkMode ? "text-gray-400" : "text-gray-500"}
                    >
                      Data Source:
                    </span>
                    <span
                      className={`truncate max-w-32 ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                    >
                      {selectedConfig.dataSource}
                    </span>
                  </div>
                </div>
              </div>

              {/* With Detail Toggle */}
              <div
                className={`p-3 rounded-lg border border-dashed ${
                  darkMode ? "border-gray-600" : "border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-medium ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    With Detail
                  </span>
                  <div className="flex items-center">
                    <input
                      id="withDetail"
                      type="checkbox"
                      className={`h-4 w-4 rounded border-gray-300 ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                      checked={selectedConfig.withDetail}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
