import { ApiResponse } from "./ApiResponse.types";

export interface MonitoringConfigurationParams {
  name?: string;
  layer?: string;
  flag?: string;
  withDetail?: boolean;
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
  flag: string;
  insertTime: string;
  withDetail?: boolean;
}

export type MonitoringDataRes = ApiResponse<MonitoringConfigurationData[]>;
