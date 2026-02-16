# 🚀 Backend Developer Intern - Project Assignment

A **Scalable REST API with Authentication & Role-Based Access Control** built with Node.js, Express, MongoDB, and Vanilla JavaScript frontend.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Scalability Notes](#scalability-notes)

## ✨ Features

### Backend (Primary Focus)
- ✅ User registration & login with JWT authentication
- ✅ Password hashing using bcrypt
- ✅ Role-based access control (User vs Admin)
- ✅ Complete CRUD operations for Tasks
- ✅ API versioning (`/api/v1`)
- ✅ Input validation & sanitization
- ✅ Error handling middleware
- ✅ Rate limiting
- ✅ Security headers (Helmet)
- ✅ CORS configuration
- ✅ MongoDB database with Mongoose ODM
- ✅ API documentation (Swagger/OpenAPI)

### Frontend (Supportive)
- ✅ User registration & login interface
- ✅ Protected dashboard (JWT required)
- ✅ Task CRUD operations interface
- ✅ Admin statistics view
- ✅ Responsive design
- ✅ Toast notifications for user feedback

### Security & Scalability
- ✅ Secure JWT token handling
- ✅ Input sanitization & validation
- ✅ Modular project structure
- ✅ Environment-based configuration
- ✅ Database indexing for performance
- ✅ Request rate limiting

## 🛠 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator
- **Security:** Helmet, CORS, express-rate-limit
- **Documentation:** Swagger (swagger-jsdoc, swagger-ui-express)
- **Logging:** Morgan

### Frontend
- **HTML5, CSS3, Vanilla JavaScript**
- **No framework dependencies** (as per requirements)

## 📁 Project Structure

```
backend-intern-project/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js       # MongoDB connection
│   │   │   └── swagger.js        # Swagger configuration
│   │   ├── controllers/
│   │   │   ├── authController.js # Authentication logic
│   │   │   └── taskController.js # Task CRUD logic
│   │   ├── middleware/
│   │   │   ├── auth.js           # JWT & role-based auth
│   │   │   ├── errorHandler.js   # Error handling
│   │   │   └── validator.js      # Request validation
│   │   ├── models/
│   │   │   ├── User.js           # User schema
│   │   │   └── Task.js           # Task schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js     # Auth endpoints
│   │   │   └── taskRoutes.js     # Task endpoints
│   │   └── server.js             # Express app entry point
│   ├── .env.example              # Environment variables template
│   └── package.json              # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── taskCard.js       # Task card component
│   │   ├── pages/
│   │   │   ├── auth.js           # Authentication page
│   │   │   └── dashboard.js      # Dashboard page
│   │   ├── services/
│   │   │   └── api.js            # API service layer
│   │   ├── styles/
│   │   │   └── style.css         # CSS styles
│   │   └── utils/
│   │       ├── app.js            # App initialization
│   │       ├── auth.js           # Auth utilities
│   │       └── toast.js          # Toast notifications
│   ├── index.html                # Main HTML file
│   └── package.json              # Frontend dependencies
│
└── README.md                     # This file
```

## 📦 Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**

## 🔧 Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd backend-intern-project
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Configuration

1. Create a `.env` file in the `backend` directory:
```bash
cd backend
cp .env.example .env
```

2. Update the `.env` file with your configuration:
```env
PORT=5000
NODE_ENV=development

MONGODB_URI=mongodb://localhost:27017/backend_intern_db

JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d

CORS_ORIGIN=http://localhost:3000

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend Configuration

Update the API base URL in `frontend/src/services/api.js` if needed:
```javascript
const API_BASE_URL = 'http://localhost:5000/api/v1';
```

## 🚀 Running the Application

### Start MongoDB
```bash
# Make sure MongoDB is running
mongod
```

### Start Backend Server
```bash
cd backend
npm run dev
# Or for production:
# npm start
```

The backend server will start on `http://localhost:5000`

### Start Frontend Server
```bash
cd frontend
npm run dev
```

The frontend will be available on `http://localhost:3000`

## 📚 API Documentation

### Access Swagger Documentation
Once the backend is running, visit:
```
http://localhost:5000/api-docs
```

### API Endpoints

#### Authentication
```
POST   /api/v1/auth/register    # Register new user
POST   /api/v1/auth/login       # Login user
GET    /api/v1/auth/me          # Get current user (Protected)
```

#### Tasks
```
GET    /api/v1/tasks            # Get all tasks (Protected)
GET    /api/v1/tasks/:id        # Get single task (Protected)
POST   /api/v1/tasks            # Create task (Protected)
PUT    /api/v1/tasks/:id        # Update task (Protected)
DELETE /api/v1/tasks/:id        # Delete task (Protected)
GET    /api/v1/tasks/stats      # Get statistics (Admin only)
```

### Example Requests

#### Register
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Create Task (with JWT)
```bash
curl -X POST http://localhost:5000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Complete project",
    "description": "Finish the backend intern assignment",
    "priority": "high",
    "status": "in-progress"
  }'
```

## 🧪 Testing

### Manual Testing
1. Use the frontend UI at `http://localhost:3000`
2. Use Swagger UI at `http://localhost:5000/api-docs`
3. Use Postman or curl for API testing

### Automated Tests
```bash
cd backend
npm test
```

## 🌐 Deployment

### Backend Deployment

#### Option 1: Traditional Server
```bash
# On your server
npm install --production
NODE_ENV=production npm start
```

#### Option 2: Docker
```dockerfile
# Example Dockerfile (create in backend directory)
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Frontend Deployment
- Deploy static files to any web server (Nginx, Apache)
- Or use services like Netlify, Vercel, GitHub Pages

### Environment Variables for Production
- Use strong JWT secrets
- Configure MongoDB Atlas for cloud database
- Enable HTTPS
- Set proper CORS origins
- Adjust rate limiting for production traffic

## 📈 Scalability Notes

### Architecture Decisions

1. **Microservices Ready**
   - Modular structure allows easy extraction into microservices
   - Each controller can become a separate service

2. **Caching Strategy** (Optional Implementation)
   - Redis can be added for session management
   - Cache frequently accessed data
   - Example: `npm install redis ioredis`

3. **Load Balancing**
   - Stateless JWT authentication enables horizontal scaling
   - Can use Nginx or AWS ELB for load balancing

4. **Database Optimization**
   - Indexed fields for faster queries
   - Pagination implemented to handle large datasets
   - Connection pooling via Mongoose

5. **Logging & Monitoring** (Recommended additions)
   - Winston for structured logging
   - PM2 for process management
   - New Relic or DataDog for APM

### Scalability Enhancements

```javascript
// Example: Adding Redis cache (optional)
const redis = require('redis');
const client = redis.createClient();

// Cache middleware
const cacheMiddleware = (duration) => async (req, res, next) => {
  const key = req.originalUrl;
  const cachedResponse = await client.get(key);
  
  if (cachedResponse) {
    return res.json(JSON.parse(cachedResponse));
  }
  
  res.originalJson = res.json;
  res.json = (body) => {
    client.setex(key, duration, JSON.stringify(body));
    res.originalJson(body);
  };
  next();
};
```

## 🔐 Security Best Practices

1. **JWT Tokens**
   - Stored securely in localStorage
   - Httponly cookies recommended for production
   - Token expiration implemented

2. **Password Security**
   - Bcrypt hashing with salt rounds
   - Password validation (minimum length)

3. **Input Validation**
   - express-validator for all inputs
   - Mongoose schema validation

4. **Security Headers**
   - Helmet.js for security headers
   - CORS properly configured

5. **Rate Limiting**
   - Prevents brute force attacks
   - Configurable per route

## 📝 License

MIT License - feel free to use this project for learning and development.

## 👨‍💻 Author

**Backend Developer Intern Candidate**

## 🙏 Acknowledgments

- Built as part of Backend Developer Intern assignment
- Expected completion time: 2 hours
- Demonstrates scalable backend architecture
- Production-ready code structure

---

**Note:** This project demonstrates proficiency in:
- RESTful API design
- Authentication & Authorization
- Database design & optimization
- Security best practices
- Scalable architecture
- Clean code principles
- API documentation
