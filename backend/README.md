# Purple User System - Backend

A comprehensive user management system built with Node.js, Express, MongoDB, and JWT authentication. This system provides user authentication, role-based access control (RBAC), and complete user lifecycle management.

## Project Overview

The Purple User System is a full-stack web application that manages user accounts with different roles and permissions. The backend handles authentication, authorization, API endpoints, and database operations. It supports user signup/login, role-based access control, user management (admin functions), and secure password handling.

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js v5.2.1
- **Database**: MongoDB v9.0.2 (via Mongoose ODM)
- **Authentication**: JWT (jsonwebtoken v9.0.3)
- **Password Hashing**: bcryptjs v3.0.3
- **Environment Variables**: dotenv v17.2.3
- **API Validation**: express-validator v7.3.1
- **CORS**: cors v2.8.5
- **Development**: nodemon v3.1.11
- **Testing**: Jest v29.7.0

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas cloud instance)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/PurpleUserSystem.git
   cd PurpleUserSystem
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/purple_user_system
   JWT_SECRET=your_super_secret_key_here
   JWT_EXPIRES_IN=7d
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   # Development mode (with hot reload)
   npm run dev

   # Production mode
   npm start
   ```

   The server will start on `http://localhost:5000`

## Environment Variables

The following environment variables are required in `.env`:

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/dbname` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key` |
| `JWT_EXPIRES_IN` | JWT token expiration time | `7d` |
| `NODE_ENV` | Environment (development/production) | `development` |

## Deployment Instructions

### Backend Deployment (Render)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Deploy backend"
   git push origin main
   ```

2. **Create Render account** and connect GitHub repository
3. **Create Web Service** on Render:
   - Select GitHub repository
   - Build command: `npm install`
   - Start command: `npm start`
   - Add environment variables from `.env`

4. **Deploy** and get public API URL

### Database Deployment (MongoDB Atlas)

1. Create MongoDB Atlas account
2. Create cluster and database
3. Get connection string
4. Update `MONGO_URI` in `.env` with Atlas connection string

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. Register User
- **Endpoint**: `POST /auth/register`
- **Description**: Create a new user account
- **Request Body**:
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "Password123",
    "confirmPassword": "Password123"
  }
  ```
- **Response** (201):
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "65abc123...",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
  ```
- **Validation**:
  - Email must be valid format
  - Password must be at least 6 characters, contain uppercase letter and number
  - Passwords must match

#### 2. Login User
- **Endpoint**: `POST /auth/login`
- **Description**: Authenticate user with email and password
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "Password123"
  }
  ```
- **Response** (200):
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "65abc123...",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
  ```

#### 3. Get Current User
- **Endpoint**: `GET /auth/me`
- **Description**: Get authenticated user's information
- **Headers**: `Authorization: Bearer <token>`
- **Response** (200):
  ```json
  {
    "id": "65abc123...",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active"
  }
  ```

#### 4. Logout User
- **Endpoint**: `POST /auth/logout`
- **Description**: Logout current user
- **Headers**: `Authorization: Bearer <token>`
- **Response** (200):
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

### User Management Endpoints

#### 5. Get All Users (Admin Only)
- **Endpoint**: `GET /users?page=1`
- **Description**: Get paginated list of all users
- **Headers**: `Authorization: Bearer <admin_token>`
- **Query Parameters**:
  - `page` (optional): Page number (default: 1)
- **Response** (200):
  ```json
  {
    "success": true,
    "users": [
      {
        "id": "65abc123...",
        "fullName": "John Doe",
        "email": "john@example.com",
        "role": "user",
        "status": "active"
      }
    ],
    "total": 50,
    "page": 1,
    "totalPages": 5
  }
  ```

#### 6. Update User Status (Admin Only)
- **Endpoint**: `PATCH /users/:id/status`
- **Description**: Toggle user status between active and inactive
- **Headers**: `Authorization: Bearer <admin_token>`
- **URL Parameters**: `id` (user ID)
- **Response** (200):
  ```json
  {
    "message": "User status updated successfully",
    "user": {
      "id": "65abc123...",
      "email": "john@example.com",
      "status": "inactive"
    }
  }
  ```

#### 7. Update User Role (Admin Only)
- **Endpoint**: `PATCH /users/:id/role`
- **Description**: Change user role
- **Headers**: `Authorization: Bearer <admin_token>`
- **URL Parameters**: `id` (user ID)
- **Request Body**:
  ```json
  {
    "role": "admin"
  }
  ```
- **Response** (200):
  ```json
  {
    "message": "User role updated successfully",
    "user": {
      "id": "65abc123...",
      "email": "john@example.com",
      "role": "admin"
    }
  }
  ```

#### 8. Update Own Profile
- **Endpoint**: `PUT /users/profile`
- **Description**: Update user's own profile information
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "fullName": "Jane Doe",
    "email": "jane@example.com"
  }
  ```
- **Response** (200):
  ```json
  {
    "message": "Profile updated successfully",
    "user": {
      "id": "65abc123...",
      "fullName": "Jane Doe",
      "email": "jane@example.com"
    }
  }
  ```

#### 9. Change Password
- **Endpoint**: `PUT /users/change-password`
- **Description**: Change user's password
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "oldPassword": "Password123",
    "newPassword": "NewPassword456",
    "confirmPassword": "NewPassword456"
  }
  ```
- **Response** (200):
  ```json
  {
    "message": "Password updated successfully"
  }
  ```

## Error Responses

All error responses follow this format:
```json
{
  "success": false,
  "status": 400,
  "message": "Error description"
}
```

Common error codes:
- `400` Bad Request - Invalid input or validation failed
- `401` Unauthorized - Missing or invalid token
- `403` Forbidden - Insufficient permissions
- `404` Not Found - Resource not found
- `500` Internal Server Error - Server error

## Testing

Run unit tests:
```bash
npm test
```

This will run all tests in the `tests/` directory and display coverage report.

### Test Coverage
- Email validation
- Password strength validation
- Password matching
- Status toggle logic

## Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  fullName: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed, minlength: 6),
  role: String (enum: ["admin", "user"], default: "user"),
  status: String (enum: ["active", "inactive"], default: "active"),
  lastLogin: Date,
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## Security Features

- JWT-based authentication
- bcryptjs password hashing
- Role-based access control (RBAC)
- Input validation and sanitization
- Protected API routes
- Secure password requirements
- Environment variables for sensitive data
- CORS configuration
 