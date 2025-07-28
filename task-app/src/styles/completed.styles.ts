import { StyleSheet } from 'react-native';

// Styles specific to the CompletedTasksScreen
export const completedTasksStyles = StyleSheet.create({
  // Main container for the screen
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },

  // Padding for the list content
  taskList: {
    paddingBottom: 16,
  },

  // Custom background style for completed task cards
  greenCard: {
    backgroundColor: '#d6f5d6', // Light green color
  },
});
