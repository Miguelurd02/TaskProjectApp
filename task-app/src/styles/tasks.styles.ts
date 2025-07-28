// src/styles/tasks.styles.ts

import { StyleSheet } from 'react-native';

// Styles for the task list screen
export const tasksStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16, // Padding around the screen
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16, // Spacing below title
    textAlign: 'center',
  },
  addButton: {
    marginBottom: 16,
    borderRadius: 8,
  },
  addButtonContent: {
    paddingVertical: 10,
  },
  taskList: {
    paddingBottom: 100, // Spacing at bottom for scroll
  },
});
