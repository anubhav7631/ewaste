import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';
import { WasteRequest } from '../../../models/waste-request.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="navbar" style="background: linear-gradient(135deg, #0d1257, #1a237e)">
      <span class="brand">⚙️ e-Waste Admin Panel</span>
      <div class="nav-links">
        <a routerLink="/admin/dashboard">Dashboard</a>
        <a routerLink="/admin/requests">All Requests</a>
        <button class="btn-logout" (click)="auth.logout()">Logout</button>
      </div>
    </nav>

    <div class="page-container">
      <div class="page-header">
        <h2>Admin Dashboard</h2>
        <a routerLink="/admin/requests" [queryParams]="{status:'PENDING'}" class="btn-warning btn">
          ⚠️ Review Pending ({{ count('PENDING') }})
        </a>
      </div>

      <div class="stats-grid" style="grid-template-columns: repeat(6, 1fr)">
        <div class="stat-card stat-total">
          <div class="stat-number">{{ requests.length }}</div>
          <div class="stat-label">Total</div>
        </div>
        <div class="stat-card stat-pending">
          <div class="stat-number">{{ count('PENDING') }}</div>
          <div class="stat-label">Pending</div>
        </div>
        <div class="stat-card stat-approved">
          <div class="stat-number">{{ count('APPROVED') }}</div>
          <div class="stat-label">Approved</div>
        </div>
        <div class="stat-card stat-scheduled">
          <div class="stat-number">{{ count('SCHEDULED') }}</div>
          <div class="stat-label">Scheduled</div>
        </div>
        <div class="stat-card stat-completed">
          <div class="stat-number">{{ count('COMPLETED') }}</div>
          <div class="stat-label">Completed</div>
        </div>
        <div class="stat-card stat-rejected">
          <div class="stat-number">{{ count('REJECTED') }}</div>
          <div class="stat-label">Rejected</div>
        </div>
      </div>

      <div class="card">
        <div class="page-header" style="margin-bottom:1rem">
          <h3 style="margin:0">Recent Requests</h3>
          <a routerLink="/admin/requests" style="color:#1a237e; font-size:0.875rem">Manage all →</a>
        </div>

        <div *ngIf="loading" style="text-align:center;padding:2rem;color:#999">Loading...</div>

        <div class="table-responsive" *ngIf="!loading">
          <table class="data-table" *ngIf="requests.length > 0">
            <thead style="">
              <tr>
                <th>#ID</th><th>User</th><th>Device</th>
                <th>Qty</th><th>Submitted</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let r of requests.slice(0,8)">
                <td><strong>#{{ r.id }}</strong></td>
                <td>{{ r.userName }}<small style="display:block;color:#999">{{ r.userEmail }}</small></td>
                <td>{{ r.deviceType }}</td>
                <td>{{ r.quantity }}</td>
                <td style="white-space:nowrap;color:#888;font-size:0.82rem">{{ r.createdAt | date:'dd MMM yyyy' }}</td>
                <td><span [class]="'badge badge-' + r.status">{{ r.status }}</span></td>
              </tr>
            </tbody>
          </table>
          <div *ngIf="requests.length === 0" class="empty-state">
            <div class="empty-icon">📋</div>
            <p>No requests yet.</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AdminDashboardComponent implements OnInit {
  requests: WasteRequest[] = [];
  loading = true;

  constructor(public auth: AuthService, private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllRequests().subscribe({
      next: res => { this.requests = res.data || []; this.loading = false; },
      error: () => this.loading = false
    });
  }

  count(status: string) { return this.requests.filter(r => r.status === status).length; }
}
