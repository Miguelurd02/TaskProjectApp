// src/services/api.ts

// Replace with your local IP address to allow access from mobile devices
const BASE_URL = 'http://localhost:3000/api';

// Fetch tasks from backend using a Firebase ID token for authentication
export const getTasks = async (token: string) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }

  return response.json();
};

// Create a new task using POST with Firebase token
export const createTask = async (
  token: string,
  task: { title: string; description?: string }
) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error('Failed to create task');
  }

  return response.json();
};

// Delete a task by ID using DELETE
export const deleteTask = async (id: string, token: string) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete task');
  }
};

// Mark task as completed using PATCH
export const completeTask = async (id: string, token: string) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}/complete`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ completed: true }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to complete task');
  }

  return response.json();
};

// Update a task using PUT
export const updateTask = async (
  id: string,
  token: string,
  updates: { title: string; description?: string }
) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update task');
  }

  return response.json();
};

// Register a new user using the same BASE_URL
export const registerUser = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Registration failed');
  }

  return response.json();
};
