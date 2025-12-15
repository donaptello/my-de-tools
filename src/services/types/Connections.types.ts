import { ApiResponse } from "../../services/types/ApiResponse.types";

export interface ConnectionData {
    id: string;
    name: string;
    type: string;
    description?: string;
    connection: GeneralConnection | S3Connection;
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

export type ConnectionDataRes = ApiResponse<ConnectionData[]>;