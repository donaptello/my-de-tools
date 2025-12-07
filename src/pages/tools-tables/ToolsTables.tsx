import { useState } from "react";
import TableSelector from "../../components/tools-tables/TableSelector";
import { tables } from "../../services/tablesService";
import ColumnSelector from "../../components/tools-tables/ColumnSelector";
import Footers from "../../components/main/Footers";
import SqlGenerator from "../../components/tools-tables/SqlGenerator";

export default function ToolsTables() {
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  return (
    <div>
        <div className={`p-6 min-h-screen flex flex-col transition-colors ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <div className="flex justify-between items-center mb-6">
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Table Tools
            </h1>

            <button
                onClick={() => setDarkMode(!darkMode)}
                className={`px-4 py-2 rounded-lg transition hover:scale-105 ${darkMode ? 'bg-gray-200 text-black' : 'bg-gray-800 text-white'}`}
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
