import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-landing",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- ===== NAVBAR ===== -->
    <nav class="lp-nav">
      <div class="lp-nav-inner">
        <div class="lp-logo">
          <span class="lp-logo-icon">♻️</span>
          <span class="lp-logo-text">Smart e-Waste</span>
        </div>
        <div class="lp-nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#stats">Impact</a>
          <a routerLink="/login" class="lp-btn-outline">Login</a>
          <a routerLink="/register" class="lp-btn-solid">Get Started</a>
        </div>
      </div>
    </nav>

    <!-- ===== HERO ===== -->
    <section class="lp-hero">
      <div class="lp-hero-bg"></div>
      <div class="lp-hero-content">
        <div class="lp-hero-badge">🌍 Environmental Responsibility</div>
        <h1 class="lp-hero-title">
          Dispose e-Waste<br />
          <span class="lp-hero-highlight">The Smart Way</span>
        </h1>
        <p class="lp-hero-subtitle">
          A structured platform to schedule e-waste pickup, track disposal
          requests, and contribute to a cleaner, greener environment.
        </p>
        <div class="lp-hero-actions">
          <a routerLink="/register" class="lp-cta-primary">
            🚀 Submit a Request &nbsp; →
          </a>
          <a routerLink="/login" class="lp-cta-secondary"> Sign In </a>
        </div>
        <div class="lp-hero-trust">
          <span>✔ Free to Use</span>
          <span>✔ Secure & Private</span>
          <span>✔ Certified Disposal</span>
        </div>
      </div>

      <div class="lp-hero-visual">
        <div class="lp-device-card">
          <div class="lp-device-icon">💻</div>
          <div class="lp-device-label">Laptops & Desktops</div>
        </div>
        <div class="lp-device-card">
          <div class="lp-device-icon">📱</div>
          <div class="lp-device-label">Mobile Phones</div>
        </div>
        <div class="lp-device-card">
          <div class="lp-device-icon">🖨️</div>
          <div class="lp-device-label">Printers & Scanners</div>
        </div>
        <div class="lp-device-card">
          <div class="lp-device-icon">📺</div>
          <div class="lp-device-label">TVs & Monitors</div>
        </div>
        <div class="lp-device-card">
          <div class="lp-device-icon">❄️</div>
          <div class="lp-device-label">Appliances</div>
        </div>
        <div class="lp-device-card">
          <div class="lp-device-icon">🔋</div>
          <div class="lp-device-label">Batteries & Cables</div>
        </div>
      </div>
    </section>

    <!-- ===== STATS ===== -->
    <section class="lp-stats" id="stats">
      <div class="lp-container">
        <div class="lp-stat-item">
          <div class="lp-stat-number">50M+</div>
          <div class="lp-stat-label">Tonnes of e-Waste Generated Yearly</div>
        </div>
        <div class="lp-stat-divider"></div>
        <div class="lp-stat-item">
          <div class="lp-stat-number">20%</div>
          <div class="lp-stat-label">Of e-Waste is Formally Recycled</div>
        </div>
        <div class="lp-stat-divider"></div>
        <div class="lp-stat-item">
          <div class="lp-stat-number">70+</div>
          <div class="lp-stat-label">Toxic Chemicals Released Improperly</div>
        </div>
        <div class="lp-stat-divider"></div>
        <div class="lp-stat-item">
          <div class="lp-stat-number">₹62K Cr</div>
          <div class="lp-stat-label">Value of Recoverable Materials</div>
        </div>
      </div>
    </section>

    <!-- ===== FEATURES ===== -->
    <section class="lp-features" id="features">
      <div class="lp-container">
        <div class="lp-section-header">
          <h2>Everything You Need</h2>
          <p>
            A complete platform for users and administrators to manage e-waste
            efficiently
          </p>
        </div>

        <div class="lp-features-grid">
          <div class="lp-feature-card">
            <div class="lp-feature-icon" style="background:#e8f5e9">🔐</div>
            <h3>Secure Authentication</h3>
            <p>
              JWT-based login with role separation for users and administrators.
              Your data stays private.
            </p>
          </div>

          <div class="lp-feature-card">
            <div class="lp-feature-icon" style="background:#e3f2fd">📋</div>
            <h3>Easy Request Submission</h3>
            <p>
              Submit disposal requests with device details, preferred pickup
              dates, and optional photos.
            </p>
          </div>

          <div class="lp-feature-card">
            <div class="lp-feature-icon" style="background:#fff3e0">📍</div>
            <h3>Pickup Scheduling</h3>
            <p>
              Admins schedule pickups at your location. Get notified of the
              confirmed date instantly.
            </p>
          </div>

          <div class="lp-feature-card">
            <div class="lp-feature-icon" style="background:#f3e5f5">📊</div>
            <h3>Real-Time Status Tracking</h3>
            <p>
              Track every request from Pending → Approved → Scheduled →
              Completed in real time.
            </p>
          </div>

          <div class="lp-feature-card">
            <div class="lp-feature-icon" style="background:#fce4ec">📧</div>
            <h3>Email Notifications</h3>
            <p>
              Automated emails at every stage — submission, approval,
              scheduling, and completion.
            </p>
          </div>

          <div class="lp-feature-card">
            <div class="lp-feature-icon" style="background:#e0f2f1">⚙️</div>
            <h3>Admin Dashboard</h3>
            <p>
              Centralized panel for admins to manage, filter, approve, and
              schedule all requests.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== HOW IT WORKS ===== -->
    <section class="lp-how" id="how-it-works">
      <div class="lp-container">
        <div class="lp-section-header">
          <h2>How It Works</h2>
          <p>Simple 4-step process to dispose your e-waste responsibly</p>
        </div>

        <div class="lp-steps">
          <div class="lp-step">
            <div class="lp-step-number">01</div>
            <div class="lp-step-icon">👤</div>
            <h3>Register & Login</h3>
            <p>Create a free account and log in to the platform securely.</p>
          </div>
          <div class="lp-step-arrow">→</div>

          <div class="lp-step">
            <div class="lp-step-number">02</div>
            <div class="lp-step-icon">📝</div>
            <h3>Submit Request</h3>
            <p>
              Fill in device details, quantity, address, and preferred pickup
              date.
            </p>
          </div>
          <div class="lp-step-arrow">→</div>

          <div class="lp-step">
            <div class="lp-step-number">03</div>
            <div class="lp-step-icon">✅</div>
            <h3>Admin Reviews</h3>
            <p>
              Our team reviews, approves, and schedules a pickup at your
              location.
            </p>
          </div>
          <div class="lp-step-arrow">→</div>

          <div class="lp-step">
            <div class="lp-step-number">04</div>
            <div class="lp-step-icon">♻️</div>
            <h3>Safe Disposal</h3>
            <p>
              E-waste is collected and disposed through certified recycling
              channels.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== DEVICES ACCEPTED ===== -->
    <section class="lp-devices">
      <div class="lp-container">
        <div class="lp-section-header">
          <h2>Devices We Accept</h2>
          <p>We handle all categories of electronic waste</p>
        </div>

        <div class="lp-devices-grid">
          <div class="lp-device-item" *ngFor="let d of devices">
            <span class="lp-device-item-icon">{{ d.icon }}</span>
            <span>{{ d.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== CTA BANNER ===== -->
    <section class="lp-cta-section">
      <div class="lp-container">
        <div class="lp-cta-box">
          <h2>Ready to Dispose Responsibly?</h2>
          <p>
            Join thousands of users who are making a difference. It's free,
            easy, and impactful.
          </p>
          <div class="lp-cta-actions">
            <a routerLink="/register" class="lp-cta-primary"
              >Create Free Account</a
            >
            <a
              routerLink="/login"
              class="lp-cta-secondary"
              style="color:white; border-color:rgba(255,255,255,0.5)"
            >
              Already have an account?
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== FOOTER ===== -->
    <footer class="lp-footer">
      <div class="lp-container">
        <div class="lp-footer-inner">
          <div class="lp-footer-brand">
            <span style="font-size:1.5rem">♻️</span>
            <span class="lp-logo-text">Smart e-Waste</span>
          </div>
          <div class="lp-footer-links">
            <a routerLink="/login">Login</a>
            <a routerLink="/register">Register</a>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
          </div>
          <div class="lp-footer-copy">
            © 2025 Smart e-Waste Collection & Management System. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      /* ===== Reset & Base ===== */
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      /* ===== NAVBAR ===== */
      .lp-nav {
        position: sticky;
        top: 0;
        z-index: 200;
        background: rgba(255, 255, 255, 0.97);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid #e8f5e9;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
      }
      .lp-nav-inner {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
        height: 68px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .lp-logo {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .lp-logo-icon {
        font-size: 1.8rem;
      }
      .lp-logo-text {
        font-size: 1.15rem;
        font-weight: 700;
        color: #1b5e20;
        font-family: "Inter", sans-serif;
      }
      .lp-nav-links {
        display: flex;
        align-items: center;
        gap: 2rem;
      }
      .lp-nav-links a {
        text-decoration: none;
        color: #444;
        font-size: 0.9rem;
        font-weight: 500;
        font-family: "Inter", sans-serif;
        transition: color 0.2s;
      }
      .lp-nav-links a:hover {
        color: #2e7d32;
      }
      .lp-btn-outline {
        border: 1.5px solid #2e7d32 !important;
        color: #2e7d32 !important;
        padding: 0.45rem 1.2rem;
        border-radius: 6px;
        font-weight: 600 !important;
      }
      .lp-btn-solid {
        background: #2e7d32;
        color: white !important;
        padding: 0.5rem 1.3rem;
        border-radius: 6px;
        font-weight: 600 !important;
        transition: background 0.2s !important;
      }
      .lp-btn-solid:hover {
        background: #1b5e20 !important;
        color: white !important;
      }

      /* ===== HERO ===== */
      .lp-hero {
        position: relative;
        min-height: 88vh;
        display: flex;
        align-items: center;
        overflow: hidden;
        background: linear-gradient(
          135deg,
          #f1f8e9 0%,
          #e8f5e9 40%,
          #c8e6c9 100%
        );
        padding: 4rem 2rem;
        gap: 3rem;
        max-width: 1200px;
        margin: 0 auto;
      }
      .lp-hero-bg {
        position: absolute;
        top: -100px;
        right: -150px;
        width: 600px;
        height: 600px;
        border-radius: 50%;
        background: radial-gradient(
          circle,
          rgba(46, 125, 50, 0.08) 0%,
          transparent 70%
        );
        pointer-events: none;
      }
      .lp-hero-content {
        flex: 1;
        max-width: 580px;
        position: relative;
        z-index: 1;
      }
      .lp-hero-badge {
        display: inline-block;
        background: #e8f5e9;
        color: #2e7d32;
        border: 1px solid #a5d6a7;
        padding: 0.4rem 1rem;
        border-radius: 20px;
        font-size: 0.82rem;
        font-weight: 600;
        margin-bottom: 1.2rem;
        font-family: "Inter", sans-serif;
      }
      .lp-hero-title {
        font-size: 3.4rem;
        font-weight: 800;
        color: #1a1a1a;
        line-height: 1.15;
        margin-bottom: 1.2rem;
        font-family: "Inter", sans-serif;
      }
      .lp-hero-highlight {
        color: #2e7d32;
        position: relative;
      }
      .lp-hero-subtitle {
        font-size: 1.1rem;
        color: #555;
        line-height: 1.7;
        margin-bottom: 2rem;
        font-family: "Inter", sans-serif;
      }
      .lp-hero-actions {
        display: flex;
        gap: 1rem;
        align-items: center;
        margin-bottom: 1.5rem;
        flex-wrap: wrap;
      }
      .lp-cta-primary {
        background: #2e7d32;
        color: white;
        padding: 0.9rem 2rem;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 700;
        font-size: 1rem;
        font-family: "Inter", sans-serif;
        transition: all 0.2s;
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        box-shadow: 0 4px 14px rgba(46, 125, 50, 0.35);
      }
      .lp-cta-primary:hover {
        background: #1b5e20;
        transform: translateY(-1px);
        box-shadow: 0 6px 20px rgba(46, 125, 50, 0.4);
      }
      .lp-cta-secondary {
        color: #2e7d32;
        font-weight: 600;
        text-decoration: none;
        font-size: 0.95rem;
        font-family: "Inter", sans-serif;
        border: 1.5px solid #a5d6a7;
        padding: 0.9rem 1.5rem;
        border-radius: 8px;
        transition: all 0.2s;
      }
      .lp-cta-secondary:hover {
        background: #f1f8e9;
      }
      .lp-hero-trust {
        display: flex;
        gap: 1.5rem;
        font-size: 0.82rem;
        color: #555;
        font-family: "Inter", sans-serif;
        flex-wrap: wrap;
      }
      .lp-hero-trust span {
        font-weight: 500;
      }

      /* Hero Visual */
      .lp-hero-visual {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        flex-shrink: 0;
        width: 320px;
      }
      .lp-device-card {
        background: white;
        border-radius: 12px;
        padding: 1.2rem;
        text-align: center;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        border: 1px solid #e8f5e9;
        transition: transform 0.2s;
      }
      .lp-device-card:hover {
        transform: translateY(-3px);
      }
      .lp-device-icon {
        font-size: 2rem;
        margin-bottom: 0.4rem;
      }
      .lp-device-label {
        font-size: 0.72rem;
        font-weight: 600;
        color: #555;
        font-family: "Inter", sans-serif;
      }

      /* ===== STATS ===== */
      .lp-stats {
        background: linear-gradient(135deg, #1b5e20, #2e7d32);
        padding: 3rem 2rem;
      }
      .lp-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
      }
      .lp-stats .lp-container {
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 2rem;
        flex-wrap: wrap;
        padding: 0;
      }
      .lp-stat-item {
        text-align: center;
        color: white;
      }
      .lp-stat-number {
        font-size: 2.6rem;
        font-weight: 800;
        color: #a5d6a7;
        font-family: "Inter", sans-serif;
        line-height: 1;
        margin-bottom: 0.4rem;
      }
      .lp-stat-label {
        font-size: 0.82rem;
        color: rgba(255, 255, 255, 0.8);
        max-width: 160px;
        font-family: "Inter", sans-serif;
      }
      .lp-stat-divider {
        width: 1px;
        height: 60px;
        background: rgba(255, 255, 255, 0.2);
      }

      /* ===== SECTION HEADER ===== */
      .lp-section-header {
        text-align: center;
        margin-bottom: 3rem;
      }
      .lp-section-header h2 {
        font-size: 2.2rem;
        font-weight: 800;
        color: #1a1a1a;
        margin-bottom: 0.6rem;
        font-family: "Inter", sans-serif;
      }
      .lp-section-header p {
        font-size: 1rem;
        color: #666;
        font-family: "Inter", sans-serif;
      }

      /* ===== FEATURES ===== */
      .lp-features {
        padding: 5rem 2rem;
        background: white;
      }
      .lp-features-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
      }
      .lp-feature-card {
        background: #fafafa;
        border: 1px solid #f0f0f0;
        border-radius: 12px;
        padding: 1.8rem;
        transition: all 0.2s;
      }
      .lp-feature-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
        border-color: #a5d6a7;
      }
      .lp-feature-icon {
        width: 52px;
        height: 52px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.6rem;
        margin-bottom: 1rem;
      }
      .lp-feature-card h3 {
        font-size: 1rem;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 0.5rem;
        font-family: "Inter", sans-serif;
      }
      .lp-feature-card p {
        font-size: 0.875rem;
        color: #666;
        line-height: 1.6;
        font-family: "Inter", sans-serif;
      }

      /* ===== HOW IT WORKS ===== */
      .lp-how {
        padding: 5rem 2rem;
        background: #f9fbe7;
      }
      .lp-steps {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      .lp-step {
        background: white;
        border-radius: 12px;
        padding: 2rem 1.5rem;
        text-align: center;
        width: 200px;
        border: 1px solid #e8f5e9;
        position: relative;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      }
      .lp-step-number {
        position: absolute;
        top: -14px;
        left: 50%;
        transform: translateX(-50%);
        background: #2e7d32;
        color: white;
        font-size: 0.75rem;
        font-weight: 700;
        padding: 0.2rem 0.7rem;
        border-radius: 20px;
        font-family: "Inter", sans-serif;
      }
      .lp-step-icon {
        font-size: 2.5rem;
        margin-bottom: 0.7rem;
        margin-top: 0.5rem;
      }
      .lp-step h3 {
        font-size: 0.95rem;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 0.4rem;
        font-family: "Inter", sans-serif;
      }
      .lp-step p {
        font-size: 0.8rem;
        color: #666;
        line-height: 1.5;
        font-family: "Inter", sans-serif;
      }
      .lp-step-arrow {
        font-size: 1.5rem;
        color: #a5d6a7;
        font-weight: 700;
      }

      /* ===== DEVICES ===== */
      .lp-devices {
        padding: 5rem 2rem;
        background: white;
      }
      .lp-devices-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 1rem;
      }
      .lp-device-item {
        background: #f9fbe7;
        border: 1px solid #dcedc8;
        border-radius: 10px;
        padding: 1.2rem 1rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.85rem;
        font-weight: 500;
        color: #333;
        font-family: "Inter", sans-serif;
        transition: all 0.2s;
      }
      .lp-device-item:hover {
        background: #e8f5e9;
        border-color: #a5d6a7;
        transform: translateY(-2px);
      }
      .lp-device-item-icon {
        font-size: 2rem;
      }

      /* ===== CTA SECTION ===== */
      .lp-cta-section {
        padding: 5rem 2rem;
        background: linear-gradient(135deg, #e8f5e9, #f9fbe7);
      }
      .lp-cta-box {
        background: linear-gradient(135deg, #1b5e20, #2e7d32);
        border-radius: 16px;
        padding: 4rem 3rem;
        text-align: center;
        box-shadow: 0 20px 60px rgba(46, 125, 50, 0.3);
      }
      .lp-cta-box h2 {
        font-size: 2.2rem;
        font-weight: 800;
        color: white;
        margin-bottom: 0.8rem;
        font-family: "Inter", sans-serif;
      }
      .lp-cta-box p {
        color: rgba(255, 255, 255, 0.85);
        font-size: 1rem;
        margin-bottom: 2rem;
        font-family: "Inter", sans-serif;
      }
      .lp-cta-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      .lp-cta-section .lp-cta-primary {
        background: white;
        color: #2e7d32;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
      }
      .lp-cta-section .lp-cta-primary:hover {
        background: #f1f8e9;
        transform: translateY(-1px);
      }
      .lp-cta-section .lp-cta-secondary {
        color: white;
        border: 1.5px solid rgba(255, 255, 255, 0.5);
      }
      .lp-cta-section .lp-cta-secondary:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      /* ===== FOOTER ===== */
      .lp-footer {
        background: #1a1a1a;
        padding: 2rem;
      }
      .lp-footer-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 1rem;
      }
      .lp-footer-brand {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .lp-footer-brand .lp-logo-text {
        color: white;
      }
      .lp-footer-links {
        display: flex;
        gap: 1.5rem;
      }
      .lp-footer-links a {
        color: rgba(255, 255, 255, 0.6);
        text-decoration: none;
        font-size: 0.85rem;
        font-family: "Inter", sans-serif;
        transition: color 0.2s;
      }
      .lp-footer-links a:hover {
        color: white;
      }
      .lp-footer-copy {
        color: rgba(255, 255, 255, 0.4);
        font-size: 0.8rem;
        font-family: "Inter", sans-serif;
      }
    `,
  ],
})
export class LandingComponent {
  devices = [
    { icon: "💻", name: "Laptops" },
    { icon: "🖥️", name: "Desktop PCs" },
    { icon: "📱", name: "Mobile Phones" },
    { icon: "📟", name: "Tablets" },
    { icon: "🖨️", name: "Printers" },
    { icon: "📺", name: "Televisions" },
    { icon: "🖱️", name: "Peripherals" },
    { icon: "❄️", name: "Refrigerators" },
    { icon: "🔋", name: "Batteries" },
    { icon: "🔌", name: "Cables & Chargers" },
  ];
}
