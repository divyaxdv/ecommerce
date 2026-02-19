# Ecommerce Backend API

Node.js + Express.js + PostgreSQL + JWT authentication

## Prerequisites

- Node.js (v14+)
- PostgreSQL (v12+)
- npm or yarn

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Database

Create a PostgreSQL database:

```bash
createdb ecommerce_db
```

### 3. Configure Environment

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Edit `.env` with your PostgreSQL credentials:

```
PORT=5001
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key_here_min_32_chars
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### 4. Start Server

**Development (with auto-reload):**

```bash
npm run dev
```

**Production:**

```bash
npm start
```

Server runs on `http://localhost:5001`

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user (requires JWT)

### Courses

- `GET /api/courses` - List all courses (with pagination)
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (admin only)
- `PUT /api/courses/:id` - Update course (admin only)
- `DELETE /api/courses/:id` - Delete course (admin only)

### Cart

- `POST /api/cart/add` - Add course to cart
- `DELETE /api/cart/:courseId` - Remove from cart
- `GET /api/cart` - Get user's cart

### Orders

- `POST /api/orders/create` - Create order from cart
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order details

## Request Headers

For protected routes, include JWT token:

```
Authorization: Bearer <your_jwt_token>
```

## Example Requests

### Signup

```bash
curl -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"password123"}'
```

### Get Courses

```bash
curl http://localhost:5001/api/courses?page=1&limit=10
```

### Add to Cart

```bash
curl -X POST http://localhost:5001/api/cart/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"courseId":1}'
```

## Database Models

- **User**: id, name, email, password (hashed), role (user/admin)
- **Course**: id, title, description, instructor, price, duration, level, thumbnail, syllabus, rating, studentsEnrolled
- **Cart**: id, userId, courseId
- **Order**: id, userId, courseIds (JSON array), totalPrice, status

## Notes

- Passwords are hashed using bcryptjs
- JWT tokens expire after 7 days (configurable in `.env`)
- All endpoints return consistent JSON response: `{ success: bool, data: {}, message: "" }`
