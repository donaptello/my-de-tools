import { useCallback, useEffect, useState } from "react";
import {
  MonitoringConfiguration,
  MonitoringConfigurationParams,
  MonitoringDataRes,
} from "../types/MonitoringConfigurations.types";
import { monitoringConfigurationService } from "../api/MonitoringConfiguration.service";
import { isAxiosError } from "axios";

export function useMonitoringConfigurationData() {
  const [query, setQuery] = useState<MonitoringConfigurationParams>({
    withDetail: true,
  });
  const [data, setData] = useState<MonitoringDataRes | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await monitoringConfigurationService.getDataMonitoring(query);
      setData(res);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    setQuery,
    refetch: fetchData,
  };
}

export function useCreateMonitoringConfiguration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (payload: MonitoringConfiguration) => {
    setLoading(true);
    setError(null);

    try {
      const res =
        await monitoringConfigurationService.insertDataMonitoring(payload);
      return res;
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err?.response?.data?.message ?? "Something went wrong");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { submit, loading, error };
}

export function useUpdateMonitoringConfiguration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (id: number, payload: MonitoringConfiguration) => {
    setLoading(true);
    setError(null);

    try {
      const res = await monitoringConfigurationService.updateDataMonitoring(
        id,
        payload,
      );
      return res;
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err?.response?.data?.message ?? "Something went wrong");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { update, loading, error };
}

export function useDeleteMonitoringConfiguration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteMonitoringConfiguration = async (id: number | undefined) => {
    setLoading(true);
    setError(null);

    try {
      const res = await monitoringConfigurationService.deleteDataMonitoring(id);
      return res;
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err?.response?.data.message ?? "Something went wrong");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { deleteMonitoringConfiguration, loading, error };
}
