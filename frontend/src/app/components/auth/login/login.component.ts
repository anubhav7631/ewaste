import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div style="text-align:center; margin-bottom:1.5rem">
          <div style="font-size:2.5rem">♻️</div>
          <h1 class="auth-title">Smart e-Waste</h1>
          <p class="auth-subtitle">Sign in to your account</p>
        </div>

        <div *ngIf="error" class="alert alert-danger">{{ error }}</div>

        <div class="form-group">
          <label>Email Address</label>
          <input class="form-control" type="email" [(ngModel)]="email"
                 placeholder="Enter your email" (keyup.enter)="login()" />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input class="form-control" type="password" [(ngModel)]="password"
                 placeholder="Enter your password" (keyup.enter)="login()" />
        </div>

        <button class="btn-primary" style="width:100%; justify-content:center; margin-top:0.5rem"
                (click)="login()" [disabled]="loading">
          <span *ngIf="loading" class="spinner"></span>
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>

        <div class="auth-footer">
          Don't have an account? <a routerLink="/register">Register here</a>
        </div>

        <div style="margin-top:1.2rem; padding:0.8rem; background:#f9fbe7; border-radius:6px; font-size:0.8rem; color:#555">
          <strong>Demo Admin:</strong> admin&#64;ewaste.com / Admin&#64;123
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login(): void {
    if (!this.email || !this.password) { this.error = 'Both fields are required.'; return; }
    this.error = '';
    this.loading = true;

    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate([this.auth.isAdmin() ? '/admin/dashboard' : '/dashboard']);
      },
      error: err => {
        this.loading = false;
        this.error = err.error?.message || 'Invalid email or password.';
      }
    });
  }
}
