import { ApiResponse } from "./ApiResponse.types";

export interface MonitoringTotalData {
    totalTable: number;
    inCompleted: number;
    completed: number;
    toBeChecked: number;
}

export interface MonitoringTable {
    tableName: string;
    lastRunEtl: string;
    lastUpdateData: string;
    CodeSource: string;
    DbSource: string;
    DbTarget: string;
    RecordSource: number;
    RecordDwh: number;
    TotalDiffRecord: number;
    status: string;
}

export interface MonitoringTableParams {
  table?: string;
}

export type MonitoringTotalDataRes = ApiResponse<MonitoringTotalData>;
export type MonitoringTotalTableRes = ApiResponse<MonitoringTable[]>;