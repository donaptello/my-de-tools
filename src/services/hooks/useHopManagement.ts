import { useEffect, useState } from "react";
import { HopStatusRes } from "../types/HopManagement.types";
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
