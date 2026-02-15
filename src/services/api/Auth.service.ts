import { AuthTokenRes, LoginAuthPayload } from "../types/Auth.types";
import { apiDeTools } from "./Http";

export const authService = {
  async login(payload: LoginAuthPayload): Promise<AuthTokenRes> {
    return apiDeTools
      .post("/v1/auth/login", payload)
      .then((res) => res.data);
  },
};
