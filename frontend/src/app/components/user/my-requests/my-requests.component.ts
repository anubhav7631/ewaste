import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { WasteService } from "../../../services/waste.service";
import { WasteRequest } from "../../../models/waste-request.model";

@Component({
  selector: "app-my-requests",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="navbar">
      <span class="brand">♻️ Smart e-Waste System</span>
      <div class="nav-links">
        <a routerLink="/dashboard">Dashboard</a>
        <a routerLink="/submit-request">+ New Request</a>
      </div>
    </nav>

    <div class="page-container">
      <div class="page-header">
        <h2>My e-Waste Requests</h2>
        <a routerLink="/submit-request" class="btn-primary btn"
          >+ New Request</a
        >
      </div>

      <div *ngIf="justSubmitted" class="alert alert-success">
        ✅ Your request was submitted successfully!
      </div>

      <div class="card">
        <div
          *ngIf="loading"
          style="text-align:center; padding:2rem; color:#999"
        >
          Loading your requests...
        </div>

        <div *ngIf="!loading && requests.length === 0" class="empty-state">
          <div class="empty-icon">📦</div>
          <p>You haven't submitted any requests yet.</p>
          <a
            routerLink="/submit-request"
            class="btn-primary btn"
            style="margin-top:1rem"
          >
            Submit First Request
          </a>
        </div>

        <div class="table-responsive" *ngIf="!loading && requests.length > 0">
          <table class="data-table">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Device</th>
                <th>Qty</th>
                <th>Pickup Address</th>
                <th>Preferred Date</th>
                <th>Scheduled Date</th>
                <th>Status</th>
                <th>Admin Notes</th>
                <th>Submitted On</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let r of requests">
                <td>
                  <strong>#{{ r.id }}</strong>
                </td>
                <td>
                  <strong>{{ r.deviceType }}</strong>
                  <small
                    *ngIf="r.deviceDescription"
                    style="display:block; color:#999; margin-top:2px"
                  >
                    {{
                      r.deviceDescription.length > 40
                        ? (r.deviceDescription | slice: 0 : 40) + "..."
                        : r.deviceDescription
                    }}
                  </small>
                </td>
                <td>{{ r.quantity }}</td>
                <td style="max-width:180px; font-size:0.85rem">
                  {{ r.pickupAddress }}
                </td>
                <td style="white-space:nowrap">{{ r.preferredDate || "—" }}</td>
                <td style="white-space:nowrap; color:#4527a0; font-weight:600">
                  {{ r.scheduledDate || "—" }}
                </td>
                <td>
                  <span [class]="'badge badge-' + r.status">{{
                    r.status
                  }}</span>
                </td>
                <td style="max-width:180px; font-size:0.82rem; color:#555">
                  {{ r.adminNotes || "—" }}
                </td>
                <td style="white-space:nowrap; color:#888; font-size:0.82rem">
                  {{ r.createdAt | date: "dd MMM yyyy" }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class MyRequestsComponent implements OnInit {
  requests: WasteRequest[] = [];
  loading = true;
  justSubmitted = false;

  constructor(
    private wasteService: WasteService,
    private router: Router,
  ) {
    const nav = this.router.getCurrentNavigation();
    this.justSubmitted = nav?.extras?.state?.["submitted"] === true;
  }

  ngOnInit(): void {
    this.wasteService.getMyRequests().subscribe({
      next: (res) => {
        this.requests = res.data || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
