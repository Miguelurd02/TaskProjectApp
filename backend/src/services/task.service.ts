import { TaskModel } from '../models/task.model';

// Update task by ID and return updated document
export const updateTaskById = async (id: string, updates: any) => {
  return await TaskModel.findByIdAndUpdate(id, updates, { new: true });
};
