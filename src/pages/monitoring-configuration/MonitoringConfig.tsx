import { useOutletContext } from "react-router-dom";
import { LayoutContextType } from "../../components/main/Layout";
import { useEffect, useState } from "react";
import {
  useCreateMonitoringConfiguration,
  useDeleteMonitoringConfiguration,
  useMonitoringConfigurationData,
  useUpdateMonitoringConfiguration,
} from "../../services/hooks/useMonitoringConfiguration";
import MonitoringConfigurationList from "../../components/monitoring-configuration/MonitoringConfigurationList";
import { MonitoringConfigurationData } from "../../services/types/MonitoringConfigurations.types";
import ModalFormConfigurationTable from "../../components/modal/ModalFormConfigurationTable";
import MonitoringConfigurationCard from "../../components/monitoring-configuration/MonitoringConfigurationCard";
import ModalValidationDelete from "../../components/modal/ModalValidationDelete";

export default function MonitoringConfiguration() {
  const { darkMode, setTitle } = useOutletContext<LayoutContextType>();
  const [selected, setSelected] = useState<
    MonitoringConfigurationData | undefined
  >();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [showFormInput, setShowFormInput] = useState<boolean>(false);
  const { deleteMonitoringConfiguration } = useDeleteMonitoringConfiguration();
  const {
    data: monitorings,
    loading: connectionLoading,
    setQuery,
    refetch,
  } = useMonitoringConfigurationData();
  const { submit } = useCreateMonitoringConfiguration();
  const { update } = useUpdateMonitoringConfiguration();
  const [isUpdate, setIsUpdate] = useState(false);

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
          }}
          onAdd={() => {
            setShowFormInput(true);
          }}
          loading={connectionLoading}
          setQuery={(value: string, layer: string, flag: string) => {
            setQuery({
              name: value,
              layer: layer,
              flag: flag,
              withDetail: true,
            });
            setSelected(undefined);
          }}
          darkMode={darkMode}
        />
      </div>

      <div className="md:col-span-2 items-stretch">
        <MonitoringConfigurationCard
          monitoring={selected}
          setShowDeleteConfirm={(value) => setShowDeleteConfirm(value)}
          darkMode={darkMode}
          setShowButtonUpdate={(value) => {
            setIsUpdate(value);
          }}
        />
      </div>
      <div className="absolute">
        <ModalFormConfigurationTable
          monitoringData={selected}
          darkMode={darkMode}
          showFormInput={showFormInput}
          setShowFormInput={(validate) => setShowFormInput(validate)}
          setShowFormUpdate={(validate) => setIsUpdate(validate)}
          onCreate={async (monn) => {
            if (monn !== undefined) {
              const res = await submit(monn);
              if (res.statusCode === 201) {
                await refetch();
                setSelected(undefined);
              }
            }
          }}
          onUpdate={async (id, monn) => {
            if (monn !== undefined && id !== undefined) {
              const res = await update(id, monn);
              const resultData = res.data.data;
              if (res.statusCode === 200) {
                setSelected((prev) => {
                  if (!prev) return prev;
                  return {
                    ...prev,
                    ...resultData,
                  };
                });
                refetch();
              }
            }
          }}
          isUpdate={isUpdate}
        />
        <ModalValidationDelete
          darkMode={darkMode}
          showDeleteConfirm={showDeleteConfirm}
          setShowDeleteConfirm={(value) => setShowDeleteConfirm(value)}
          monitoring={selected}
          onConfirmMonitoring={async (monn) => {
            if (monn !== undefined && monn.id !== undefined) {
              await deleteMonitoringConfiguration(monn.id);
              await refetch();
              setSelected(undefined);
            }
          }}
        />
      </div>
    </div>
  );
}
