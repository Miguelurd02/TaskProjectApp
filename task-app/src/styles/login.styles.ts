import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
  // Main container with centered content
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#e6f7ff', // light sky blue background
  },

  // Title centered with spacing
  title: {
    textAlign: 'center',
    marginBottom: 32,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007acc', // medium blue
  },

  // Common spacing for input fields
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },

  // Button style
  button: {
    marginTop: 8,
    borderRadius: 6,
  },

  // Inner content of the button (padding and background)
  buttonContent: {
    paddingVertical: 8,
    backgroundColor: '#00bfff', // bright sky blue
  },

  // Navigation link under the button
  link: {
    textAlign: 'center',
    marginTop: 24,
    color: '#007acc',
    textDecorationLine: 'underline',
  },
});
