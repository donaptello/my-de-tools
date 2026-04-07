import { useCallback, useEffect, useState } from "react";
import {
  HopOrcestrationParams,
  HopOrchestrationRes,
  HopPipelineDetailRes,
  HopStatusRes,
} from "../types/HopManagement.types";
import { hopManagementService } from "../api/HopManagement.service";
import { isAxiosError } from "axios";

export function useHopManagementStatus() {
  const [data, setData] = useState<HopStatusRes | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStatus = useCallback(async () => {
    try {
      setLoading(true);
      const res = await hopManagementService.getStatus();
      setData(res);
    } catch (error) {
      console.error("Failed to fetch status:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return {
    data,
    loading,
    refetch: fetchStatus,
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

export function useHopPipelineDetail(
  pipelineId: string | undefined,
  pipelineName: string | null,
) {
  const [data, setData] = useState<HopPipelineDetailRes | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchStatus = useCallback(async () => {
    try {
      setLoading(true);
      const res = await hopManagementService.getPipelineDetail(
        pipelineName,
        pipelineId,
      );
      setData(res);
    } catch (error) {
      console.error("Failed to fetch status:", error);
    } finally {
      setLoading(false);
    }
  }, [pipelineId, pipelineName]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return {
    data,
    loading,
    refetch: fetchStatus,
  };
}

export function useDeleteHopLog() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteLog = async (mode: string, withError: boolean) => {
    setLoading(true);
    setError(null);

    try {
      const res = await hopManagementService.deleteLogApacheHop(
        mode,
        withError,
      );
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
  return {deleteLog, loading, error}
}
