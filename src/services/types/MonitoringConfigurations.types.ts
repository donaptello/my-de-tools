import { ApiResponse } from "./ApiResponse.types";

export interface MonitoringConfigurationParams {
  name?: string;
  layer?: string;
  flag?: string;
  withDetail?: boolean;
}

export interface MonitoringConfigDeleteParams {
  id?: number;
}

export interface MonitoringConfiguration {
  id?: number;
  tableNameSource: string;
  schemas: string;
  dbSource: string;
  dbTarget: string;
  columnDateName: string;
  tableNameTarget: string;
  dataSourceColumnName: string;
  dataSource: string;
  layer: string;
  flag: string;
  insertTime: string;
}

export interface MonitoringConfigurationData {
  id?: number;
  tableNameSource: string;
  schemas: string;
  dbSource: string;
  dbTarget: string;
  columnDateName: string;
  tableNameTarget: string;
  dataSourceColumnName: string;
  dataSource: string;
  layer: string;
  details: MonitoringConfiguration[];
  flag: string;
  insertTime: string;
  withDetail?: boolean;
}

export interface MonitoringDelete {
  deleted: number;
}

export interface MonitoringUpdate {
  data: MonitoringConfiguration;
  row_updated: number;
}

export type MonitoringDataRes = ApiResponse<MonitoringConfigurationData[]>;
export type MonitoringDataResInsert = ApiResponse<MonitoringConfiguration>;
export type MonitoringDataResDelete = ApiResponse<MonitoringDelete>;
export type MonitoringDataResUpdate = ApiResponse<MonitoringUpdate>;
