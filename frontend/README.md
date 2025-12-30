# Frontend - User Management UI

React 18 + Vite frontend for user management system with JWT auth and role-based UI.

## Features

- User login/signup with validation  
- JWT token management  
- Admin dashboard with user table  
- User profile & password change  
- Role-based navigation  
- Pagination (10 users/page)  
- Modal confirmations & toast notifications  
- Responsive design  
- 26+ unit tests

## Tech Stack

- React 18, React Router v6
- Vite bundler
- Axios for API calls
- React Hot Toast for notifications
- Jest/Vitest for testing

## Setup

```bash
npm install

# Create .env
cat > .env << EOF
VITE_API_BASE_URL=http://localhost:5000/api
EOF

npm run dev  # http://localhost:5173
```

## Environment Variables

```
VITE_API_BASE_URL=http://localhost:5000/api
```

For production: `https://purplemerit-assessment-oq7t.onrender.com/api`

## Deployment

### Vercel

1. Connect GitHub repo
2. Build: `npm run build`
3. Output: `dist`
4. Add env: `VITE_API_BASE_URL=https://purplemerit-assessment-oq7t.onrender.com/api`

## Project Structure

```
src/
├── api/        # Axios config
├── components/ # Navbar, Modal, ProtectedRoute
├── context/    # Auth state
├── pages/      # Login, Signup, Dashboard, Profile
├── styles/     # CSS
├── test/       # Unit tests
└── App.jsx
```

## Testing

```bash
npm test                  # All tests (26)
npm run test:validation   # Form validation
npm run test:auth         # Auth context
npm run test:routes       # Route protection
npm run test:api          # API calls
```

## Commands

```bash
npm run dev      # Dev server
npm run build    # Production build
npm run lint     # ESLint
npm test         # Run tests
```

## Live Deployment

- **Frontend:** https://purple-merit-assessment-kappa.vercel.app
- **Backend API:** https://purplemerit-assessment-oq7t.onrender.com

---

**Status:**  Production Ready
