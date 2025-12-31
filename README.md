# Purple Merit - User Management System

A full-stack user management system with JWT authentication, role-based access control, and admin dashboard.

## Tech Stack

**Backend:** Node.js, Express, MongoDB, JWT  
**Frontend:** React 18, Vite, React Router  
**Auth:** JWT + bcryptjs  
**Deployment:** Vercel (frontend), Render (backend), MongoDB Atlas

## Live Deployment

| Service | URL |
|---------|-----|
| **Frontend** | https://purple-merit-assessment-kappa.vercel.app |
| **Backend API** | https://purplemerit-assessment-oq7t.onrender.com |

## Quick Start (Local Development)

### Prerequisites

- Node.js 14+
- MongoDB Atlas account (or local MongoDB)

### Backend

```bash
cd backend
npm install

# Create .env
cat > .env << EOF
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
EOF

npm run dev  # http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install

# Create .env (for local development)
cat > .env << EOF
VITE_API_BASE_URL=http://localhost:5000/api
EOF

npm run dev  # http://localhost:5173
```

For production, use: `VITE_API_BASE_URL=https://purplemerit-assessment-oq7t.onrender.com/api`

## Project Structure

```
.
├── backend/           # Express API
│   ├── controllers/   # Auth & user logic
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API endpoints
│   ├── middlewares/   # Auth validation
│   ├── utils/         # JWT, helpers
│   ├── tests/         # Jest unit tests
│   └── README.md      # Backend docs
├── frontend/          # React app
│   ├── src/
│   │   ├── pages/     # Login, Signup, Dashboard, Profile
│   │   ├── components/ # Navbar, Modal, ProtectedRoute
│   │   ├── context/   # Auth state
│   │   ├── api/       # Axios config
│   │   └── test/      # Unit tests
│   └── README.md      # Frontend docs
└── README.md          # This file
```

## Features

- User registration & login  
- JWT authentication  
- Role-based access control (admin/user)  
- Admin dashboard with user management  
- User profile & password change  
- Pagination (10 users/page)  
- Form validation  
- Responsive design  
- 26+ unit tests

## API Endpoints & Documentation

**Base URL:** `https://purplemerit-assessment-oq7t.onrender.com/api`

**Swagger UI (Local):** `http://localhost:5000/api-docs`

### API Files
- `backend/swagger.yaml` - OpenAPI 3.0 specification (YAML)
- `backend/swagger.json` - OpenAPI 3.0 specification (JSON)
- `backend/API_DOCUMENTATION.json` - Postman collection

See `backend/README.md` for detailed API documentation.

**Quick reference:**
- `POST /api/auth/register` - Sign up
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Current user
- `GET /api/users` - All users (admin only)
- `PATCH /api/users/:id/status` - Toggle user status (admin)
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/change-password` - Change password

## Testing

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test              # All tests
npm run test:auth     # Auth context tests
npm run test:routes   # Route protection tests
npm run test:api      # API integration tests
```

## Deployment

### Backend (Render)

1. Push code to GitHub
2. Create Web Service on Render
3. Connect GitHub repo
4. Build: `npm install`
5. Start: `npm start`
6. Add environment variables:
   - `MONGO_URI=mongodb+srv://...`
   - `JWT_SECRET=your_secret_key`
   - `NODE_ENV=production`

### Frontend (Vercel)

1. Create new project on Vercel
2. Connect GitHub repo
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Add environment variable:
   - `VITE_API_BASE_URL=https://purplemerit-assessment-oq7t.onrender.com/api`

### Database (MongoDB Atlas)

1. Create MongoDB Atlas cluster
2. Generate connection string
3. Use as `MONGO_URI` in backend

## Demo Credentials

**Admin Account:**
- Email: `admin@example.com`
- Password: `Admin123`

**User Account:**
- Email: `user@example.com`
- Password: `User123`

## Environment Variables

### Backend `.env`

```
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=min_32_chars_recommended
JWT_EXPIRES_IN=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend `.env`

**Local Development:**
```
VITE_API_BASE_URL=http://localhost:5000/api
```

**Production (Vercel):**
```
VITE_API_BASE_URL=https://purplemerit-assessment-oq7t.onrender.com/api
```

## Common Commands

```bash
# Backend
cd backend
npm run dev          # Dev server with nodemon
npm start            # Production
npm test             # Run tests with coverage

# Frontend
cd frontend
npm run dev          # Dev server
npm run build        # Production build
npm run lint         # Lint code
npm test             # Run tests
```

## Security

- JWT authentication with 7-day expiry
- bcryptjs password hashing (10 salt rounds)
- Role-based access control (admin/user)
- Input validation on all endpoints
- Protected API routes with middleware
- CORS configured
- Sensitive data in `.env` (excluded from git)

## Notes

- Passwords are hashed with bcryptjs
- JWT tokens expire in 7 days
- Admin role required for user management endpoints
- CORS is configured for both local and production
- All sensitive data stored in `.env` files

## Further Reading

- [Backend README](./backend/README.md) - API docs, schema, security details
- [Frontend README](./frontend/README.md) - Component structure, testing guide

---

**Status:**  Production Ready  
**Last Updated:** Dec 30, 2025  
**Deadline:** Dec 31, 2025
