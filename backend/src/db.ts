// backend/src/db.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get the MongoDB connection URI from environment variables
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  throw new Error('MongoDB connection URI is missing in .env');
}

// Connect to MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit app on DB failure
  }
};
