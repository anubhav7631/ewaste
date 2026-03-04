import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { WasteService } from '../../../services/waste.service';
import { WasteRequest } from '../../../models/waste-request.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="navbar">
      <span class="brand">♻️ Smart e-Waste System</span>
      <div class="nav-links">
        <a routerLink="/dashboard">Dashboard</a>
        <a routerLink="/submit-request">New Request</a>
        <a routerLink="/my-requests">My Requests</a>
        <button class="btn-logout" (click)="auth.logout()">Logout</button>
      </div>
    </nav>

    <div class="page-container">
      <div class="page-header">
        <h2>Welcome back, {{ auth.getName() }} 👋</h2>
        <a routerLink="/submit-request" class="btn-primary btn">+ New e-Waste Request</a>
      </div>

      <div class="stats-grid" style="grid-template-columns: repeat(4, 1fr)">
        <div class="stat-card stat-total">
          <div class="stat-number">{{ total }}</div>
          <div class="stat-label">Total Requests</div>
        </div>
        <div class="stat-card stat-pending">
          <div class="stat-number">{{ count('PENDING') }}</div>
          <div class="stat-label">Pending</div>
        </div>
        <div class="stat-card stat-scheduled">
          <div class="stat-number">{{ count('SCHEDULED') }}</div>
          <div class="stat-label">Scheduled</div>
        </div>
        <div class="stat-card stat-completed">
          <div class="stat-number">{{ count('COMPLETED') }}</div>
          <div class="stat-label">Completed</div>
        </div>
      </div>

      <div class="card">
        <div class="page-header" style="margin-bottom:1rem">
          <h3 style="margin:0">Recent Requests</h3>
          <a routerLink="/my-requests" style="color:#2e7d32; font-size:0.875rem">View all →</a>
        </div>

        <div *ngIf="loading" style="text-align:center; padding:2rem; color:#999">Loading...</div>

        <div *ngIf="!loading && requests.length === 0" class="empty-state">
          <div class="empty-icon">📦</div>
          <p>No requests yet. <a routerLink="/submit-request" style="color:#2e7d32">Submit your first one!</a></p>
        </div>

        <div class="table-responsive" *ngIf="requests.length > 0">
          <table class="data-table">
            <thead>
              <tr>
                <th>#ID</th><th>Device</th><th>Qty</th>
                <th>Preferred Date</th><th>Scheduled</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let r of requests.slice(0,6)">
                <td><strong>#{{ r.id }}</strong></td>
                <td>{{ r.deviceType }}</td>
                <td>{{ r.quantity }}</td>
                <td>{{ r.preferredDate || '—' }}</td>
                <td>{{ r.scheduledDate || '—' }}</td>
                <td><span [class]="'badge badge-' + r.status">{{ r.status }}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  requests: WasteRequest[] = [];
  loading = true;

  constructor(public auth: AuthService, private wasteService: WasteService) {}

  ngOnInit(): void {
    this.wasteService.getMyRequests().subscribe({
      next: res => { this.requests = res.data || []; this.loading = false; },
      error: () => this.loading = false
    });
  }

  get total() { return this.requests.length; }
  count(status: string) { return this.requests.filter(r => r.status === status).length; }
}
