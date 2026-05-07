import { useEffect, useState } from "react";
import {
  MonitoringPipelineStatusRes,
  MonitoringTableDetailRes,
  MonitoringTableParams,
  MonitoringTotalDataRes,
  MonitoringTotalTableRes,
} from "../types/Monitoring.types";
import { monitoringService } from "../api/Monitoring.service";

export function useMonitoringTable(tableName?: string) {
  const [query, setQuery] = useState<MonitoringTableParams>({});
  const [data, setData] = useState<MonitoringTotalTableRes | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (!tableName) {
      monitoringService
        .getTableData(query)
        .then((res) => {
          setData(res);
        })
        .finally(() => setLoading(false));
    } else {
      monitoringService
        .getTableData({ table: tableName })
        .then((res) => {
          setData(res);
        })
        .finally(() => setLoading(false));
    }
  }, [query, tableName]);

  return {
    data,
    loading,
    setQuery,
  };
}

export function useMonitoringFetchTable(tableName: string | undefined) {
  const [data, setData] = useState<MonitoringTableDetailRes | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!tableName) return;

    let cancelled = false;

    setLoading(true);
    monitoringService
      .getTableDataDetail({ table: tableName })
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tableName]);

  return { data, loading };
}

export function useMonitoringData() {
  const [data, setData] = useState<MonitoringTotalDataRes | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    monitoringService
      .getTotalData()
      .then((res) => {
        setData(res);
      })
      .finally(() => setLoading(false));
  }, []);

  return {
    data,
    loading,
  };
}

export function useMonitoringPipelineStatus() {
  const [data, setData] = useState<MonitoringPipelineStatusRes | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    monitoringService
      .getPipelineStatus()
      .then((res) => {
        setData(res);
      })
      .finally(() => setLoading(false));
  }, []);

  return {
    data,
    loading,
  };
}
