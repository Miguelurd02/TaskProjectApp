// src/pages/TasksScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert, Platform } from 'react-native';
import { Title, Button } from 'react-native-paper';
import { getAuth } from 'firebase/auth';
import { getTasks, deleteTask, completeTask } from '../services/api';
import TaskCard from '../components/TaskCard';
import CreateTaskModal from '../components/CreateTaskModal';
import EditTaskModal from '../components/EditTaskModal';
import { tasksStyles as styles } from '../styles/tasks.styles';

// Define the structure of a task from the backend
interface Task {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  completed: boolean;
  completedAt?: string;
}

// Main screen showing the list of tasks for the logged-in user
export default function TasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  // Load tasks from the backend
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const user = getAuth().currentUser;
      const token = await user?.getIdToken();
      if (!token) throw new Error('User token not found');

      const data = await getTasks(token);
      setTasks(data);
    } catch (error: any) {
      console.error('Failed to fetch tasks:', error.message);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle expansion state for a task
  const toggleExpand = (taskId: string) => {
    setExpandedTaskId((prevId) => (prevId === taskId ? null : taskId));
  };

  // Show edit modal for the selected task
  const handleEdit = (taskId: string) => {
    const selected = tasks.find((t) => t._id === taskId);
    if (selected) {
      setTaskToEdit(selected);
      setShowEditModal(true);
    }
  };

  // Delete a task with confirmation
  const handleDelete = async (taskId: string) => {
    Alert.alert(
      'Confirm deletion',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const user = getAuth().currentUser;
              const token = await user?.getIdToken();
              if (!token) throw new Error('User token not found');

              await deleteTask(taskId, token);
              setTasks((prev) => prev.filter((task) => task._id !== taskId));
            } catch (error: any) {
              console.error('Error deleting task:', error.message);
              Alert.alert('Error', error.message);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  // Mark a task as completed
  const handleComplete = async (taskId: string) => {
    try {
      const user = getAuth().currentUser;
      const token = await user?.getIdToken();
      if (!token) throw new Error('User token not found');

      await completeTask(taskId, token);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error: any) {
      console.error('Error completing task:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter active tasks (not completed)
  const activeTasks = tasks.filter((task) => !task.completed);

  return (
    <View style={styles.container}>
      {/* Add task button with testID for Cypress */}
      <Button
        mode="contained"
        onPress={() => setShowModal(true)}
        style={styles.addButton}
        contentStyle={styles.addButtonContent}
        {...(Platform.OS === 'web' ? { testID: 'add-task-button' } : {})}
      >
        Add New Task +
      </Button>

      {/* Task list */}
      <FlatList
        data={activeTasks}
        keyExtractor={(item) => item._id}
        refreshing={loading}
        onRefresh={fetchTasks}
        contentContainerStyle={styles.taskList}
        renderItem={({ item }) => (
          <TaskCard
            task={{
              title: item.title,
              description: item.description,
              createdAt: item.createdAt,
              completed: item.completed,
              completedAt: item.completedAt,
            }}
            isExpanded={expandedTaskId === item._id}
            toggleExpand={() => toggleExpand(item._id)}
            onEdit={() => handleEdit(item._id)}
            onDelete={() => handleDelete(item._id)}
            onComplete={() => handleComplete(item._id)}
          />
        )}
      />

      {/* Modal to create a task */}
      <CreateTaskModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onTaskCreated={fetchTasks}
      />

      {/* Modal to edit a task */}
      {taskToEdit && (
        <EditTaskModal
          visible={showEditModal}
          task={taskToEdit}
          onClose={() => setShowEditModal(false)}
          onTaskUpdated={fetchTasks}
        />
      )}
    </View>
  );
}
