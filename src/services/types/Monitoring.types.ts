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

export interface MonitoringTableDetail {
  lastrun: string;
  date: string;
  dataSource: string | null;
  tableName: string;
  source: string | null;
  target: string | null;
  totalInSource: number;
  totalInTarget: number;
  diff: number;
}

export interface MonitoringTableDetailMap {
  countDiff: number;
  detail: MonitoringTableDetail[];
}

export interface MonitoringTableParams {
  table?: string;
  limit?: number;
}

export type MonitoringTotalDataRes = ApiResponse<MonitoringTotalData>;
export type MonitoringTotalTableRes = ApiResponse<MonitoringTable[]>;
export type MonitoringTableDetailRes = ApiResponse<MonitoringTableDetailMap>;
