import mongoose from 'mongoose';

// Schema definition for a Task document in MongoDB
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
    default: null,
  },
  userId: {
    type: String,
    required: true, // Required to associate the task with a specific user
  },
});

// Export the model with a consistent name for mocking and reuse
export const TaskModel = mongoose.model('Task', taskSchema);
