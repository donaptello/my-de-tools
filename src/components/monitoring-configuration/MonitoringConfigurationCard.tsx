import { PencilIcon, Trash, Database, ArrowRight } from "lucide-react";
import { MonitoringConfigurationData } from "../../services/types/MonitoringConfigurations.types";

interface MonitoringConfigurationCardProps {
  monitoring: MonitoringConfigurationData | undefined;
  setShowDeleteConfirm: (value: boolean) => void;
  darkMode: boolean;
}

export default function MonitoringConfigurationCard({
  monitoring,
  setShowDeleteConfirm,
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
        return "Raw Sources";
    }
  };

  return (
    <div
      className={`h-full bg-card rounded-xl border border-border overflow-hidden flex flex-col shadow-sm p-5 transition hover:shadow-2xl hover:-translate-y-1 ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      {!monitoring ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Database
              className={`w-12 h-12 mx-auto mb-3 ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}
            />
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Select a monitoring configuration
            </p>
            <p
              className={`text-xs mt-1 ${
                darkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Choose a configuration to view details
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div
            className={`p-4 border-b ${
              darkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-lg ${getLayerColor(monitoring.layer)} flex items-center justify-center font-bold`}
              >
                {getLayerLetter(monitoring.layer)}
              </div>
              <div className="flex-1">
                <h3
                  className={`font-semibold text-sm ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {monitoring.tableNameSource}
                </h3>
                <p
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  DB: {monitoring.dbSource}
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
                  onClick={() => setShowDeleteConfirm(true)}
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
                  monitoring.layer === "bronze"
                    ? "bg-amber-100 text-amber-700"
                    : monitoring.layer === "silver"
                      ? "bg-slate-100 text-slate-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {monitoring.layer} Layer
              </span>
            </div>
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
                      {monitoring.schemas}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={darkMode ? "text-gray-400" : "text-gray-500"}
                    >
                      Location Database:
                    </span>
                    <span
                      className={darkMode ? "text-gray-300" : "text-gray-900"}
                    >
                      {monitoring.dbTarget}
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
                      {monitoring.columnDateName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={darkMode ? "text-gray-400" : "text-gray-500"}
                    >
                      Insert time:
                    </span>
                    <span
                      className={darkMode ? "text-gray-300" : "text-gray-900"}
                    >
                      {monitoring.insertTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span
                      className={darkMode ? "text-gray-400" : "text-gray-500"}
                    >
                      Data source label:
                    </span>
                    <span
                      className={darkMode ? "text-gray-300" : "text-gray-900"}
                    >
                      {monitoring.dataSource}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration Details */}
          <div className="flex-1 overflow-y-auto p-4">
            {monitoring.layer === "bronze" ? (
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
                    {getSourceLabel(monitoring.layer)}
                  </h4>
                </div>
                <div className="space-y-2">
                  {monitoring?.details.map((detail) => {
                    return (
                      <div
                        key={detail.id}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          darkMode
                            ? "bg-gray-700/50 hover:bg-gray-700"
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-md ${monitoring?.layer === "bronze" ? "bg-orange-700" : "bg-amber-500"} flex items-center justify-center text-white text-xs font-bold`}
                        >
                          {monitoring?.layer === "bronze" ? "R" : "B"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm truncate ${
                              darkMode ? "text-gray-300" : "text-gray-900"
                            }`}
                          >
                            {detail.schemas}.{detail.tableNameSource}
                          </p>
                          <p
                            className={`text-xs capitalize ${
                              darkMode ? "text-gray-500" : "text-gray-500"
                            }`}
                          >
                            DB: {detail.dbSource}
                          </p>
                          {detail.dataSource && (
                            <p
                              className={`text-xs capitalize ${
                                darkMode ? "text-gray-500" : "text-gray-500"
                              }`}
                            >
                              Data source label: {detail.dataSource}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
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
                    {getSourceLabel(monitoring.layer)}
                  </h4>
                </div>
                <div className="space-y-2">
                  {monitoring?.details.map((detail) => {
                    return (
                      <div
                        key={detail.id}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          darkMode
                            ? "bg-gray-700/50 hover:bg-gray-700"
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <div className="w-6 h-6 rounded-md bg-amber-500 flex items-center justify-center text-white text-xs font-bold">
                          B
                        </div>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm truncate ${
                              darkMode ? "text-gray-300" : "text-gray-900"
                            }`}
                          >
                            {detail.schemas}.{detail.tableNameSource}
                          </p>
                          <p
                            className={`text-xs capitalize ${
                              darkMode ? "text-gray-500" : "text-gray-500"
                            }`}
                          >
                            DB: {detail.dbSource}
                          </p>
                          {detail.dataSource && (
                            <p
                              className={`text-xs capitalize ${
                                darkMode ? "text-gray-500" : "text-gray-500"
                              }`}
                            >
                              Data source label: {detail.dataSource}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
