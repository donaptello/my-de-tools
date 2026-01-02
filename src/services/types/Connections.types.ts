import { ApiResponse, ApiResponseInserted } from "../../services/types/ApiResponse.types";

export interface ConnectionData {
  id: string;
  name: string;
  type: string;
  description?: string;
  configuration: GeneralConnection | S3Connection;
}

export interface GeneralConnection {
  host: string;
  port: number;
  username: string;
  password: string;
}

export interface S3Connection {
  accessKey: string;
  secretKey: string;
  domain: string;
  host: string;
  port: number;
}

export interface ConnectionSearchParams {
  name?: string;
}

export type ConnectionDataRes = ApiResponse<ConnectionData[]>;
export type ConnectionCreateDataRes = ApiResponseInserted;
