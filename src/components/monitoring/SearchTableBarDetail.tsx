import { Search } from "lucide-react";
import { useEffect, useRef, useState, useMemo } from "react";

import { MonitoringTableDetail } from "../../services/types/Monitoring.types";
import Skeleton from "../main/Skleton";

type SearchTableCardProps = {
  darkMode: boolean;
  tableData?: MonitoringTableDetail[];
  setQueryTableData?: (value: string) => void;
  loading: boolean;
};

export default function SearchTableDetailCard({
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

  const [sortBy, setSortBy] = useState<keyof MonitoringTableDetail | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  function toggleSort(key: keyof MonitoringTableDetail) {
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
      const available = Math.max(800, viewportHeight - top - reserved);
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

                  <th aria-sort={sortBy === "lastrun" ? (sortDir === "asc" ? "ascending" : "descending") : "none"} className="px-4 py-3 font-medium w-[30%]">
                    <button type="button" className="flex items-center gap-2" onClick={() => toggleSort("lastrun")}>Last Run Count ETL {sortBy === "lastrun" ? (sortDir === "asc" ? "▲" : "▼") : ""}</button>
                  </th>

                  <th aria-sort={sortBy === "date" ? (sortDir === "asc" ? "ascending" : "descending") : "none"} className="px-4 py-3 font-medium w-[20%]">
                    <button type="button" className="flex items-center gap-2" onClick={() => toggleSort("date")}>Last Update Data {sortBy === "date" ? (sortDir === "asc" ? "▲" : "▼") : ""}</button>
                  </th>

                  <th aria-sort={sortBy === "dataSource" ? (sortDir === "asc" ? "ascending" : "descending") : "none"} className="px-4 py-3 font-medium w-[20%]">
                    <button type="button" className="flex items-center gap-2" onClick={() => toggleSort("dataSource")}>Code Source {sortBy === "dataSource" ? (sortDir === "asc" ? "▲" : "▼") : ""}</button>
                  </th>

                  <th aria-sort={sortBy === "source" ? (sortDir === "asc" ? "ascending" : "descending") : "none"} className="px-4 py-3 font-medium w-[20%]">
                    <button type="button" className="flex items-center gap-2" onClick={() => toggleSort("source")}>DB Source {sortBy === "source" ? (sortDir === "asc" ? "▲" : "▼") : ""}</button>
                  </th>

                  <th aria-sort={sortBy === "target" ? (sortDir === "asc" ? "ascending" : "descending") : "none"} className="px-4 py-3 font-medium w-[20%]">
                    <button type="button" className="flex items-center gap-2" onClick={() => toggleSort("target")}>DB Target {sortBy === "target" ? (sortDir === "asc" ? "▲" : "▼") : ""}</button>
                  </th>

                  <th aria-sort={sortBy === "totalInSource" ? (sortDir === "asc" ? "ascending" : "descending") : "none"} className="px-4 py-3 font-medium w-[20%]">
                    <button type="button" className="flex items-center gap-2" onClick={() => toggleSort("totalInSource")}>Record in Source {sortBy === "totalInSource" ? (sortDir === "asc" ? "▲" : "▼") : ""}</button>
                  </th>

                  <th aria-sort={sortBy === "totalInTarget" ? (sortDir === "asc" ? "ascending" : "descending") : "none"} className="px-4 py-3 font-medium w-[20%]">
                    <button type="button" className="flex items-center gap-2" onClick={() => toggleSort("totalInTarget")}>Record in DWH {sortBy === "totalInTarget" ? (sortDir === "asc" ? "▲" : "▼") : ""}</button>
                  </th>

                  <th aria-sort={sortBy === "diff" ? (sortDir === "asc" ? "ascending" : "descending") : "none"} className="px-4 py-3 font-medium w-[20%]">
                    <button type="button" className="flex items-center gap-2" onClick={() => toggleSort("diff")}>Total Different {sortBy === "diff" ? (sortDir === "asc" ? "▲" : "▼") : ""}</button>
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
                        className={`h-12 ${
                          darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                        }`}
                      >
                        <td
                          className={`px-4 overflow-hidden truncate ${
                            darkMode ? "text-gray-100" : "text-gray-700"
                          }`}
                        >
                          {row.lastrun}
                        </td>
                        <td
                          className={`px-4 overflow-hidden truncate ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {row.date}
                        </td>
                        <td
                          className={`px-4 overflow-hidden truncate ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {row.dataSource}
                        </td>
                        <td
                          className={`px-4 overflow-hidden truncate ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {row.tableName}
                        </td>
                        <td
                          className={`px-4 overflow-hidden truncate ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {row.source}
                        </td>
                        <td
                          className={`px-4 overflow-hidden truncate ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {row.totalInSource}
                        </td>
                        <td
                          className={`px-4 overflow-hidden truncate ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {row.totalInTarget}
                        </td>
                        <td
                          className={`px-4 overflow-hidden truncate ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {row.diff}
                        </td>
                        <td
                          className={`px-4 overflow-hidden truncate ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {row.diff}
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
