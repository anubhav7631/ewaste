import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import {
  ApiResponse,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../models/user.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private readonly BASE = "https://ewaste-production.up.railway.app/api/auth";

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  register(req: RegisterRequest): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.BASE}/register`, req);
  }

  login(req: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http
      .post<ApiResponse<AuthResponse>>(`${this.BASE}/login`, req)
      .pipe(
        tap((res) => {
          if (res.success && res.data) {
            localStorage.setItem("ewaste_token", res.data.token);
            localStorage.setItem("ewaste_role", res.data.role);
            localStorage.setItem("ewaste_name", res.data.name);
            localStorage.setItem("ewaste_email", res.data.email);
            localStorage.setItem("ewaste_uid", String(res.data.userId));
          }
        }),
      );
  }

  logout(): void {
    localStorage.removeItem("ewaste_token");
    localStorage.removeItem("ewaste_role");
    localStorage.removeItem("ewaste_name");
    localStorage.removeItem("ewaste_email");
    localStorage.removeItem("ewaste_uid");
    this.router.navigate(["/login"]);
  }

  getToken(): string | null {
    return localStorage.getItem("ewaste_token");
  }
  getRole(): string | null {
    return localStorage.getItem("ewaste_role");
  }
  getName(): string {
    return localStorage.getItem("ewaste_name") || "User";
  }
  getEmail(): string {
    return localStorage.getItem("ewaste_email") || "";
  }
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  isAdmin(): boolean {
    return this.getRole() === "ROLE_ADMIN";
  }
}
