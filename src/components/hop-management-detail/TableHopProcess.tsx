import { Box, Hash } from "lucide-react";
import { HopTransformationDetails } from "../../services/types/HopManagement.types";
import { formatDate } from "../../helpers/time";

type TableHopProcessProps = {
  darkMode: boolean;
  loading: boolean;
  transformDetail: HopTransformationDetails[] | undefined;
  updatedAt: string | undefined;
};

export default function TableHopProcess({
  darkMode,
  loading,
  transformDetail,
  updatedAt
}: TableHopProcessProps) {
  
  const formatter = new Intl.NumberFormat("de-DE");
  const getBgStatus = (status: string) => {
    switch (status) {
      case "Stopped":
        return "bg-red-500 text-white hover:bg-red-400";
      case "Finished":
        return "bg-blue-500 text-white hover:bg-blue-400";
      default:
        return "bg-green-500 text-white hover:bg-red-400";
    }
  };

  const hasTransformDetails = Array.isArray(transformDetail) && transformDetail.length > 0;

  return (
    <div
      className={`flex-1 rounded-xl border shadow-sm ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      {/* HEADER */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Hash size={16} className="text-gray-500" />
          <h2 className="font-medium text-base">Transform Detail</h2>
        </div>

        <div className="flex flex-col items-end gap-1">
          <p className="text-xs text-gray-400">
            Updated: {updatedAt !== undefined ? formatDate(updatedAt, "HH.mm.ss") : "21.09.50"}
          </p>
          {loading && (
            <p className="text-xs text-blue-400">Refreshing...</p>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {/* HEADER */}
          <thead
            className={`text-left border-y ${
              darkMode ? "border-gray-700" : "border-gray-200 bg-gray-50"
            }`}
          >
            <tr className="text-gray-500 text-xs">
              <th className="px-6 py-3 font-medium text-blue-500">
                Transform Name
              </th>
              <th className="px-6 font-medium">CopyNr</th>
              <th className="px-6 font-medium">Read</th>
              <th className="px-6 font-medium">Written</th>
              <th className="px-6 font-medium">Input</th>
              <th className="px-6 font-medium">Output</th>
              <th className="px-6 font-medium">Updated</th>
              <th className="px-6 font-medium">Rejected</th>
              <th className="px-6 font-medium">Errors</th>
              <th className="px-6 font-medium">Status</th>
              <th className="px-6 font-medium">Time</th>
              <th className="px-6 font-medium">Speed</th>
              <th className="px-6 font-medium">Priority</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {hasTransformDetails ? (
              transformDetail.map((item, i) => (
                <tr
                  key={i}
                  className={`border-t ${
                    darkMode
                      ? "border-gray-700 hover:bg-gray-700"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-gray-500 text-xs">
                    {item.transformName}
                  </td>
                  <td className="px-6 text-gray-500 text-xs">{formatter.format(item.copy)}</td>
                  <td className="px-6 text-gray-500 text-xs">{formatter.format(item.linesRead)}</td>
                  <td className="px-6 text-gray-500 text-xs">{formatter.format(item.linesWritten)}</td>
                  <td className="px-6 text-gray-500 text-xs">{formatter.format(item.linesInput)}</td>
                  <td className="px-6 text-gray-500 text-xs">{formatter.format(item.linesOutput)}</td>
                  <td className="px-6 text-gray-500 text-xs">{formatter.format(item.linesUpdated)}</td>
                  <td className="px-6 text-gray-500 text-xs">{formatter.format(item.linesRejected)}</td>
                  <td className="px-6 text-gray-500 text-xs">{formatter.format(item.errors)}</td>
                  <td className="px-6 text-gray-500 text-xs">
                    <span
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${getBgStatus(
                        item.statusDescription
                      )}`}
                    >
                      {item.statusDescription}
                    </span>
                  </td>
                  <td className="px-6 text-gray-500 text-xs">{formatter.format(item.seconds)}s</td>
                  <td className="px-6 text-gray-500 text-xs">{item.speed}</td>
                  <td className="px-6 text-gray-500 text-xs">{item.priority}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={13} className="text-center p-4">
                  <div className="flex justify-center items-center gap-2">
                    <Box size={14} color="#999" />
                    <span className="text-gray-500">
                      No transformDetail found.
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
