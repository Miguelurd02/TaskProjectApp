import React, { useState, useEffect } from 'react';
import { Modal, View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { createTaskModalStyles as styles } from '../styles/createTaskModal.styles';
import { updateTask } from '../services/api';
import { getAuth } from 'firebase/auth';

// Task type definition
interface Task {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
}

// Props expected by the EditTaskModal component
interface EditTaskModalProps {
  visible: boolean;
  task: Task;
  onClose: () => void;
  onTaskUpdated: () => void;
}

// Modal component used to edit an existing task
const EditTaskModal: React.FC<EditTaskModalProps> = ({
  visible,
  task,
  onClose,
  onTaskUpdated
}) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [loading, setLoading] = useState(false);

  // Update local state if task prop changes
  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
  }, [task]);

  // Submit updated task to backend
  const handleUpdateTask = async () => {
    if (!title.trim()) {
      alert('Title is required');
      return;
    }

    setLoading(true);

    try {
      const user = getAuth().currentUser;
      const token = await user?.getIdToken();
      if (!token) throw new Error('Missing authentication token');

      await updateTask(task._id, token, { title, description });
      onTaskUpdated(); // Notify parent to refresh the task list
      onClose(); // Close modal after update
    } catch (error: any) {
      alert(error.message || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Edit Task</Text>

          <TextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            style={styles.input}
          />

          <View style={styles.buttonGroup}>
            <Button
              mode="contained"
              onPress={handleUpdateTask}
              loading={loading}
              disabled={loading}
              style={styles.button}
            >
              Save
            </Button>

            <Button
              mode="outlined"
              onPress={onClose}
              disabled={loading}
              style={styles.button}
            >
              Cancel
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditTaskModal;
