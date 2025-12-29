import { useEffect, useState } from "react";
import {
  MonitoringTableParams,
  MonitoringTotalDataRes,
  MonitoringTotalTableRes,
} from "../types/Monitoring.types";
import { monitoringService } from "../api/Monitoring.service";

export function useMonitoringTable() {
  const [query, setQuery] = useState<MonitoringTableParams>({});
  const [data, setData] = useState<MonitoringTotalTableRes | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    monitoringService
      .getTableData(query)
      .then((res) => {
        setData(res);
      })
      .finally(() => setLoading(false));
  }, [query]);

  return {
    data,
    loading,
    setQuery,
  };
}

export function useMonitoringFetchTable() {
  const [data, setData] = useState<MonitoringTotalTableRes | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchOne = async (query: MonitoringTableParams) => {
    setLoading(true);
    try {
      const res = await monitoringService.getTableData(query);
      setData(res);
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, fetchOne };
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
