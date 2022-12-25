import React, { useEffect } from 'react';
import { StyleSheet, AsyncStorage} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Scanner from './scanner/Scanner';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import NotLoggedIn from './views/NotLoggedInView';

export default function App() {

  useEffect(() => {
    async function getToken(){
      AsyncStorage.getItem('token').then((value) => {
          setToken(value);
      });
    }

    getToken();
  }, []);

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeView} />
        <Stack.Screen name="Scanner" component={Scanner} />
        <Stack.Screen name="Login" component={LoginView} />
        <Stack.Screen name="NotLoggedIn" component={NotLoggedIn} />
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