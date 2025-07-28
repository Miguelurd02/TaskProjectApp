// src/hooks/useRegister.ts

import { useState } from 'react';
import { registerUser } from '../services/api';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Custom hook to handle user registration
export const useRegister = () => {
  // Loading and error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Navigation to move to login screen after registration
  const navigation = useNavigation();

  // Registers a new user by calling the backend API
  const register = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await registerUser(email, password);
      Alert.alert('Registration successful', 'You can now log in');
      navigation.navigate('Login' as never);
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      Alert.alert('Error', err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};
