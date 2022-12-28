import React from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Scanner from './scanner/Scanner';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import NotLoggedIn from './views/NotLoggedInView';

export default function App() {

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{title: 'StockUp'}} name="Home" component={HomeView} />
        <Stack.Screen options={{title: 'StockUp'}} name="Scanner" component={Scanner} />
        <Stack.Screen options={{title: 'StockUp'}} name="Login" component={LoginView} />
        <Stack.Screen options={{title: 'StockUp'}} name="NotLoggedIn" component={NotLoggedIn} />
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