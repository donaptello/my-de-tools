import {
  ConnectionCreateDataRes,
  ConnectionData,
  ConnectionDataRes,
  ConnectionSearchParams,
} from "../types/Connections.types";
import { apiDeTools } from "./Http";

export const connectionService = {
  async getConnection(params: ConnectionSearchParams): Promise<ConnectionDataRes> {
    return apiDeTools.get("v1/connection", { params }).then((res) => res.data);
  },
  async insertConnection(
    payload: ConnectionData
  ): Promise<ConnectionCreateDataRes> {
    return apiDeTools.post("v1/connection", payload).then((res) => res.data);
  },
  async deleteConnection(id: string): Promise<ConnectionCreateDataRes> {
    return apiDeTools.delete(`v1/connection/${id}`).then((res) => res.data);
  },
};
