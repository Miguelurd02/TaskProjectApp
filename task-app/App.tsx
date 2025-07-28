import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AuthGate from './src/components/AuthGate'; // Replaces AppNavigator to handle session logic

// Root component of the application
export default function App() {
  return (
    // Provides Material Design theming using react-native-paper
    <PaperProvider>
      {/* Renders the authenticated or unauthenticated navigation stack */}
      <AuthGate />
    </PaperProvider>
  );
}
