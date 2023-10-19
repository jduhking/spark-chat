
import React, { useCallback } from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import { Provider } from 'react-redux';
import { store } from './src/app/store'
import { RootNavigator } from './src/navigation/'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';


export default function App() {

  const [fontsLoaded] = useFonts({
     'Wendy One': require('./assets/fonts/WendyOne-Regular.ttf')
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
      <Provider store={store}>
        <SafeAreaProvider onLayout={onLayoutRootView}>
            <NavigationContainer
            theme={RootTheme}>
              <RootNavigator />
            </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
  );
}

  const RootTheme = {
    dark: false,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: '#000',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  };
