// src/pages/RegisterScreen.tsx

import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { TextInput, Button, Text, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { registerStyles } from '../styles/register.styles';
import { useRegister } from '../hooks/useRegister';

export default function RegisterScreen() {
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Navigation and registration hook
  const navigation = useNavigation();
  const { register, loading } = useRegister();

  // Handle form submit
  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Missing fields', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Passwords do not match');
      return;
    }

    register(email, password);
  };

  return (
    <View style={registerStyles.container}>
      <Title style={registerStyles.title}>Create Account</Title>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={registerStyles.input}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={registerStyles.input}
      />

      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={registerStyles.input}
      />

      <Button
        mode="contained"
        onPress={handleRegister}
        loading={loading}
        disabled={loading}
        style={registerStyles.button}
        contentStyle={registerStyles.buttonContent}
      >
        Sign Up
      </Button>

      <Text
        style={registerStyles.link}
        onPress={() => navigation.navigate('Login' as never)}
      >
        Already have an account? Sign in
      </Text>
    </View>
  );
}
