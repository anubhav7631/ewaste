import { Routes } from "@angular/router";
import { authGuard, adminGuard, guestGuard } from "./guards/auth.guard";

export const routes: Routes = [
  // Landing page — default route
  {
    path: "",
    loadComponent: () =>
      import("./components/landing/landing.component").then(
        (m) => m.LandingComponent,
      ),
  },

  {
    path: "login",
    canActivate: [guestGuard],
    loadComponent: () =>
      import("./components/auth/login/login.component").then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: "register",
    canActivate: [guestGuard],
    loadComponent: () =>
      import("./components/auth/register/register.component").then(
        (m) => m.RegisterComponent,
      ),
  },

  // User
  {
    path: "dashboard",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./components/user/dashboard/dashboard.component").then(
        (m) => m.DashboardComponent,
      ),
  },
  {
    path: "submit-request",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./components/user/submit-request/submit-request.component").then(
        (m) => m.SubmitRequestComponent,
      ),
  },
  {
    path: "my-requests",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./components/user/my-requests/my-requests.component").then(
        (m) => m.MyRequestsComponent,
      ),
  },

  // Admin
  {
    path: "admin/dashboard",
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import("./components/admin/dashboard/admin-dashboard.component").then(
        (m) => m.AdminDashboardComponent,
      ),
  },
  {
    path: "admin/requests",
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import("./components/admin/requests/admin-requests.component").then(
        (m) => m.AdminRequestsComponent,
      ),
  },

  { path: "**", redirectTo: "" },
];
