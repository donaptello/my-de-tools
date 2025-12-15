import { useEffect, useRef, useState } from "react";
import { ConnectionData } from "../../services/types/Connections.types";
import { Search, Plus } from "lucide-react";

interface Props {
  connections: ConnectionData[];
  selectedId?: string;
  onSelect: (conn: ConnectionData) => void;
  onAdd?: () => void;
  darkMode: boolean;
}

export default function ConnectionList({
  connections,
  selectedId,
  onSelect,
  onAdd,
  darkMode,
}: Props) {
  const tableScrollRef = useRef<HTMLDivElement | null>(null);
  const [maxHeightStyle, setMaxHeightStyle] = useState<
    React.CSSProperties | undefined
  >(undefined);
  

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
      className={`rounded-xl p-3 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }  border border-transparent rounded-xl shadow-lg p-5 transition hover:shadow-2xl hover:-translate-y-1`}
    >
      <div
        className={`border-b p-4 ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="flex items-center gap-3 justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Search className="h-5 w-5 text-blue-600" />
            </div>

            <input
              type="text"
              placeholder="Search Connection ..."
              className={`flex-1 rounded-lg px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 ${
                darkMode
                  ? "text-gray-200 bg-gray-700 border border-gray-600 focus:border-blue-400 focus:ring-blue-900"
                  : "text-gray-700 bg-white border border-gray-200 focus:border-blue-500 focus:ring-blue-100"
              }`}
            />
          </div>

          <div className="ml-3 hidden sm:flex">
            <button
              type="button"
              onClick={() => (typeof onAdd === "function" ? onAdd() : console.warn("onAdd not provided"))}
              className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-400"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100 focus:ring-blue-200"
              }`}
            >
              <Plus className="h-4 w-4" />
              Add connection
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
        {connections.map((conn) => {
          const initials = conn.name
            .split(" ")
            .map((s) => s[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();

          function handleKeyDown(e: React.KeyboardEvent) {
            if (e.key === "Enter" || e.key === " ") onSelect(conn);
          }

          const isSelected = selectedId === conn.id;

          return (
            <div
              key={conn.id}
              role="listitem"
              tabIndex={0}
              aria-selected={isSelected}
              onKeyDown={handleKeyDown}
              onClick={() => onSelect(conn)}
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
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md font-medium ${
                  darkMode
                    ? "bg-blue-400 text-gray-200"
                    : "bg-blue-50 text-blue-600"
                }`}
              >
                {initials}
              </div>

              <div className="flex-1 min-w-0">
                <div
                  className={`text-sm font-semibold ${
                    darkMode ? "text-gray-100" : "text-gray-800"
                  }`}
                >
                  {conn.name}
                </div>
                <div
                  className={`text-xs truncate ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {conn.type}
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

      <div className="sm:hidden">
        <button
          aria-label="Add connection"
          onClick={() => (typeof onAdd === "function" ? onAdd() : console.warn("onAdd not provided"))}
          className="fixed bottom-6 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
