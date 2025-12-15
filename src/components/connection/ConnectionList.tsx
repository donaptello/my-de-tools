import { useEffect, useRef, useState } from "react";
import { ConnectionData } from "../../services/types/Connections.types";

interface Props {
  connections: ConnectionData[];
  selectedId?: string;
  onSelect: (conn: ConnectionData) => void;
  darkMode: boolean;
}

export default function ConnectionList({
  connections,
  selectedId,
  onSelect,
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
        darkMode ? "bg-gray-900" : "bg-white"
      } shadow-sm border border-transparent`}
    >
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
              className={`flex items-center gap-4 p-3 rounded-lg transition-shadow duration-150 focus:outline-none focus:ring-2 border-b last:border-b-0 border-gray-100/60 dark:border-gray-800/30 ${
                  isSelected
                    ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/30"
                    : darkMode
                    ? "hover:bg-gray-800"
                    : "hover:bg-gray-50"
                }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md font-medium ${
                  darkMode ? "bg-gray-800 text-gray-200" : "bg-blue-50 text-blue-600"
                }`}
              >
                {initials}
              </div>

              <div className="flex-1 min-w-0">
                <div className={`text-sm font-semibold ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
                  {conn.name}
                </div>
                <div className={`text-xs truncate ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {conn.type}
                </div>
              </div>

              <div className="ml-2 shrink-0 text-xs">
                {isSelected ? (
                  <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-xs">Selected</span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
