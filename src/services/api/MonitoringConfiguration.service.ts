import {
  MonitoringDataRes,
  MonitoringConfigurationParams,
  MonitoringConfiguration,
  MonitoringDataResInsert,
  MonitoringDataResDelete,
} from "../types/MonitoringConfigurations.types";
import { apiDeTools } from "./Http";

export const monitoringConfigurationService = {
  async getDataMonitoring(
    params: MonitoringConfigurationParams,
  ): Promise<MonitoringDataRes> {
    return apiDeTools
      .get("v1/monitoring/parameter", { params })
      .then((res) => res.data);
  },
  async insertDataMonitoring(
    payload: MonitoringConfiguration,
  ): Promise<MonitoringDataResInsert> {
    return apiDeTools
      .post("v1/monitoring/parameter", payload)
      .then((res) => res.data);
  },
  async deleteDataMonitoring(
    id: number | undefined
  ): Promise<MonitoringDataResDelete> {
    return apiDeTools
      .delete(`v1/monitoring/parameter/${id}`)
      .then((res) => res.data);
  },
};
