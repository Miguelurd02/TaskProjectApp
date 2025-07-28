// src/pages/LoginScreen.tsx

import React, { useState } from 'react';
import { Alert, View, Platform } from 'react-native';
import { TextInput, Button, Text, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { loginStyles } from '../styles/login.styles';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function LoginScreen() {
  // Local state for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  // Handle user login with Firebase
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Login successful');
      navigation.navigate('Main' as never); // Navigate to drawer view
    } catch (error: any) {
      Alert.alert('Login failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={loginStyles.container}>
      {/* Title of the screen */}
      <Title style={loginStyles.title}>Sign In</Title>

      {/* Email input with testID for Cypress */}
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={loginStyles.input}
        {...(Platform.OS === 'web' ? { testID: 'email-input' } : {})}
      />

      {/* Password input with testID for Cypress */}
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={loginStyles.input}
        {...(Platform.OS === 'web' ? { testID: 'password-input' } : {})}
      />

      {/* Login button with testID to make Cypress selection accurate */}
      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        style={loginStyles.button}
        contentStyle={loginStyles.buttonContent}
        {...(Platform.OS === 'web' ? { testID: 'login-button' } : {})}
      >
        Sign In
      </Button>

      {/* Navigation to register screen */}
      <Text
        style={loginStyles.link}
        onPress={() => navigation.navigate('Register' as never)}
      >
        Don’t have an account? Sign up
      </Text>
    </View>
  );
}
