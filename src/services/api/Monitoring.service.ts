import {
  MonitoringTableParams,
  MonitoringTotalDataRes,
  MonitoringTotalTableRes,
} from "../types/Monitoring.types";
import { apiDeTools } from "./Http";

export const monitoringService = {
  getTotalData(): Promise<MonitoringTotalDataRes> {
    console.info(apiDeTools.get("/v1/monitoring/widget/total_card"));
    return apiDeTools
      .get("/v1/monitoring/widget/total_card")
      .then((res) => res.data);
  },
  getTableData(
    params: MonitoringTableParams
  ): Promise<MonitoringTotalTableRes> {
    return apiDeTools.get("/v1/monitoring", { params }).then((res) => res.data);
  },
};
