export interface User {
  id?: number;
  username: string;
  fullName: string;
  email: string;
  role?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  username: string;
  fullName: string;
  email: string;
  role?: string;
}