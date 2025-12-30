import { Search } from "lucide-react";
import { useEffect, useRef, useState, useMemo } from "react";

import { MonitoringTable } from "../../services/types/Monitoring.types";
import Skeleton from "../main/Skleton";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const tableScrollRef = useRef<HTMLDivElement | null>(null);
  const [maxHeightStyle, setMaxHeightStyle] = useState<
    React.CSSProperties | undefined
  >(undefined);
  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState<keyof MonitoringTable | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  function toggleSort(key: keyof MonitoringTable) {
    if (sortBy === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      console.debug("[SearchTableBar] toggled sort", { key, sortBy, sortDir });
    } else {
      setSortBy(key);
      setSortDir("asc");
      console.debug("[SearchTableBar] set sort", { key });
    }
  }

  const displayedData = useMemo(() => {
    if (!sortBy) return tableData;
    const arr = [...tableData];
    arr.sort((a, b) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const va = (a as any)[sortBy];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const vb = (b as any)[sortBy];

      const na = Number(va);
      const nb = Number(vb);

      let cmp = 0;
      if (!Number.isNaN(na) && !Number.isNaN(nb)) {
        cmp = na - nb;
      } else {
        const sa = (va ?? "").toString();
        const sb = (vb ?? "").toString();
        cmp = sa.localeCompare(sb, undefined, { sensitivity: "base" });
      }

      return sortDir === "asc" ? cmp : -cmp;
    });
    return arr;
  }, [tableData, sortBy, sortDir]);

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
                  <th
                    aria-sort={
                      sortBy === "tableName"
                        ? sortDir === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                    className="px-4 py-3 font-medium w-[40%]"
                  >
                    <button
                      type="button"
                      className="flex items-center gap-2"
                      onClick={() => toggleSort("tableName")}
                    >
                      Table Name{" "}
                      {sortBy === "tableName"
                        ? sortDir === "asc"
                          ? "▲"
                          : "▼"
                        : ""}
                    </button>
                  </th>

                  <th
                    aria-sort={
                      sortBy === "lastRunEtl"
                        ? sortDir === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                    className="px-4 py-3 font-medium w-[30%]"
                  >
                    <button
                      type="button"
                      className="flex items-center gap-2"
                      onClick={() => toggleSort("lastRunEtl")}
                    >
                      Last Run Count ETL{" "}
                      {sortBy === "lastRunEtl"
                        ? sortDir === "asc"
                          ? "▲"
                          : "▼"
                        : ""}
                    </button>
                  </th>

                  <th
                    aria-sort={
                      sortBy === "lastUpdateData"
                        ? sortDir === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                    className="px-4 py-3 font-medium w-[20%]"
                  >
                    <button
                      type="button"
                      className="flex items-center gap-2"
                      onClick={() => toggleSort("lastUpdateData")}
                    >
                      Last Update Data{" "}
                      {sortBy === "lastUpdateData"
                        ? sortDir === "asc"
                          ? "▲"
                          : "▼"
                        : ""}
                    </button>
                  </th>

                  <th
                    aria-sort={
                      sortBy === "CodeSource"
                        ? sortDir === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                    className="px-4 py-3 font-medium w-[20%]"
                  >
                    <button
                      type="button"
                      className="flex items-center gap-2"
                      onClick={() => toggleSort("CodeSource")}
                    >
                      Code Source{" "}
                      {sortBy === "CodeSource"
                        ? sortDir === "asc"
                          ? "▲"
                          : "▼"
                        : ""}
                    </button>
                  </th>

                  <th
                    aria-sort={
                      sortBy === "DbSource"
                        ? sortDir === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                    className="px-4 py-3 font-medium w-[20%]"
                  >
                    <button
                      type="button"
                      className="flex items-center gap-2"
                      onClick={() => toggleSort("DbSource")}
                    >
                      DB Source{" "}
                      {sortBy === "DbSource"
                        ? sortDir === "asc"
                          ? "▲"
                          : "▼"
                        : ""}
                    </button>
                  </th>

                  <th
                    aria-sort={
                      sortBy === "DbTarget"
                        ? sortDir === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                    className="px-4 py-3 font-medium w-[20%]"
                  >
                    <button
                      type="button"
                      className="flex items-center gap-2"
                      onClick={() => toggleSort("DbTarget")}
                    >
                      DB Target{" "}
                      {sortBy === "DbTarget"
                        ? sortDir === "asc"
                          ? "▲"
                          : "▼"
                        : ""}
                    </button>
                  </th>

                  <th
                    aria-sort={
                      sortBy === "RecordSource"
                        ? sortDir === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                    className="px-4 py-3 font-medium w-[20%]"
                  >
                    <button
                      type="button"
                      className="flex items-center gap-2"
                      onClick={() => toggleSort("RecordSource")}
                    >
                      Record in Source{" "}
                      {sortBy === "RecordSource"
                        ? sortDir === "asc"
                          ? "▲"
                          : "▼"
                        : ""}
                    </button>
                  </th>

                  <th
                    aria-sort={
                      sortBy === "RecordDwh"
                        ? sortDir === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                    className="px-4 py-3 font-medium w-[20%]"
                  >
                    <button
                      type="button"
                      className="flex items-center gap-2"
                      onClick={() => toggleSort("RecordDwh")}
                    >
                      Record in DWH{" "}
                      {sortBy === "RecordDwh"
                        ? sortDir === "asc"
                          ? "▲"
                          : "▼"
                        : ""}
                    </button>
                  </th>

                  <th
                    aria-sort={
                      sortBy === "TotalDiffRecord"
                        ? sortDir === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                    className="px-4 py-3 font-medium w-[20%]"
                  >
                    <button
                      type="button"
                      className="flex items-center gap-2"
                      onClick={() => toggleSort("TotalDiffRecord")}
                    >
                      Total Different{" "}
                      {sortBy === "TotalDiffRecord"
                        ? sortDir === "asc"
                          ? "▲"
                          : "▼"
                        : ""}
                    </button>
                  </th>

                  <th
                    aria-sort={
                      sortBy === "status"
                        ? sortDir === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                    className="px-4 py-3 font-medium w-[20%]"
                  >
                    <button
                      type="button"
                      className="flex items-center gap-2"
                      onClick={() => toggleSort("status")}
                    >
                      Status{" "}
                      {sortBy === "status"
                        ? sortDir === "asc"
                          ? "▲"
                          : "▼"
                        : ""}
                    </button>
                  </th>
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
                  : displayedData.map((row, i) => (
                      <tr
                        key={i}
                        className={`h-12 cursor-pointer ${
                          darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                        }`}
                        onClick={() => navigate(`/monitoring/${row.tableName}`)}
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
