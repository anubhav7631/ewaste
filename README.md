# ♻️ Smart e-Waste Collection & Management System

## Prerequisites

| Tool         | Version  | Download |
|--------------|----------|----------|
| Java JDK     | 17+      | https://adoptium.net |
| Maven        | 3.8+     | https://maven.apache.org |
| Node.js      | 18+      | https://nodejs.org |
| MySQL        | 8.0+     | https://dev.mysql.com/downloads |
| Angular CLI  | 17+      | `npm install -g @angular/cli` |

---

## ⚡ Quick Start (3 Steps)

### Step 1 — MySQL Setup

Open MySQL and run:
```sql
CREATE DATABASE ewaste_db;
```
> Tables are created automatically by Spring Boot on first run.

---

### Step 2 — Start Backend (Spring Boot)

**First**, edit `backend/src/main/resources/application.properties`:
```properties
spring.datasource.username=root          # your MySQL username
spring.datasource.password=root          # your MySQL password
```

**Then run:**
```bash
cd backend
mvn spring-boot:run
```

Backend starts at: **http://localhost:8080**

On first startup, a default admin is created automatically:
- **Email:** admin@ewaste.com
- **Password:** Admin@123

---

### Step 3 — Start Frontend (Angular)

```bash
cd frontend
npm install
ng serve
```

Frontend starts at: **http://localhost:4200**

---

## 🔐 Login Credentials

| Role  | Email               | Password   |
|-------|---------------------|------------|
| Admin | admin@ewaste.com    | Admin@123  |
| User  | Register a new account at /register |

---

## 📁 Project Structure

```
ewaste/
├── backend/                          ← Spring Boot 3 (Java 17)
│   ├── pom.xml
│   └── src/main/java/com/ewaste/
│       ├── EwasteApplication.java    ← Entry point
│       ├── config/
│       │   ├── SecurityConfig.java   ← JWT + Spring Security
│       │   ├── CorsConfig.java       ← Allow Angular origin
│       │   ├── DataInitializer.java  ← Seeds admin on startup
│       │   ├── GlobalExceptionHandler.java
│       │   └── WebMvcConfig.java     ← Serves uploaded files
│       ├── controller/
│       │   ├── AuthController.java   ← POST /api/auth/login, /register
│       │   ├── UserController.java   ← POST/GET /api/user/requests
│       │   └── AdminController.java  ← GET/PUT /api/admin/requests
│       ├── dto/
│       │   ├── LoginRequest.java
│       │   ├── RegisterRequest.java
│       │   ├── AuthResponse.java
│       │   ├── WasteRequestDto.java
│       │   ├── StatusUpdateRequest.java
│       │   └── ApiResponse.java
│       ├── entity/
│       │   ├── User.java
│       │   └── WasteRequest.java
│       ├── enums/
│       │   ├── Role.java             ← ROLE_USER, ROLE_ADMIN
│       │   └── RequestStatus.java   ← PENDING, APPROVED, REJECTED, SCHEDULED, COMPLETED
│       ├── repository/
│       │   ├── UserRepository.java
│       │   └── WasteRequestRepository.java
│       ├── security/
│       │   ├── JwtUtil.java          ← Token generation & validation
│       │   └── JwtAuthFilter.java    ← Intercepts every request
│       └── service/
│           ├── AuthService.java
│           ├── WasteRequestService.java
│           └── EmailService.java
│
├── frontend/                         ← Angular 17 (Standalone)
│   ├── package.json
│   ├── angular.json
│   ├── proxy.conf.json              ← Proxies /api to :8080
│   └── src/app/
│       ├── app.component.ts
│       ├── app.routes.ts
│       ├── app.config.ts
│       ├── components/
│       │   ├── auth/login/          ← Login page
│       │   ├── auth/register/       ← Register page
│       │   ├── user/dashboard/      ← User home with stats
│       │   ├── user/submit-request/ ← e-Waste submission form
│       │   ├── user/my-requests/    ← Request history table
│       │   ├── admin/dashboard/     ← Admin stats overview
│       │   └── admin/requests/      ← Request management + modal
│       ├── models/
│       │   ├── user.model.ts
│       │   └── waste-request.model.ts
│       ├── services/
│       │   ├── auth.service.ts
│       │   ├── waste.service.ts
│       │   └── admin.service.ts
│       ├── interceptors/
│       │   └── jwt.interceptor.ts   ← Attaches Bearer token
│       └── guards/
│           └── auth.guard.ts        ← authGuard, adminGuard, guestGuard
│
└── database/
    └── setup.sql                    ← Optional: manual schema creation
```

---

## 🔌 API Endpoints

### Auth (Public)
| Method | Endpoint              | Description      |
|--------|-----------------------|------------------|
| POST   | /api/auth/register    | Register user    |
| POST   | /api/auth/login       | Login → JWT      |

### User (Authenticated)
| Method | Endpoint              | Description           |
|--------|-----------------------|-----------------------|
| POST   | /api/user/requests    | Submit e-waste request (multipart) |
| GET    | /api/user/requests    | Get my requests        |

### Admin (ROLE_ADMIN only)
| Method | Endpoint                        | Description                    |
|--------|---------------------------------|--------------------------------|
| GET    | /api/admin/requests             | Get all requests (filter by status) |
| GET    | /api/admin/requests/{id}        | Get single request             |
| PUT    | /api/admin/requests/{id}/status | Approve/Reject/Schedule/Complete |

---

## 🔄 Process Flow

```
User Login → Submit e-Waste Request → Email Confirmation Sent
     ↓
Admin Reviews → Approve / Reject → Email Notification
     ↓
Admin Schedules Pickup Date → Email Notification
     ↓
Collection Done → Admin Marks Completed → Email Notification
```

---

## 📧 Email Setup (Optional)

To enable email notifications, update `application.properties`:
```properties
spring.mail.username=your_gmail@gmail.com
spring.mail.password=your_16_char_app_password
```
> Use a Gmail App Password (not your main password).
> Gmail → Account → Security → 2-Step Verification → App Passwords

If email is not configured, the app still works — emails fail silently (logged as warnings).

---

## 🐛 Troubleshooting

**Port 8080 in use:**
```properties
# Add to application.properties
server.port=8081
```

**MySQL connection refused:**
- Ensure MySQL service is running
- Check username/password in `application.properties`

**Angular "ng: command not found":**
```bash
npm install -g @angular/cli
```

**CORS errors in browser:**
- Ensure backend is running on port 8080
- Ensure Angular proxy (`proxy.conf.json`) is active via `ng serve`
