// backend/src/models/User.ts

import mongoose from 'mongoose';

/*
Defines the schema for users stored in MongoDB.
Each user is also created in Firebase Auth and identified by uid.
*/
const UserSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'users' }
);

// Export the model to be used in routes and controllers
export default mongoose.model('User', UserSchema);
