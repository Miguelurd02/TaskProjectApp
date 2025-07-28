// src/styles/taskcard.styles.ts

import { StyleSheet } from 'react-native';

// Styles for the task card component
export const taskCardStyles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3, // Android shadow
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // Space between icons
  },
  completeButton: {
    backgroundColor: '#28a745', // Green background
    borderRadius: 6,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  details: {
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    marginBottom: 6,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
});
