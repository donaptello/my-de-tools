import { MonitoringDataRes, MonitoringConfigurationParams } from "../types/MonitoringConfigurations.types";
import { apiDeTools } from "./Http";

export const monitoringConfigurationService = {
    async getDataMonitoring(
        params: MonitoringConfigurationParams
    ): Promise<MonitoringDataRes> {
        return apiDeTools.get("v1/monitoring/parameter", { params }).then((res) => res.data);
    }
}