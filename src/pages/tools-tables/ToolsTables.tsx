import { useState } from "react";
import TableSelector from "../../components/tools-tables/TableSelector";
import { tables } from "../../services/tablesService";
import ColumnSelector from "../../components/tools-tables/ColumnSelector";
import SqlGenerator from "../../components/tools-tables/SqlGenerator";
import { useOutletContext } from "react-router-dom";
import { LayoutContextType } from "../../components/main/Layout";

export default function ToolsTables() {
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const { darkMode, setTitle } = useOutletContext<LayoutContextType>();
  setTitle("Tools Table");
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-0 items-stretch">
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
  );
}
