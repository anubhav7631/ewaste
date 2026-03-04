import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/user.model';
import { StatusUpdateRequest, WasteRequest } from '../models/waste-request.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly BASE = '/api/admin';

  constructor(private http: HttpClient) {}

  getAllRequests(status?: string): Observable<ApiResponse<WasteRequest[]>> {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    return this.http.get<ApiResponse<WasteRequest[]>>(`${this.BASE}/requests`, { params });
  }

  updateStatus(id: number, req: StatusUpdateRequest): Observable<ApiResponse<WasteRequest>> {
    return this.http.put<ApiResponse<WasteRequest>>(`${this.BASE}/requests/${id}/status`, req);
  }
}
