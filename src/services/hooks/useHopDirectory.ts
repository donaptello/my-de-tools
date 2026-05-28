import { useEffect, useState } from "react";
import {
  DirectoryParams,
  HopDirectoryRes,
  HopReadFileRes,
  ReadFileParams,
} from "../types/HopManagementDir.types";
import { hopManagementDirService } from "../api/HopManagementDir.service";

export function useHopDirectory() {
  const [data, setData] = useState<HopDirectoryRes | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState<DirectoryParams>({});

  useEffect(() => {
    setLoading(true);
    hopManagementDirService
      .getDirectory(query)
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

export function useHopReadFile() {
  const [data, setData] = useState<HopReadFileRes | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState<ReadFileParams>({});

  useEffect(() => {
    if (!query.path) return;

    setLoading(true);
    hopManagementDirService
      .getReadFile(query)
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
