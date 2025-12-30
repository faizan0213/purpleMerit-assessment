# User Management System

A full-stack MERN application for managing users with authentication, role-based access control, and admin dashboard.

## Features

- User authentication (JWT)
- Admin dashboard (view/manage users)
- User profile management
- Role-based access (admin/user)
- Password strength validation
- Pagination (10 users per page)
- Form validation with error messages
- Responsive design

## Tech Stack

**Frontend:** React 18, React Router v6, Axios, Vite  
**Backend:** Node.js, Express, MongoDB, JWT, bcrypt  
**Database:** MongoDB Atlas  
**Testing:** 26 unit tests  
**Deployment:** Vercel (frontend), Render (backend)

## Setup

### Frontend

```bash
git clone <repo>
cd frontend
npm install
cp .env.example .env
```

Update `.env`:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

```bash
npm run dev      # http://localhost:5173
```

### Backend

```bash
git clone <backend-repo>
npm install
cp .env.example .env
```

Add to `.env`:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

```bash
npm run dev
```

## Environment Variables

**Frontend (.env):**
```
VITE_API_BASE_URL=https://user-system-backend-13jr.onrender.com/api
```

**Backend (.env):**
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=<min 32 chars>
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

## Deployment

### Vercel (Frontend)
- Root Directory: `.`
- Build Command: `npm run build`
- Output Directory: `dist`
- Add env var: `VITE_API_BASE_URL`

### Render (Backend)
- Build: `npm install`
- Start: `npm start`
- Add env vars: `MONGODB_URI`, `JWT_SECRET`, `CORS_ORIGIN`

### MongoDB Atlas
- Create cluster → Get connection string → Add to backend `.env`

## API Endpoints

### Auth
- `POST /auth/register` - Create account
- `POST /auth/login` - Login
- `GET /auth/me` - Get current user

### Users (Admin)
- `GET /users?page=1&limit=10` - List all users
- `PATCH /users/{id}/status` - Activate/deactivate user

### Profile
- `PUT /users/profile` - Update profile
- `PUT /users/change-password` - Change password

## Testing

```bash
npm test                  # Run all tests (26 tests)
npm run test:validation   # Form validation tests
npm run test:auth         # Auth context tests
npm run test:routes       # Protected routes tests
npm run test:api          # API interaction tests
```

## Project Structure

```
src/
├── api/          # Axios config & interceptors
├── components/   # Navbar, ProtectedRoute, Modal
├── context/      # Auth context
├── pages/        # Login, Signup, Dashboard, Profile
├── styles/       # CSS files
├── test/         # Unit tests
└── App.jsx       # Main app
```

## Deployment Links

| Service | URL |
|---------|-----|
| Frontend | [https://user-system-frontened.vercel.app/] |
| Backend API | https://user-system-backend-13jr.onrender.com |
| Database | MongoDB Atlas |

## Security

- JWT authentication
- Password hashing (bcrypt)
- Protected routes & API endpoints
- Input validation
- CORS configured
- Environment variables for secrets

## Commands

```bash
npm run dev      # Development
npm run build    # Production build
npm run lint     # Linter
npm test         # Run tests
```

---

**Status:** ✅ Production Ready  
**Deadline:** Dec 31, 2025
