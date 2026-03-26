import {
  HopOrcestrationParams,
  HopOrchestrationRes,
  HopPipelineDetailRes,
  HopStatusRes,
} from "../types/HopManagement.types";
import { apiDeTools } from "./Http";

export const hopManagementService = {
  async getStatus(): Promise<HopStatusRes> {
    return apiDeTools.get("v1/hop/status").then((res) => res.data);
  },
  async getOrchestration(
    mode: string,
    params: HopOrcestrationParams,
  ): Promise<HopOrchestrationRes> {
    return apiDeTools
      .get(`v1/hop/orchestration/${mode}`, { params })
      .then((res) => res.data);
  },
  async getPipelineDetail(
    pipelineName: string | null,
    pipelineId: string | undefined,
  ): Promise<HopPipelineDetailRes> {
    return apiDeTools
      .get(
        `v1/hop/orchestration/Pipeline?id_pipe=${pipelineId}&name_pipe=${pipelineName}`,
      )
      .then((res) => res.data);
  },
};
