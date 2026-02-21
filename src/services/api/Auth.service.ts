import { AuthTokenRes, LoginAuthPayload } from "../types/Auth.types";
import { apiDeTools } from "./Http";

export const authService = {
  async login(payload: LoginAuthPayload): Promise<AuthTokenRes> {
    const res = await apiDeTools.post("/v1/auth/login", payload, {
      validateStatus: () => true,
    });
    return {
      statusCode: res.status,
      accessToken: res.data.access_token,
    };
  },
};
