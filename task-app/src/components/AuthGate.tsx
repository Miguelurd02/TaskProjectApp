import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../config/firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../pages/LoginScreen';
import RegisterScreen from '../pages/RegisterScreen';
import DrawerNavigator from '../navigation/DrawerNavigator'; // ✅ new main screen

// Define all valid routes for the stack navigator
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined; // ✅ changed from "Home" to "Main"
};

// Create the stack navigator with the correct typing
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AuthGate() {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  // Listen for auth state changes on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setChecking(false);
    });

    // Unsubscribe from listener on component unmount
    return () => unsubscribe();
  }, []);

  // Show loading spinner while checking auth state
  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00bfff" />
      </View>
    );
  }

  // Render the navigation stack with initial route based on auth state
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Main' : 'Login'}>
        {/* Public route: Login screen */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        {/* Public route: Register screen */}
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />

        {/* Private route: Main app loaded after successful login */}
        <Stack.Screen
          name="Main"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
