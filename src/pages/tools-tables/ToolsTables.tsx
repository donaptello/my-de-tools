import { useState, useEffect } from "react";
import TableSelector from "../../components/tools-tables/TableSelector";
import { tables } from "../../services/tablesService";
import ColumnSelector from "../../components/tools-tables/ColumnSelector";
import Footers from "../../components/main/Footers";
import SqlGenerator from "../../components/tools-tables/SqlGenerator";
import Navbar from "../../components/main/Navbar";

export default function ToolsTables() {
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("dark-mode");
      if (saved !== null) return saved === "true";
      if (typeof window !== "undefined" && window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {/* ignore */}
    return false;
  });

  useEffect(() => {
    try {
      localStorage.setItem("dark-mode", darkMode ? "true" : "false");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {/*ignore*/}

    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  return (
    <div>
      <div
        className={`p-6 min-h-screen flex flex-col transition-colors ${
          darkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <Navbar
          title="Table Tools"
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-stretch">
          <TableSelector
            tables={Object.keys(tables)}
            selectedTable={selectedTable}
            onSelectTable={(table) => {
              setSelectedTable(table);
              setSelectedColumns([]);
            }}
            darkMode={darkMode}
          />

          <ColumnSelector
            columns={selectedTable ? tables[selectedTable] : []}
            selectedColumns={selectedColumns}
            onChangeColumns={setSelectedColumns}
            darkMode={darkMode}
          />

          <SqlGenerator
            selectedColumns={selectedColumns}
            selectedTable={selectedTable}
            darkMode={darkMode}
          />
        </div>
        <Footers darkMode={darkMode} />
      </div>
    </div>
  );
}
