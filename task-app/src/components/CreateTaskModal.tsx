// src/components/CreateTaskModal.tsx

import React, { useState } from 'react';
import { Modal, View, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { createTaskModalStyles as styles } from '../styles/createTaskModal.styles';
import { createTask } from '../services/api';
import { getAuth } from 'firebase/auth';

interface CreateTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onTaskCreated: () => void;
}

// Modal component for creating a new task with title and description
const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ visible, onClose, onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  // Submit task to backend with Firebase token
  const handleCreateTask = async () => {
    if (!title.trim()) {
      alert('Title is required');
      return;
    }

    setLoading(true);

    try {
      const user = getAuth().currentUser;
      const token = await user?.getIdToken();

      if (!token) throw new Error('Missing authentication token');

      await createTask(token, { title, description });
      onTaskCreated(); // Notify parent to refresh task list
      onClose(); // Close modal
      setTitle('');
      setDescription('');
    } catch (error: any) {
      alert(error.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Create New Task</Text>

          <TextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            testID="title-input"
            data-testid="title-input"
          />

          <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            style={styles.input}
            testID="description-input"
            data-testid="description-input"
          />

          <View style={styles.buttonGroup}>
            <Button
              mode="contained"
              onPress={handleCreateTask}
              loading={loading}
              disabled={loading}
              style={styles.button}
              testID="submit-task-button"
              data-testid="submit-task-button"
            >
              Create
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

export default CreateTaskModal;
