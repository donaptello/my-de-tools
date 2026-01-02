import { useEffect, useState } from "react";
import {
  ConnectionData,
  ConnectionDataRes,
  ConnectionSearchParams,
} from "../types/Connections.types";
import { connectionService } from "../api/Connection.service";
import { isAxiosError } from "axios";

export function useConnectionData() {
  const [query, setQuery] = useState<ConnectionSearchParams>({});
  const [data, setData] = useState<ConnectionDataRes | null>(null);
  const [loading, setLoading] = useState(false);
  const appendConnection = (conn: ConnectionData) => {
    setData((prev) => (prev ? { ...prev, data: [conn, ...prev.data] } : prev));
  };

  useEffect(() => {
    setLoading(true);
    connectionService
      .getConnection(query)
      .then((res) => {
        setData(res);
      })
      .finally(() => setLoading(false));
  }, [query]);

  return {
    data,
    loading,
    setQuery,
    appendConnection
  };
}

export function useCreateConnection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (payload: ConnectionData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await connectionService.insertConnection(payload);
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
