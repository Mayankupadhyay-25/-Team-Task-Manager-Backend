# Team Task Manager — Backend

REST API built with Node.js, Express, and MongoDB.

## Live URL

https://team-task-manager-backend-rjp5uo7dz.vercel.app

---

## Tech Stack

| Tech | Version |
|------|---------|
| Node.js | v18+ |
| Express | 5.2.1 |
| MongoDB + Mongoose | 9.6.1 |
| JWT (jsonwebtoken) | 9.0.3 |
| bcryptjs | 3.0.3 |

---

## Project Structure

```
backend/
├── controllers/
│   ├── authController.js
│   ├── projectController.js
│   └── taskController.js
├── middleware/
│   ├── auth.js
│   └── isAdmin.js
├── models/
│   ├── User.js
│   ├── Project.js
│   └── Task.js
├── routes/
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   └── taskRoutes.js
├── .env
├── server.js
└── package.json
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env` file

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/team-task-manager
JWT_SECRET=your_jwt_secret_here
```

### 3. Run the server

```bash
npm run dev     # development (nodemon)
npm start       # production
```

Server runs on `http://localhost:5000`

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and get JWT token |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/projects` | Create a project |
| GET | `/api/projects` | Get all user projects |
| POST | `/api/projects/:id/members` | Add member by email |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks/all/me` | Get all tasks for dashboard |
| GET | `/api/tasks/:projectId` | Get tasks by project |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## Deployment (Vercel)

1. Push to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `MONGO_URI`
   - `JWT_SECRET`

---

## Environment Variables

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
