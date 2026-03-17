import { ApiResponse } from "./ApiResponse.types";

export interface PipelineStatus {
  total: number;
  totalRunning: number;
  totalFinished: number;
  totalError: number;
}

export interface WorkflowStatus {
  total: number;
  totalRunning: number;
  totalFinished: number;
  totalError: number;
}

export interface HopStatus {
  statusHop: string;
  pipelineStatus: PipelineStatus;
  workflowStatus: WorkflowStatus;
  memoryFree: number;
  memoryTotal: number;
  memoryUsed: number;
  cpuCores: number;
  cpuProcessTime: number;
  uptime: number;
  threadCount: number;
  loadAvg: number;
}

export interface HopOrchestration {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  duration: string;
  type: string;
}

export interface HopOrcestrationParams {
  id_pipe?: string;
  name_pipe?: string;
  size?: number;
}

export type HopStatusRes = ApiResponse<HopStatus>;
export type HopOrchestrationRes = ApiResponse<HopOrchestration[]>;
