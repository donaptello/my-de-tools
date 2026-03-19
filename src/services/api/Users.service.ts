import { UserDataRes, UsersParams } from "../types/Users.types";
import { apiDeTools } from "./Http";

export const userService = {
  async getUsers(params: UsersParams): Promise<UserDataRes> {
    return apiDeTools.get("v1/users", { params }).then((res) => res.data);
  },
};
