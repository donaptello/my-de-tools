import { ApiResponse } from "./ApiResponse.types";

export interface UsersData {
  id: string;
  username: string;
  role: string;
  createdAt: number;
}

export interface UsersParams {
    name?: string;
    role?: string;
}

export type UserDataRes = ApiResponse<UsersData[]>;
