import { ApiResponse } from "./ApiResponse.types";

export interface ReadFileParams {
  path?: string;
}

export interface DirectoryParams {
  search?: string;
}

export interface HopReadFileEdges {
  id: string;
  source: string;
  target: string;
}

export interface HopReadFileEdgesProperties {
  GUI: {
    xloc: string;
    yloc: string;
  };
  description: string;
}

export interface HopReadFileNodes {
  id: string;
  type: string;
  label: string;
  properties: HopReadFileEdgesProperties;
}

export interface HopReadFile {
  nodes: HopReadFileNodes[];
  edges: HopReadFileEdges[];
}

export type HopReadFileRes = ApiResponse<HopReadFile>;
export type HopDirectoryRes = ApiResponse<[]>;
