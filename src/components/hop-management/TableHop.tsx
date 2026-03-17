import { useState } from "react";
import { HopOrchestration } from "../../services/types/HopManagement.types";
import { Activity, AlertTriangle, Clock, GitBranch } from "lucide-react";

type TableHopProps = {
  darkMode: boolean;
  data: HopOrchestration[] | undefined;
  title: string;
  icon: React.ReactNode;
};

export default function TableHop({ darkMode, data, title, icon }: TableHopProps) {
  const [withError, setWithError] = useState(true);

  return (
    <div
      className={`rounded-xl border shadow-sm p-6 ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="font-semibold text-lg">{title}</h2>

          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            {data?.length}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">With Error</span>
            <button
              onClick={() => setWithError(!withError)}
              className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
                withError ? "bg-gray-300" : "bg-gray-200"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
                  withError ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Button */}
          <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm">
            <AlertTriangle size={16} />
            Clear Log
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 text-left border-b">
              <th className="py-3">Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Duration</th>
              <th>Timestamp</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((item, i) => (
              <tr
                key={i}
                className="border-b last:border-none hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                {/* Name */}
                <td className="py-4 font-medium">{item.name}</td>

                {/* Type */}
                <td>
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-700 w-fit">
                    {item.type === "Pipeline" ? (
                      <Activity size={14} />
                    ) : (
                      <GitBranch size={14} />
                    )}
                    {item.type}
                  </span>
                </td>

                {/* Status */}
                <td>
                  <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600">
                    Error
                  </span>
                </td>

                {/* Duration */}
                <td className="flex items-center gap-1 text-gray-500">
                  <Clock size={14} />
                  {item.duration}
                </td>

                {/* Timestamp */}
                <td className="text-gray-500">{item.startDate}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
