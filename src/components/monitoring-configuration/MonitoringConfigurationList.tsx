import { useEffect, useRef, useState } from "react";
import { Search, Plus } from "lucide-react";
import Skeleton from "../main/Skleton";
import { MonitoringConfigurationData } from "../../services/types/MonitoringConfigurations.types";

interface Props {
  monitorings: MonitoringConfigurationData[] | undefined;
  selectedId?: number;
  onSelect: (conn: MonitoringConfigurationData) => void;
  onAdd?: () => void;
  darkMode: boolean;
  loading: boolean;
  setQuery?: (value: string) => void;
}

export default function MonitoringConfigurationList({
  monitorings,
  selectedId,
  onSelect,
  onAdd,
  darkMode,
  loading,
  setQuery,
}: Props) {
  const tableScrollRef = useRef<HTMLDivElement | null>(null);
  const [search, setSearch] = useState("");
  const [maxHeightStyle, setMaxHeightStyle] = useState<
    React.CSSProperties | undefined
  >(undefined);

  const [filters, setFilters] = useState({
    layer: "",
    flag: "",
  });

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

  useEffect(() => {
    function updateMaxHeight() {
      const top = tableScrollRef.current?.getBoundingClientRect().top ?? 0;
      const viewportHeight = window.innerHeight;
      const reserved = 90;
      const available = Math.max(250, viewportHeight - top - reserved);
      setMaxHeightStyle({ maxHeight: `${available}px` });
    }

    updateMaxHeight();
    window.addEventListener("resize", updateMaxHeight);
    return () => window.removeEventListener("resize", updateMaxHeight);
  }, []);

  const filteredMonitorings = monitorings?.filter((item) => {
    if (filters.layer && item.layer !== filters.layer) return false;
    if (filters.flag && item.flag !== filters.flag) return false;
    return true;
  });

  return (
    <div
      className={`rounded-xl p-3 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }  border border-transparent h-full rounded-xl shadow-sm p-5 transition hover:shadow-2xl hover:-translate-y-1`}
    >
      <div
        className={`border-b p-4 ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Search className="h-5 w-5 text-blue-600" />
              </div>

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearch(value);
                  setQuery?.(value);
                }}
                placeholder="Search Connection ..."
                className={`flex-1 rounded-lg px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "text-gray-200 bg-gray-700 border border-gray-600 focus:border-blue-400 focus:ring-blue-900"
                    : "text-gray-700 bg-white border border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                }`}
              />
            </div>

            <select
              value={filters.layer}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, layer: e.target.value }))
              }
              className={`rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 border ${
                darkMode
                  ? "text-gray-200 bg-gray-700 border-gray-600 focus:border-blue-400 focus:ring-blue-900"
                  : "text-gray-700 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-100"
              }`}
            >
              <option value="all-layer">All Layers</option>
              <option value="bronze">Bronze</option>
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
            </select>

            <select
              value={filters.flag}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, flag: e.target.value }))
              }
              className={`rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 border ${
                darkMode
                  ? "text-gray-200 bg-gray-700 border-gray-600 focus:border-blue-400 focus:ring-blue-900"
                  : "text-gray-700 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-100"
              }`}
            >
              <option selected value="source">
                Source
              </option>
              <option value="target">Target</option>
            </select>

            <button
              type="button"
              onClick={() =>
                typeof onAdd === "function"
                  ? onAdd()
                  : console.warn("onAdd not provided")
              }
              className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-400"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100 focus:ring-blue-200"
              }`}
            >
              <Plus className="h-4 w-4" />
              Add Table
            </button>
          </div>
        </div>
      </div>

      <div
        ref={tableScrollRef}
        className="overflow-y-auto space-y-2 p-2"
        style={maxHeightStyle}
        role="list"
        aria-label="Connections"
      >
        {loading
          ? Array.from({ length: 10 }).map((_, index) => {
              return (
                <div
                  key={index}
                  role="listitem"
                  tabIndex={0}
                  aria-selected={false}
                  onKeyDown={undefined}
                  onClick={undefined}
                  className={`flex items-center gap-4 p-3 rounded-lg transition-shadow duration-150 focus:outline-none focus:ring-2 border-b last:border-b-0 ${
                    darkMode ? "border-gray-100/60" : "border-gray-800/30"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md font-medium ${
                      darkMode
                        ? "bg-blue-400 text-gray-200"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    <Skeleton />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-sm w-2xl font-semibold ${
                        darkMode ? "text-gray-100" : "text-gray-800"
                      }`}
                    >
                      <Skeleton />
                    </div>
                    <div
                      className={`mt-1 text-xs truncate ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      <Skeleton />
                    </div>
                  </div>

                  <div className="ml-2 shrink-0 text-xs">
                    <Skeleton />
                  </div>
                </div>
              );
            })
          : filteredMonitorings?.map((data) => {
              const initials = data.layer.charAt(0).toUpperCase();

              function handleKeyDown(e: React.KeyboardEvent) {
                if (e.key === "Enter" || e.key === " ") onSelect(data);
              }

              const isSelected = selectedId === data.id;

              return (
                <div
                  key={data.id}
                  role="listitem"
                  tabIndex={0}
                  aria-selected={isSelected}
                  onKeyDown={handleKeyDown}
                  onClick={() => onSelect(data)}
                  className={`flex items-center gap-4 p-3 rounded-lg transition-shadow duration-150 focus:outline-none focus:ring-2 border-b last:border-b-0 ${
                    darkMode ? "border-gray-100/60" : "border-gray-800/30"
                  } ${
                    isSelected
                      ? "ring-2 ring-blue-300 bg-blue-50 dark:bg-blue-900/30"
                      : darkMode
                        ? "hover:bg-gray-800"
                        : "hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md font-medium ${getLayerColor(data.layer)}`}
                  >
                    {initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-sm font-semibold ${
                        darkMode ? "text-gray-100" : "text-gray-800"
                      }`}
                    >
                      {`${data.schemas}.${data.tableNameSource}`}
                    </div>
                    <div
                      className={`text-xs truncate ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {`DB: ${data.dbTarget}`}
                    </div>
                  </div>

                  <div className="ml-2 shrink-0 text-xs">
                    {isSelected ? (
                      <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">
                        Selected
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
