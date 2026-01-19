import { useEffect, useState } from "react";
import {
  MonitoringConfigurationData,
  MonitoringConfigurationParams,
  MonitoringDataRes,
} from "../types/MonitoringConfigurations.types";
import { monitoringConfigurationService } from "../api/MonitoringConfiguration.service";

export function useMonitoringConfigurationData() {
  const [query, setQuery] = useState<MonitoringConfigurationParams>({
    withDetail: true,
  });
  const [data, setData] = useState<MonitoringDataRes | null>(null);
  const [loading, setLoading] = useState(false);
  const appendMonitoring = (conn: MonitoringConfigurationData) => {
    setData((prev) => {
      if (!prev) return prev;
      const newData: MonitoringConfigurationData[] = [];

      newData.push(conn);
      for (let index = 0; index < prev.data.length; index++) {
        newData.push(prev.data[index]);
      }

      return {
        ...prev,
        data: newData,
      };
    });
  };
  const popConnection = async (monitor: MonitoringConfigurationData) => {
    setData((prev) => {
      if (!prev) return prev;
      const newData: MonitoringConfigurationData[] = [];

      for (let index = 0; index < prev.data.length; index++) {
        if (prev.data[index].tableNameSource !== monitor.tableNameSource) {
          newData.push(prev.data[index]);
        }
      }
      return {
        ...prev,
        data: newData,
      };
    });
  };

  useEffect(() => {
    setLoading(true);
    monitoringConfigurationService
      .getDataMonitoring(query)
      .then((res) => {
        setData(res);
      })
      .finally(() => setLoading(false));
  }, [query]);

  return {
    data,
    loading,
    setQuery,
    appendMonitoring,
    popConnection,
  };
}
