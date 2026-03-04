import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';
import { WasteRequest, RequestStatus, StatusUpdateRequest } from '../../../models/waste-request.model';

@Component({
  selector: 'app-admin-requests',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <nav class="navbar" style="background: linear-gradient(135deg, #0d1257, #1a237e)">
      <span class="brand">⚙️ e-Waste Admin Panel</span>
      <div class="nav-links">
        <a routerLink="/admin/dashboard">Dashboard</a>
        <a routerLink="/admin/requests">All Requests</a>
        <button class="btn-logout" (click)="auth.logout()">Logout</button>
      </div>
    </nav>

    <!-- Update Modal -->
    <div class="modal-overlay" *ngIf="selected" (click)="closeModal()">
      <div class="modal-box" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>Manage Request #{{ selected.id }}</h3>
          <button class="close-btn" (click)="closeModal()">×</button>
        </div>
        <div class="modal-body">
          <div style="background:#f9fbe7; border-radius:6px; padding:0.9rem; margin-bottom:1.2rem; font-size:0.875rem">
            <div><strong>User:</strong> {{ selected.userName }} ({{ selected.userEmail }})</div>
            <div style="margin-top:0.3rem"><strong>Device:</strong> {{ selected.deviceType }} × {{ selected.quantity }}</div>
            <div style="margin-top:0.3rem"><strong>Address:</strong> {{ selected.pickupAddress }}</div>
            <div *ngIf="selected.deviceDescription" style="margin-top:0.3rem">
              <strong>Description:</strong> {{ selected.deviceDescription }}
            </div>
            <div style="margin-top:0.3rem">
              <strong>Current Status:</strong>
              <span [class]="'badge badge-' + selected.status" style="margin-left:0.5rem">{{ selected.status }}</span>
            </div>
          </div>

          <div class="form-group">
            <label>Update Status *</label>
            <select class="form-control" [(ngModel)]="updateForm.status">
              <option value="APPROVED">✅ Approve</option>
              <option value="REJECTED">❌ Reject</option>
              <option value="SCHEDULED">📅 Schedule Pickup</option>
              <option value="COMPLETED">✔️ Mark Completed</option>
            </select>
          </div>

          <div class="form-group" *ngIf="updateForm.status === 'SCHEDULED'">
            <label>Scheduled Pickup Date *</label>
            <input class="form-control" type="date" [(ngModel)]="updateForm.scheduledDate" [min]="today" />
          </div>

          <div class="form-group">
            <label>Admin Notes (optional)</label>
            <textarea class="form-control" [(ngModel)]="updateForm.adminNotes" rows="3"
              placeholder="Add any notes for the user..."></textarea>
          </div>

          <div *ngIf="updateError" class="alert alert-danger">{{ updateError }}</div>
        </div>
        <div class="modal-footer">
          <button class="btn-primary btn" (click)="updateStatus()" [disabled]="updating">
            <span *ngIf="updating" class="spinner"></span>
            {{ updating ? 'Updating...' : 'Update Status' }}
          </button>
          <button class="btn-secondary btn" (click)="closeModal()">Cancel</button>
        </div>
      </div>
    </div>

    <div class="page-container">
      <div class="page-header">
        <h2>Request Management</h2>
      </div>

      <div class="card" style="margin-bottom:1.5rem">
        <div class="filter-bar">
          <label style="font-weight:600; color:#555">Filter by Status:</label>
          <select class="form-control" [(ngModel)]="filterStatus" (change)="load()">
            <option value="">All Requests</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="COMPLETED">Completed</option>
          </select>
          <span style="color:#888; font-size:0.875rem">
            {{ requests.length }} request(s)
          </span>
        </div>
      </div>

      <div *ngIf="loading" style="text-align:center;padding:3rem;color:#999">Loading requests...</div>

      <div *ngIf="!loading && requests.length === 0" class="empty-state card">
        <div class="empty-icon">📋</div>
        <p>No requests found for the selected filter.</p>
      </div>

      <div class="card" *ngIf="!loading && requests.length > 0">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>#ID</th>
                <th>User</th>
                <th>Device</th>
                <th>Qty</th>
                <th>Pickup Address</th>
                <th>Preferred</th>
                <th>Scheduled</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let r of requests">
                <td><strong>#{{ r.id }}</strong></td>
                <td>
                  {{ r.userName }}
                  <small style="display:block;color:#999">{{ r.userEmail }}</small>
                </td>
                <td>
                  {{ r.deviceType }}
                  <small *ngIf="r.deviceDescription" style="display:block;color:#999">
                    {{ r.deviceDescription | slice:0:30 }}...
                  </small>
                </td>
                <td>{{ r.quantity }}</td>
                <td style="max-width:180px; font-size:0.82rem">{{ r.pickupAddress }}</td>
                <td style="white-space:nowrap; font-size:0.82rem">{{ r.preferredDate || '—' }}</td>
                <td style="white-space:nowrap; font-size:0.82rem; color:#4527a0; font-weight:600">
                  {{ r.scheduledDate || '—' }}
                </td>
                <td><span [class]="'badge badge-' + r.status">{{ r.status }}</span></td>
                <td style="white-space:nowrap; color:#888; font-size:0.82rem">
                  {{ r.createdAt | date:'dd MMM yyyy' }}
                </td>
                <td>
                  <button class="btn-admin btn btn-sm" (click)="openModal(r)">Manage</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class AdminRequestsComponent implements OnInit {
  requests: WasteRequest[] = [];
  loading = true;
  filterStatus = '';

  selected: WasteRequest | null = null;
  updateForm: StatusUpdateRequest = { status: 'APPROVED', scheduledDate: '', adminNotes: '' };
  updating = false;
  updateError = '';
  today = new Date().toISOString().split('T')[0];

  constructor(
    public auth: AuthService,
    private adminService: AdminService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(p => {
      this.filterStatus = p['status'] || '';
      this.load();
    });
  }

  load(): void {
    this.loading = true;
    this.adminService.getAllRequests(this.filterStatus || undefined).subscribe({
      next: res => { this.requests = res.data || []; this.loading = false; },
      error: () => this.loading = false
    });
  }

  openModal(r: WasteRequest): void {
    this.selected = r;
    this.updateForm = { status: 'APPROVED', scheduledDate: '', adminNotes: r.adminNotes || '' };
    this.updateError = '';
  }

  closeModal(): void {
    this.selected = null;
  }

  updateStatus(): void {
    if (this.updateForm.status === 'SCHEDULED' && !this.updateForm.scheduledDate) {
      this.updateError = 'Please select a scheduled date.'; return;
    }
    this.updating = true;
    this.updateError = '';

    const payload: StatusUpdateRequest = {
      status: this.updateForm.status,
      adminNotes: this.updateForm.adminNotes || undefined,
      scheduledDate: this.updateForm.scheduledDate || undefined
    };

    this.adminService.updateStatus(this.selected!.id!, payload).subscribe({
      next: () => {
        this.updating = false;
        this.closeModal();
        this.load();
      },
      error: err => {
        this.updating = false;
        this.updateError = err.error?.message || 'Update failed.';
      }
    });
  }
}
