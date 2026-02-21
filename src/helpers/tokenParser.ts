import { jwtDecode, JwtPayload } from "jwt-decode";
import { User, UserResponse } from "../services/types/Auth.types";

export const parseJwt = (token: string): User | null => {
  try {
    const decoded = jwtDecode<JwtPayload & UserResponse>(token);
    return {
      id: decoded._id,
      username: decoded._username || "",
      role: decoded._role || "",
      exp: decoded.exp || 0,
    };
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};
