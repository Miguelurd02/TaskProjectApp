import express from 'express';
import { TaskModel } from '../models/task.model';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

// Get all tasks for the authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const tasks = await TaskModel.find({ userId: req.user?.uid });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving tasks' });
  }
});

// Create a new task and assign it to the authenticated user
router.post('/', authenticateToken, async (req, res) => {
  const { title, description } = req.body;

  try {
    const newTask = new TaskModel({
      title,
      description,
      userId: req.user?.uid
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: 'Error creating task' });
  }
});

// Update a task if it belongs to the authenticated user
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: id, userId: req.user?.uid },
      {
        title,
        description,
        completed,
        completedAt: completed ? new Date() : null
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: 'Error updating task' });
  }
});

// Mark a task as completed (new route)
router.patch('/:id/complete', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const task = await TaskModel.findOneAndUpdate(
      { _id: id, userId: req.user?.uid },
      { completed: true, completedAt: new Date() },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Error completing task' });
  }
});

// Delete a task if it belongs to the authenticated user
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await TaskModel.findOneAndDelete({
      _id: id,
      userId: req.user?.uid
    });

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task' });
  }
});

export default router;
