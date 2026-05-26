import {
    DirectoryParams,
  HopDirectoryRes,
  HopReadFileRes,
  ReadFileParams,
} from "../types/HopManagementDir.types";
import { apiDeTools } from "./Http";

export const hopManagementDirService = {
  async getReadFile(params: ReadFileParams): Promise<HopReadFileRes> {
    return apiDeTools
      .get("v1/hop/management/file", { params })
      .then((res) => res.data);
  },
  async getDirectory(params: DirectoryParams): Promise<HopDirectoryRes> {
    return apiDeTools
      .get("v1/hop/management/directory", { params })
      .then((res) => res.data);
  }
};
