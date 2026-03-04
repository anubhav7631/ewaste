import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { WasteService } from "../../../services/waste.service";

@Component({
  selector: "app-submit-request",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <nav class="navbar">
      <span class="brand">♻️ Smart e-Waste System</span>
      <div class="nav-links">
        <a routerLink="/dashboard">Dashboard</a>
        <a routerLink="/my-requests">My Requests</a>
      </div>
    </nav>

    <div class="page-container" style="max-width:720px">
      <div class="page-header">
        <h2>Submit e-Waste Request</h2>
        <a routerLink="/dashboard" class="btn-secondary btn">← Back</a>
      </div>

      <div class="card">
        <div *ngIf="error" class="alert alert-danger">{{ error }}</div>

        <div class="form-row">
          <div class="form-group">
            <label>Device Type *</label>
            <select class="form-control" [(ngModel)]="form.deviceType">
              <option value="">-- Select device --</option>
              <option>Laptop</option>
              <option>Desktop PC</option>
              <option>Mobile Phone</option>
              <option>Tablet</option>
              <option>Printer</option>
              <option>Monitor / TV</option>
              <option>Refrigerator</option>
              <option>Washing Machine</option>
              <option>Air Conditioner</option>
              <option>Microwave / Oven</option>
              <option>Other Electronics</option>
            </select>
          </div>
          <div class="form-group">
            <label>Quantity *</label>
            <input
              class="form-control"
              type="number"
              [(ngModel)]="form.quantity"
              min="1"
              max="50"
            />
          </div>
        </div>

        <div class="form-group">
          <label>Device Description</label>
          <textarea
            class="form-control"
            [(ngModel)]="form.deviceDescription"
            rows="3"
            placeholder="Brand, model, condition, any relevant details..."
          ></textarea>
        </div>

        <div class="form-group">
          <label>Pickup Address *</label>
          <textarea
            class="form-control"
            [(ngModel)]="form.pickupAddress"
            rows="3"
            placeholder="Full address where we should collect the e-waste"
          ></textarea>
        </div>

        <div class="form-group">
          <label>Preferred Pickup Date</label>
          <input
            class="form-control"
            type="date"
            [(ngModel)]="form.preferredDate"
            [min]="today"
          />
        </div>

        <div class="form-group">
          <label>Device Photo (optional, max 10MB)</label>
          <input
            class="form-control"
            type="file"
            accept="image/*"
            (change)="onFile($event)"
          />
          <small style="color:#999; display:block; margin-top:0.3rem">
            Upload a photo of the device to help with assessment
          </small>
        </div>

        <div style="display:flex; gap:1rem; margin-top:1rem">
          <button
            class="btn-primary btn"
            (click)="submit()"
            [disabled]="loading"
          >
            <span *ngIf="loading" class="spinner"></span>
            {{ loading ? "Submitting..." : "📤 Submit Request" }}
          </button>
          <a routerLink="/dashboard" class="btn-secondary btn">Cancel</a>
        </div>
      </div>
    </div>
  `,
})
export class SubmitRequestComponent {
  form = {
    deviceType: "",
    deviceDescription: "",
    quantity: 1,
    pickupAddress: "",
    preferredDate: "",
  };
  selectedFile: File | null = null;
  loading = false;
  error = "";
  today = new Date().toISOString().split("T")[0];

  constructor(
    private wasteService: WasteService,
    private router: Router,
  ) {}

  onFile(e: Event): void {
    const input = e.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] || null;
  }

  submit(): void {
    if (!this.form.deviceType) {
      this.error = "Please select a device type.";
      return;
    }
    if (!this.form.pickupAddress.trim()) {
      this.error = "Pickup address is required.";
      return;
    }
    if (this.form.quantity < 1) {
      this.error = "Quantity must be at least 1.";
      return;
    }

    this.error = "";
    this.loading = true;

    const formData = new FormData();
    const requestBlob = new Blob([JSON.stringify(this.form)], {
      type: "application/json",
    });
    formData.append("request", requestBlob);
    if (this.selectedFile) formData.append("image", this.selectedFile);

    this.wasteService.submitRequest(formData).subscribe({
      next: () => {
        this.loading = false;
        // Auto-navigate to my-requests so user sees the submitted request immediately
        this.router.navigate(["/my-requests"], { state: { submitted: true } });
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || "Submission failed. Try again.";
      },
    });
  }
}
