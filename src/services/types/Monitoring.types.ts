import { ApiResponse } from "./ApiResponse.types";

export interface MonitoringTotalData {
    totalTable: number;
    inCompleted: number;
    completed: number;
    toBeChecked: number;
}

export type MonitoringTotalDataRes = ApiResponse<MonitoringTotalData>;