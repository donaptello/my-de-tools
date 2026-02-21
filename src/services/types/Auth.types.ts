export interface TokenAuth {
  statusCode: number;
  accessToken: string | null;
}

export interface LoginAuthPayload {
  username: string;
  password: string;
}

export type UserResponse = {
  _id: string;
  _username: string;
  _role: string;
  exp: number;
};

export type User = {
  id: string;
  username: string;
  role: string;
  exp: number;
};

export type AuthTokenRes = TokenAuth;
