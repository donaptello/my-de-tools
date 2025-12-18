import { useState, useRef, useEffect } from "react";
import { ConnectionData } from "../../services/types/Connections.types";

interface Props {
  connections: ConnectionData[];
  tables: string[];
  schemas: string[];
  selectedTable: string;
  selectedConnection: string;
  selectedSchema: string;
  onSelectTable: (value: string) => void;
  onSelectConnection: (value: string) => void;
  onSelectSchema: (value: string) => void;
  darkMode: boolean;
}

export default function TableSelector({
  connections,
  tables,
  schemas,
  selectedTable,
  selectedConnection,
  selectedSchema,
  onSelectTable,
  onSelectConnection,
  onSelectSchema,
  darkMode,
}: Props) {
  const [open, setOpen] = useState(false);
  const [openConnection, setOpenConnection] = useState(false);
  const [openSchemas, setOpenSchemas] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setOpenConnection(false);
        setOpenSchemas(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setOpenConnection(false);
        setOpenSchemas(false);
      }
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`rounded-xl shadow-sm p-5 transition hover:shadow-2xl hover:-translate-y-1 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h3
        className={`text-lg font-semibold mb-3 ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        Select Connections
      </h3>

      <div className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={openConnection}
          onClick={() => setOpenConnection((s) => !s)}
          className={`w-full text-left flex items-center justify-between px-4 py-2 rounded border ${
            darkMode
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-gray-800 border-gray-200"
          }`}
        >
          <span className={`${selectedConnection ? "" : "text-gray-400"}`}>
            {selectedConnection || "-- Choose Connection --"}
          </span>
          <svg
            className={`w-5 h-5 ml-2 transition-transform ${
              openConnection ? "rotate-180" : "rotate-0"
            }`}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 8L10 12L14 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {openConnection && (
          <ul
            role="listbox"
            aria-activedescendant={selectedConnection || undefined}
            className={`absolute z-10 mt-2 w-full rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none ${
              darkMode
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-100"
            }`}
          >
            {connections.length === 0 && (
              <li
                className={`px-4 py-2 ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                No Connection
              </li>
            )}
            {connections.map((connection) => {
              const selected = connection.name === selectedConnection;
              return (
                <li
                  key={connection.name}
                  id={connection.id}
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onSelectConnection(connection.name);
                    setOpenConnection(false);
                  }}
                  className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                    darkMode
                      ? "hover:bg-gray-700 text-gray-300"
                      : "text-gray-500"
                  } ${selected ? "font-semibold" : "font-normal"}`}
                >
                  {connection.name}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <h3
        className={`text-lg font-semibold my-3 ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        Select Schemas
      </h3>

      <div className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={openSchemas}
          onClick={() => setOpenSchemas((s) => !s)}
          className={`w-full text-left flex items-center justify-between px-4 py-2 rounded border ${
            darkMode
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-gray-800 border-gray-200"
          }`}
        >
          <span className={`${selectedSchema ? "" : "text-gray-400"}`}>
            {selectedSchema || "-- Choose Table --"}
          </span>
          <svg
            className={`w-5 h-5 ml-2 transition-transform ${
              openSchemas ? "rotate-180" : "rotate-0"
            }`}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 8L10 12L14 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {openSchemas && (
          <ul
            role="listbox"
            aria-activedescendant={selectedSchema || undefined}
            className={`absolute z-10 mt-2 w-full rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none ${
              darkMode
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-100"
            }`}
          >
            {schemas.length === 0 && (
              <li
                className={`px-4 py-2 ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                No schemas
              </li>
            )}
            {schemas.map((schema) => {
              const selected = schema === selectedSchema;
              return (
                <li
                  key={schema}
                  id={schema}
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onSelectSchema(schema);
                    setOpenSchemas(false);
                  }}
                  className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                    darkMode
                      ? "hover:bg-gray-700 text-gray-300"
                      : "text-gray-500"
                  } ${selected ? "font-semibold" : "font-normal"}`}
                >
                  {schema}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <h3
        className={`text-lg font-semibold my-3 ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        Select Table
      </h3>

      <div className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          className={`w-full text-left flex items-center justify-between px-4 py-2 rounded border ${
            darkMode
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-gray-800 border-gray-200"
          }`}
        >
          <span className={`${selectedTable ? "" : "text-gray-400"}`}>
            {selectedTable || "-- Choose Table --"}
          </span>
          <svg
            className={`w-5 h-5 ml-2 transition-transform ${
              open ? "rotate-180" : "rotate-0"
            }`}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 8L10 12L14 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {open && (
          <ul
            role="listbox"
            aria-activedescendant={selectedTable || undefined}
            className={`absolute z-10 mt-2 w-full rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none ${
              darkMode
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-100"
            }`}
          >
            {tables.length === 0 && (
              <li
                className={`px-4 py-2 ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                No tables
              </li>
            )}
            {tables.map((table) => {
              const selected = table === selectedTable;
              return (
                <li
                  key={table}
                  id={table}
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onSelectTable(table);
                    setOpen(false);
                  }}
                  className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                    darkMode
                      ? "hover:bg-gray-700 text-gray-300"
                      : "text-gray-500"
                  } ${selected ? "font-semibold" : "font-normal"}`}
                >
                  {table}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
