// user.model.ts
export interface User {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role?: 'ROLE_USER' | 'ROLE_ADMIN';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

export interface AuthResponse {
  token: string;
  role: string;
  name: string;
  email: string;
  userId: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}
