import { ApiResponse } from "../../services/types/ApiResponse.types";

export interface ConnectionData {
    id: string;
    name: string;
    type: string;
    description?: string;
    connection: object;
}

export type ConnectionDataRes = ApiResponse<ConnectionData[]>;