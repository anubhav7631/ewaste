import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div style="text-align:center; margin-bottom:1.5rem">
          <div style="font-size:2.5rem">♻️</div>
          <h1 class="auth-title">Create Account</h1>
          <p class="auth-subtitle">Join the Smart e-Waste platform</p>
        </div>

        <div *ngIf="success" class="alert alert-success">
          ✅ Registration successful! <a routerLink="/login">Click here to login</a>
        </div>
        <div *ngIf="error" class="alert alert-danger">{{ error }}</div>

        <div *ngIf="!success">
          <div class="form-row">
            <div class="form-group">
              <label>Full Name *</label>
              <input class="form-control" type="text" [(ngModel)]="form.name" placeholder="Your full name" />
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input class="form-control" type="tel" [(ngModel)]="form.phone" placeholder="Phone number" />
            </div>
          </div>

          <div class="form-group">
            <label>Email Address *</label>
            <input class="form-control" type="email" [(ngModel)]="form.email" placeholder="Email address" />
          </div>

          <div class="form-group">
            <label>Password * <small style="color:#999">(min 6 chars)</small></label>
            <input class="form-control" type="password" [(ngModel)]="form.password" placeholder="Choose a password" />
          </div>

          <div class="form-group">
            <label>Address</label>
            <textarea class="form-control" [(ngModel)]="form.address" placeholder="Your address" rows="2"></textarea>
          </div>

          <button class="btn-primary" style="width:100%; justify-content:center"
                  (click)="register()" [disabled]="loading">
            <span *ngIf="loading" class="spinner"></span>
            {{ loading ? 'Registering...' : 'Create Account' }}
          </button>
        </div>

        <div class="auth-footer">
          Already have an account? <a routerLink="/login">Sign in</a>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  form = { name: '', email: '', password: '', phone: '', address: '' };
  loading = false;
  error = '';
  success = false;

  constructor(private auth: AuthService) {}

  register(): void {
    if (!this.form.name || !this.form.email || !this.form.password) {
      this.error = 'Name, email and password are required.'; return;
    }
    if (this.form.password.length < 6) {
      this.error = 'Password must be at least 6 characters.'; return;
    }
    this.error = '';
    this.loading = true;

    this.auth.register(this.form).subscribe({
      next: () => { this.loading = false; this.success = true; },
      error: err => { this.loading = false; this.error = err.error?.message || 'Registration failed.'; }
    });
  }
}
