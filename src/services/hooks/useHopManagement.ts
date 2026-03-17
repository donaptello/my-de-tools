import { useEffect, useState } from "react";
import {
  HopOrcestrationParams,
  HopOrchestrationRes,
  HopStatusRes,
} from "../types/HopManagement.types";
import { hopManagementService } from "../api/HopManagement.service";

export function useHopManagementStatus() {
  const [data, setData] = useState<HopStatusRes | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    hopManagementService
      .getStatus()
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  }, []);

  return {
    data,
    loading,
  };
}

export function useHopOrcestration(mode: string) {
  const [data, setData] = useState<HopOrchestrationRes | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState<HopOrcestrationParams>({});

  useEffect(() => {
    setLoading(true);
    hopManagementService
      .getOrchestration(mode, query)
      .then((res) => {
        setData(res);
      })
      .finally(() => setLoading(false));
  }, [query, mode]);

  return {
    data,
    loading,
    setQuery,
  };
}
