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
  status: string;
  duration: string;
  type: string;
}

export interface HopOrcestrationParams {
  id_pipe?: string;
  name_pipe?: string;
  search_name?: string;
  size?: number;
  status?: string;
  order?: string;
  orderBy?: string;
}

export interface HopTransformationDetails {
  transformName: string;
  copy: number;
  linesRead: number;
  linesWritten: number;
  linesInput: number;
  linesOutput: number;
  linesUpdated: number;
  linesRejected: number;
  inputBufferSize: number;
  outputBufferSize: number;
  errors: number;
  statusDescription: string;
  seconds: number;
  speed: string;
  priority: string;
  stopped: boolean;
  paused: boolean;
  logText: string;
  sampleRowMeta: string | null;
  sampleRows: string | null;
}

export interface HopPipelineDetail {
  id: string;
  name: string | null;
  status: string;
  loggingString: string;
  startDate: string;
  endDate: string;
  duration: string;
  progressPercentage: number;
  transformStatusList: HopTransformationDetails[];
  totalRead: number;
  totalWritten: number;
  totalError: number;
  totalTransform: number;
  updatedAt: string;
  type: string;
}

export interface HopOptionsParams {
  mode: string;
  options: string | null;
  id_pipe: string;
  name_pipe: string;
}

export interface DeleteTypes {
  totalDelete: number;
}

export interface HopDataOption {
  id: string;
  name: string;
  status: string;
}

export type HopStatusRes = ApiResponse<HopStatus>;
export type HopOrchestrationRes = ApiResponse<HopOrchestration[]>;
export type HopPipelineDetailRes = ApiResponse<HopPipelineDetail[]>;
export type HopDeleteRes = ApiResponse<DeleteTypes>;
export type HopOptionsRes = ApiResponse<HopDataOption | null>;
