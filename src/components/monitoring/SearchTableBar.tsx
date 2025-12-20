import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { MonitoringTable } from "../../services/types/Monitoring.types";
import Skeleton from "../main/Skleton";

type SearchTableCardProps = {
  darkMode: boolean;
  tableData?: MonitoringTable[];
  setQueryTableData?: (value: string) => void;
  loading: boolean;
};

function colorTags(darkMode: boolean, status: string): string {
  if (status === "Completed") {
    return darkMode
      ? "bg-green-900 text-green-300"
      : "bg-green-100 text-green-700";
  } else if (status === "InCompleted") {
    return darkMode
      ? "bg-yellow-900 text-yellow-300"
      : "bg-yellow-100 text-yellow-700";
  } else {
    return darkMode ? "bg-red-900 text-red-300" : "bg-red-100 text-red-700";
  }
}

export default function SearchTableCard({
  darkMode,
  tableData = [],
  loading,
  setQueryTableData,
}: SearchTableCardProps) {
  const tableScrollRef = useRef<HTMLDivElement | null>(null);
  const [maxHeightStyle, setMaxHeightStyle] = useState<
    React.CSSProperties | undefined
  >(undefined);
  const [search, setSearch] = useState("");

  useEffect(() => {
    function updateMaxHeight() {
      const top = tableScrollRef.current?.getBoundingClientRect().top ?? 0;
      const viewportHeight = window.innerHeight;
      const reserved = 90;
      const available = Math.max(200, viewportHeight - top - reserved);
      setMaxHeightStyle({ maxHeight: `${available}px` });
    }

    updateMaxHeight();
    window.addEventListener("resize", updateMaxHeight);
    return () => window.removeEventListener("resize", updateMaxHeight);
  }, []);
  return (
    <div
      className={`flex-1 min-h-0 flex flex-col rounded-2xl ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } shadow-sm transition hover:shadow-2xl hover:-translate-y-1`}
    >
      {/* SEARCH BAR */}
      <div
        className={`border-b p-4 ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <Search className="h-5 w-5 text-blue-600" />
          </div>

          <input
            type="text"
            placeholder="Search table..."
            value={search}
            onChange={(e) => {
              const v = e.target.value;
              setSearch(v);
              setQueryTableData?.(v);
            }}
            className={`flex-1 rounded-lg px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 ${
              darkMode
                ? "text-gray-200 bg-gray-700 border border-gray-600 focus:border-blue-400 focus:ring-blue-900"
                : "text-gray-700 bg-white border border-gray-200 focus:border-blue-500 focus:ring-blue-100"
            }`}
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="flex-1 min-h-0">
        <div className="overflow-x-auto min-w-0">
          <div
            ref={tableScrollRef}
            className="overflow-y-auto"
            style={maxHeightStyle}
          >
            <table className="w-full text-sm table-fixed">
              <thead
                className={`sticky top-0 ${
                  darkMode
                    ? "text-white bg-gray-900"
                    : "text-gray-500 bg-gray-100"
                } z-10 text-left `}
              >
                <tr>
                  <th className="px-4 py-3 font-medium w-[40%]">Table Name</th>
                  <th className="px-4 py-3 font-medium w-[30%]">
                    Last Run Count ETL
                  </th>
                  <th className="px-4 py-3 font-medium w-[20%]">
                    Last Update Data
                  </th>
                  <th className="px-4 py-3 font-medium w-[20%]">Code Source</th>
                  <th className="px-4 py-3 font-medium w-[20%]">DB Source</th>
                  <th className="px-4 py-3 font-medium w-[20%]">DB Target</th>
                  <th className="px-4 py-3 font-medium w-[20%]">
                    Record in Source
                  </th>
                  <th className="px-4 py-3 font-medium w-[20%]">
                    Record in DWH
                  </th>
                  <th className="px-4 py-3 font-medium w-[20%]">
                    Total Different
                  </th>
                  <th className="px-4 py-3 font-medium w-[20%]">Status</th>
                </tr>
              </thead>

              <tbody
                className={`divide-y ${
                  darkMode ? "divide-gray-700" : "divide-gray-300"
                }`}
              >
                {loading
                  ? Array.from({ length: 10 }).map((_, index) => (
                      <tr
                        key={index}
                        className={`h-12 ${
                          darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                        }`}
                      >
                        <td
                          className={`px-4 overflow-hidden truncate ${
                            darkMode ? "text-gray-100" : "text-gray-700"
                          }`}
                        >
                          <Skeleton />
                        </td>
                        <td
                          className={`px-4 overflow-hidden truncate ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <Skeleton />
                        </td>
                        <td
                          className={`px-4 overflow-hidden truncate ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <Skeleton />
                        </td>
                        <td
                          className={`px-4 overflow-hidden truncate ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <Skeleton />
                        </td>
                        <td
                          className={`px-4 overflow-hidden truncate ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <Skeleton />
                        </td>
                        <td
                          className={`px-4 overflow-hidden truncate ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <Skeleton />
                        </td>
                        <td
                          className={`px-4 overflow-hidden truncate ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <Skeleton />
                        </td>
                        <td
                          className={`px-4 overflow-hidden truncate ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <Skeleton />
                        </td>
                        <td
                          className={`px-4 overflow-hidden truncate ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <Skeleton />
                        </td>
                        <td className="px-4 py-3">
                          <Skeleton />
                        </td>
                      </tr>
                    ))
                  : tableData.map((row, i) => (
                      <tr
                        key={i}
                        className={`h-12 ${
                          darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                        }`}
                      >
                        <td
                          className={`px-4 overflow-hidden truncate ${
                            darkMode ? "text-gray-100" : "text-gray-700"
                          }`}
                        >
                          {row.tableName}
                        </td>
                        <td
                          className={`px-4 overflow-hidden truncate ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {row.lastRunEtl}
                        </td>
                        <td
                          className={`px-4 overflow-hidden truncate ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {row.lastUpdateData}
                        </td>
                        <td
                          className={`px-4 overflow-hidden truncate ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {row.CodeSource}
                        </td>
                        <td
                          className={`px-4 overflow-hidden truncate ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {row.DbSource}
                        </td>
                        <td
                          className={`px-4 overflow-hidden truncate ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {row.DbTarget}
                        </td>
                        <td
                          className={`px-4 overflow-hidden truncate ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {row.RecordSource}
                        </td>
                        <td
                          className={`px-4 overflow-hidden truncate ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {row.RecordDwh}
                        </td>
                        <td
                          className={`px-4 overflow-hidden truncate ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {row.TotalDiffRecord}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-medium ${colorTags(
                              darkMode,
                              row.status
                            )}`}
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
