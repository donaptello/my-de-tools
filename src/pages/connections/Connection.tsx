import { useOutletContext } from "react-router-dom";
import { LayoutContextType } from "../../components/main/Layout";
import { useEffect, useState } from "react";
import { ConnectionData } from "../../services/types/Connections.types";
import ConnectionList from "../../components/connection/ConnectionList";
import { connectionDatas } from "../../services/mocks/Connections.mock";
import ConnectionDetail from "../../components/connection/ConnectionDetail";

export default function Connection() {
  const { darkMode, setTitle } = useOutletContext<LayoutContextType>();
  const [selected, setSelected] = useState<ConnectionData | undefined>();
  const [connections, setConnections] = useState<ConnectionData[]>(connectionDatas.data);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setTitle("Connections");
  }, [setTitle]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-0 flex-1 items-stretch">
      <div className="md:col-span-1 items-stretch">
        <ConnectionList
          connections={connections}
          selectedId={selected?.id}
          onSelect={(c) => { setSelected(c); setIsAdding(false); }}
          onAdd={() => { setIsAdding(true); setSelected(undefined); }}
          darkMode={darkMode}
        />
      </div>

      <div className="md:col-span-2 items-stretch">
        <ConnectionDetail
          connection={selected}
          darkMode={darkMode}
          isAdding={isAdding}
          onCancel={() => setIsAdding(false)}
          onCreate={(conn) => { setConnections((s) => [conn, ...s]); setSelected(conn); setIsAdding(false); }}
        />
      </div>
    </div>
  );
}
