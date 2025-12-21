import {
  ConnectionDataRes,
  ConnectionSearchParams,
} from "../types/Connections.types";
import { apiDeTools } from "./Http";

export const connectionService = {
  getConnection(params: ConnectionSearchParams): Promise<ConnectionDataRes> {
    return apiDeTools.get("v1/connection", { params }).then((res) => res.data);
  },
  insertConnection(): void {
    apiDeTools.post("v1/connection")
  }
};
