import {
  MonitoringPipelineStatusRes,
  MonitoringTableDetailRes,
  MonitoringTableParams,
  MonitoringTotalDataRes,
  MonitoringTotalTableRes,
} from "../types/Monitoring.types";
import { apiDeTools } from "./Http";

export const monitoringService = {
  getTotalData(): Promise<MonitoringTotalDataRes> {
    return apiDeTools
      .get("/v1/monitoring/widget/total_card")
      .then((res) => res.data);
  },
  getTableData(
    params: MonitoringTableParams
  ): Promise<MonitoringTotalTableRes> {
    return apiDeTools.get("/v1/monitoring", { params }).then((res) => res.data);
  },
  getTableDataDetail(
    params: MonitoringTableParams
  ): Promise<MonitoringTableDetailRes> {
    return apiDeTools
      .get(`/v1/monitoring/detail/${params.table}`, {
        params: {
          limit: params.limit,
        },
      })
      .then((res) => res.data);
  },
  async getPipelineStatus(): Promise<MonitoringPipelineStatusRes> {
    return apiDeTools
      .get("/v1/monitoring/widget/status_pipeline")
      .then((res) => res.data);
  }
};
