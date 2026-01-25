import { useOutletContext } from "react-router-dom";
import { LayoutContextType } from "../../components/main/Layout";
import { useEffect, useState } from "react";
import {
  useCreateConnection,
  useDeleteConnection,
  useUpdateConnection,
} from "../../services/hooks/useConnection";
import { useMonitoringConfigurationData } from "../../services/hooks/useMonitoringConfiguration";
import MonitoringConfigurationList from "../../components/monitoring-configuration/MonitoringConfigurationList";
import { MonitoringConfigurationData } from "../../services/types/MonitoringConfigurations.types";
import ModalFormConfigurationTable from "../../components/modal/ModalFormConfigurationTable";
import MonitoringConfigurationCard from "../../components/monitoring-configuration/MonitoringConfigurationCard";

export default function MonitoringConfiguration() {
  const { darkMode, setTitle } = useOutletContext<LayoutContextType>();
  const [selected, setSelected] = useState<
    MonitoringConfigurationData | undefined
  >();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [showFormInput, setShowFormInput] = useState<boolean>(false);
  const { deleteConnection } = useDeleteConnection();
  const {
    data: monitorings,
    loading: connectionLoading,
    setQuery,
    appendMonitoring,
    popConnection,
  } = useMonitoringConfigurationData();
  const { submit } = useCreateConnection();
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const { update } = useUpdateConnection();

  useEffect(() => {
    setTitle("RowCount Configuration");
  }, [setTitle]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-0 flex-1 items-stretch">
      <div className="md:col-span-1 items-stretch">
        <MonitoringConfigurationList
          monitorings={monitorings?.data}
          selectedId={selected?.id}
          onSelect={(c) => {
            setSelected(c);
            setIsUpdate(false);
            setIsAdding(false);
          }}
          onAdd={() => {
            setShowFormInput(true);
            setSelected(undefined);
          }}
          loading={connectionLoading}
          setQuery={(value: string, layer: string, flag: string) =>
            setQuery({
              name: value,
              layer: layer,
              flag: flag,
              withDetail: true,
            })
          }
          darkMode={darkMode}
        />
      </div>

      <div className="md:col-span-2 items-stretch">
        <MonitoringConfigurationCard darkMode={darkMode} />
      </div>
      <div className="absolute">
        <ModalFormConfigurationTable
          darkMode={darkMode}
          showFormInput={showFormInput}
          setShowFormInput={(validate) => setShowFormInput(validate)}
          onConfirm={async (conn) => {
            if (conn !== undefined) {
              // await deleteConnection(conn.id);
              // await popConnection(conn);
              setSelected(undefined);
            }
          }}
        />
      </div>
    </div>
  );
}
