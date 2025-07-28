import { updateTaskById } from '../services/task.service';
import { TaskModel } from '../models/task.model';

jest.mock('../models/task.model');

describe('updateTaskById', () => {
  it('should update a task and return the updated object', async () => {
    const mockId = 'abc123';
    const updates = { title: 'Updated Title', description: 'Updated Desc' };

    const mockResult = {
      _id: mockId,
      title: 'Updated Title',
      description: 'Updated Desc',
      completed: false,
      createdAt: new Date().toISOString(),
    };

    // Mock TaskModel.findByIdAndUpdate to return the mock result
    (TaskModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockResult);

    const result = await updateTaskById(mockId, updates);

    expect(result).toEqual(mockResult);
    expect(TaskModel.findByIdAndUpdate).toHaveBeenCalledWith(mockId, updates, { new: true });
  });
});
