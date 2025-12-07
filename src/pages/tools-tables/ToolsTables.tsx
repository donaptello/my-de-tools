import { useState } from "react";
import TableSelector from "../../components/tables/TableSelector";
import { tables } from "../../services/tablesService";
import ColumnSelector from "../../components/tables/ColumnSelector";

export default function ToolsTables() {
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <div className={darkMode ? "dark" : ""}>
        <div className="p-6 min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
            <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Table Tools
            </h1>

            <button
                onClick={() => setDarkMode(!darkMode)}
                className="px-4 py-2 rounded-lg bg-gray-800 text-white dark:bg-gray-200 dark:text-black transition hover:scale-105"
            >
                {darkMode ? "☀️" : "🌙"}
            </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
            <TableSelector
                tables={Object.keys(tables)}
                selectedTable={selectedTable}
                onSelectTable={(table) => {
                setSelectedTable(table);
                setSelectedColumns([]);
                }}
            />

            <ColumnSelector
                columns={selectedTable ? tables[selectedTable] : []}
                selectedColumns={selectedColumns}
                onChangeColumns={setSelectedColumns}
            />
            </div>
        </div>
    </div>
  );
}
