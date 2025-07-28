// src/styles/createTaskModal.styles.ts

import { StyleSheet } from 'react-native';

// Styles for the modal used to create a new task
export const createTaskModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center', // Center modal vertically
    alignItems: 'center',     // Center modal horizontally
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background
  },
  modal: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});
