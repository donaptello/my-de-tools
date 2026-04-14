import {
  HopDeleteRes,
  HopOptionsParams,
  HopOptionsRes,
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
  async deleteLogApacheHop(
    mode: string,
    withError: boolean,
  ): Promise<HopDeleteRes> {
    return apiDeTools
      .delete(`v1/hop/orchestration/${mode}`, {
        params: { with_error: withError },
      })
      .then((res) => res.data);
  },
  async optionsModeHop(params: HopOptionsParams): Promise<HopOptionsRes> {
    return apiDeTools
      .get(`v1/hop/orchestration/${params.mode}/${params.options}`, {
        params: { id_pipe: params.id_pipe, name_pipe: params.name_pipe },
      })
      .then((res) => res.data);
  },
};
