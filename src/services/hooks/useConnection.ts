import { useEffect, useState } from "react";
import {
  ConnectionData,
  ConnectionDataRes,
  ConnectionSearchParams,
} from "../types/Connections.types";
import { connectionService } from "../api/Connection.service";

export function useConnectionData() {
  const [query, setQuery] = useState<ConnectionSearchParams>({});
  const [data, setData] = useState<ConnectionDataRes | null>(null);
  const [loading, setLoading] = useState(false);

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
  };
}

export function useCreateConnection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (payload: ConnectionData) => {
    setLoading(true);
  }
}
