import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import useDatabase from './hooks/useDatabase';

const Provider = require('./context/TodoContext');

export default function App() {
  const isLoadingComplete = useCachedResources();
  const isDBLoadingComplete = useDatabase();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete && !isDBLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider.TodoContextProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </Provider.TodoContextProvider>
      </SafeAreaProvider>
    );
  }
}
 