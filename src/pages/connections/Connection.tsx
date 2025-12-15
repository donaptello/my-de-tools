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
  const { data } = connectionDatas;

  useEffect(() => {
    setTitle("Connections");
  }, [setTitle]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-0 flex-1 items-stretch">
      {/* LEFT CARD */}
      <div className="md:col-span-1 items-stretch">
        <ConnectionList
          connections={data}
          selectedId={selected?.id}
          onSelect={setSelected}
          darkMode={darkMode}
        />
      </div>

      <div className="md:col-span-2 items-stretch">
          <ConnectionDetail 
            connection={selected} 
            darkMode={darkMode}
          />
        </div>
    </div>
  );
}
