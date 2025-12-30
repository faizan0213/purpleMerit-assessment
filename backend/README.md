# Backend - User Management API

Node.js + Express API with MongoDB, JWT auth, and role-based access control.

## Tech Stack

- Node.js, Express 5.2
- MongoDB + Mongoose
- JWT authentication
- bcryptjs password hashing
- express-validator for validation
- Jest for testing

## Setup

```bash
npm install

# Create .env
cat > .env << EOF
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
EOF

npm run dev  # http://localhost:5000
```

## Environment Variables

```
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=min_32_chars
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

## Deployment

### Render (Backend)
1. Connect GitHub repo to Render
2. Build: `npm install`
3. Start: `npm start`
4. Add env vars: `MONGO_URI`, `JWT_SECRET`

### MongoDB Atlas
1. Create cluster
2. Get connection string
3. Add to `.env` as `MONGO_URI`

## API Endpoints

**Base URL:** `http://localhost:5000/api`

### Auth
- `POST /auth/register` - Sign up (fullName, email, password, confirmPassword)
- `POST /auth/login` - Login (email, password)
- `GET /auth/me` - Get current user
- `POST /auth/logout` - Logout

### Users (Admin Only)
- `GET /users?page=1` - Get all users with pagination
- `PATCH /users/:id/status` - Toggle user active/inactive
- `PATCH /users/:id/role` - Change user role

### Profile
- `PUT /users/profile` - Update own profile (fullName, email)
- `PUT /users/change-password` - Change password (oldPassword, newPassword, confirmPassword)

### Response Format
```json
{
  "success": true,
  "message": "...",
  "data": { ... }
}
```

**Error Responses:**
```json
{
  "success": false,
  "status": 400,
  "message": "Error description"
}
```

## Testing

```bash
npm test  # Jest with coverage
```

**Test coverage:** Email validation, password strength, RBAC logic

## Database Schema

```javascript
User {
  _id: ObjectId,
  fullName: String (required),
  email: String (required, unique),
  password: String (hashed),
  role: String (enum: ["admin", "user"]),
  status: String (enum: ["active", "inactive"]),
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Security

- JWT authentication with 7d expiry
- bcryptjs hashing (10 salt rounds)
- Role-based access control (admin/user)
- Input validation on all endpoints
- Protected routes with auth middleware
- CORS configured for frontend
- Environment variables for secrets
 