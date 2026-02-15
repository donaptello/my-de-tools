export interface TokenAuth {
  accessToken: string;
}

export interface LoginAuthPayload {
  username: string;
  password: string;
}

export type AuthTokenRes = TokenAuth;
