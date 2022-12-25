import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Scanner from './scanner/Scanner';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeView} />
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="Login" component={LoginView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      justifyContent: 'center',
  }
});