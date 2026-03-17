import { HopStatusRes } from "../types/HopManagement.types";
import { apiDeTools } from "./Http";

export const hopManagementService = {
  async getStatus(): Promise<HopStatusRes> {
    return apiDeTools.get("v1/hop/status").then((res) => res.data);
  },
};
