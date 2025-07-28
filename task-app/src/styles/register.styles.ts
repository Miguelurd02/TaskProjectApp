import { StyleSheet } from 'react-native';

export const registerStyles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#e6f7ff', // light sky blue
  },

  // Title at the top
  title: {
    textAlign: 'center',
    marginBottom: 32,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007acc',
  },

  // Input fields
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },

  // Button container
  button: {
    marginTop: 8,
    borderRadius: 6,
  },

  // Button internal styling
  buttonContent: {
    paddingVertical: 8,
    backgroundColor: '#00bfff',
  },

  // Bottom link to login
  link: {
    textAlign: 'center',
    marginTop: 24,
    color: '#007acc',
    textDecorationLine: 'underline',
  },
});
