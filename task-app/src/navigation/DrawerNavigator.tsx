// src/navigation/DrawerNavigator.tsx

import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button } from 'react-native-paper';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

// Import both screen components from the pages folder
import TasksScreen from '../pages/TasksScreen';
import CompletedTasksScreen from '../pages/CompletedTasksScreen';

// Create the drawer navigator instance
const Drawer = createDrawerNavigator();

/**
  DrawerNavigator
  Displays two main sections:
  - Tasks: active tasks
  - Completed: completed tasks
 */
const DrawerNavigator = () => {
  const navigation = useNavigation<any>();

  // Function to handle Firebase sign out and navigate to Login screen
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigation.replace('Login'); // Redirect to login after signing out
      })
      .catch((error) => {
        console.error('Sign out error:', error);
      });
  };

  return (
    <Drawer.Navigator
      initialRouteName="Tasks"
      screenOptions={{
        // Add a Sign Out button on the top right of the header
        headerRight: () => (
          <Button
            onPress={handleSignOut}
            mode="contained"
            compact
            style={{
              marginRight: 12,
              backgroundColor: '#ff5252',
              borderRadius: 20,
              paddingHorizontal: 12,
            }}
            labelStyle={{ color: 'white', fontSize: 14 }}
          >
            Sign Out
          </Button>
        ),
      }}
    >
      {/* Tasks screen */}
      <Drawer.Screen name="Tasks" component={TasksScreen} />

      {/* Completed tasks screen */}
      <Drawer.Screen name="Completed" component={CompletedTasksScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
