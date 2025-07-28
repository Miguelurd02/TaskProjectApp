import React, { useEffect, useState } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getTasks } from '../services/api';
import TaskCard from '../components/TaskCard';
import { completedTasksStyles as styles } from '../styles/completed.styles';

// Task type definition from the backend
interface Task {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  completed: boolean;
  completedAt?: string;
}

// Screen to display only completed tasks
export default function CompletedTasksScreen() {
  const [tasks, setTasks] = useState<Task[]>([]); // List of completed tasks
  const [loading, setLoading] = useState(false); // Refresh/loading state
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null); // ID of expanded task

  // Fetch tasks from the backend and filter completed ones
  const fetchCompletedTasks = async () => {
    setLoading(true);
    try {
      const user = getAuth().currentUser;
      const token = await user?.getIdToken();
      if (!token) throw new Error('User token not found');

      const allTasks = await getTasks(token);
      const completed = allTasks.filter((task: Task) => task.completed === true);
      setTasks(completed);
    } catch (error: any) {
      console.error('Error loading completed tasks:', error.message);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle the expanded state of a task
  const toggleExpand = (taskId: string) => {
    setExpandedTaskId((prevId) => (prevId === taskId ? null : taskId));
  };

  // Load tasks on screen mount
  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id}
        refreshing={loading}
        onRefresh={fetchCompletedTasks}
        contentContainerStyle={styles.taskList}
        renderItem={({ item }) => (
          <TaskCard
            task={{
              title: item.title,
              description: item.description,
              createdAt: item.createdAt,
              completed: true,
              completedAt: item.completedAt,
            }}
            isExpanded={expandedTaskId === item._id}
            toggleExpand={() => toggleExpand(item._id)}
            onEdit={() => {}}
            onDelete={() => {}}
            onComplete={() => {}}
            cardStyle={styles.greenCard}
          />
        )}
      />
    </View>
  );
}
