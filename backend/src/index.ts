// backend/src/index.ts

import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });

import express from 'express';
import cors from 'cors';
import { connectDB } from './db';
import taskRoutes from './routes/tasks.routes';
import authRoutes from './routes/auth.routes';
import { authenticateToken } from './middlewares/auth.middleware';


// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Public route to confirm server is running
app.get('/', (req, res) => {
  res.send('Task Manager API is running');
});

// Protect all task routes with authentication middleware
app.use('/api/tasks', authenticateToken, taskRoutes);

// Auth routes should remain public for login and registration
app.use('/api/auth', authRoutes);

// Start the Express server on the defined port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(cors({
  origin: '*', // O usa '*' para desarrollo
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));