import { useState } from "react";
import { authService } from "../api/Auth.service";
import { isAxiosError } from "axios";
import { LoginAuthPayload } from "../types/Auth.types";

export function useAuthLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const payload: LoginAuthPayload = {
        username: username,
        password: password,
      };
      const res = await authService.login(payload);
      return res;
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(err?.response?.data?.message ?? "Something went wrong");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { login, loading, error };
}
