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
    // setData((prev) => (prev ? { ...prev, data: [conn, ...prev.data] } : prev));
    setData((prev) => {
      if (!prev) return prev;
      const newData: ConnectionData[] = [];

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
  const popConnection = async (conn: ConnectionData) => {
    setData((prev) => {
      if (!prev) return prev;
      const newData: ConnectionData[] = [];

      for (let index = 0; index < prev.data.length; index++) {
        if (prev.data[index].id !== conn.id) {
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
    appendConnection,
    popConnection,
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

export function useDeleteConnection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteConnection = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await connectionService.deleteConnection(id);
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
  return { deleteConnection, loading, error };
}
