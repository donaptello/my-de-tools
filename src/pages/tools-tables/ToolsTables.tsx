import { useState, useEffect } from "react";
import TableSelector from "../../components/tools-tables/TableSelector";
import { tables } from "../../services/tablesService";
import ColumnSelector from "../../components/tools-tables/ColumnSelector";
import SqlGenerator from "../../components/tools-tables/SqlGenerator";
import { useOutletContext } from "react-router-dom";
import { LayoutContextType } from "../../components/main/Layout";
import { connectionDatas } from "../../services/mocks/Connections.mock";

export default function ToolsTables() {
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [selectedConnection, setSelectedConnection] = useState<string>("");
  const [selectedSchemas, setSelectedSchemas] = useState<string>("");
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const { darkMode, setTitle } = useOutletContext<LayoutContextType>();

  useEffect(() => {
    setTitle("Tools Table");
  }, [setTitle]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-0 items-stretch">
      <TableSelector
        connections={connectionDatas.data}
        tables={Object.keys(tables)}
        schemas={[]}
        selectedTable={selectedTable}
        selectedConnection={selectedConnection}
        selectedSchema={selectedSchemas}
        onSelectTable={(table) => {
          setSelectedTable(table);
          setSelectedColumns([]);
        }}
        onSelectConnection={(connection) => {
          setSelectedConnection(connection);
        }}
        onSelectSchema={(schema) => {
          setSelectedSchemas(schema);
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
