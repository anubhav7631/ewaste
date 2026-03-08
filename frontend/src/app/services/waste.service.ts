import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/user.model";
import { WasteRequest } from "../models/waste-request.model";

@Injectable({ providedIn: "root" })
export class WasteService {
  private readonly BASE = "https://ewaste-production.up.railway.app/api/user";

  constructor(private http: HttpClient) {}

  submitRequest(formData: FormData): Observable<ApiResponse<WasteRequest>> {
    return this.http.post<ApiResponse<WasteRequest>>(
      `${this.BASE}/requests`,
      formData,
    );
  }

  getMyRequests(): Observable<ApiResponse<WasteRequest[]>> {
    return this.http.get<ApiResponse<WasteRequest[]>>(`${this.BASE}/requests`);
  }
}
