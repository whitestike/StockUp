import React from 'react';

import styles from './Styles/styles';

import { Text, View, StatusBar} from 'react-native';

import { useFonts } from 'expo-font';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import HouseSvg from './Images/house-solid';
import BoxesSvg from './Images/boxes';

import Scanner from './scanner/Scanner';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import InventoryView from './views/InventoryView';

function Home(){

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen options={{ tabBarLabelStyle: {color: '#0F2D2A'}, headerShown: false, tabBarIcon: () => {
        return <HouseSvg/>;
      }}} name="Home" component={HomeView} />
      <Tab.Screen options={{ tabBarLabelStyle: {color: '#0F2D2A'}, headerShown: false, tabBarIcon: () => {
        return <BoxesSvg/>;
      }}} name="Inventory" component={InventoryView} />
    </Tab.Navigator>
  );
}

export default function App() {

  const [loaded] = useFonts({
    Poppins_light: require('./assets/fonts/Poppins-Light.ttf'),
    Poppins_bold: require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return ( 
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen options={{headerStyle: { backgroundColor: '#204E4A'}, headerLeft: () => {
          return (
          <View style={styles.header}>
            <Text style={{ fontSize: 24, color: 'white', fontFamily: 'Poppins_bold', textAlign: 'right'}}>Stock</Text><Text style={{ fontSize: 24, color: 'white', fontFamily: 'Poppins_light', textAlign: 'left'}}>Up</Text>
          </View>);
        }}} name="HomeScreen" component={Home} />
        <Stack.Screen options={{headerStyle: { backgroundColor: '#204E4A'}, headerTitle: () => null, headerLeft: () => {
          return (
          <View style={styles.header}>
            <Text style={{ fontSize: 24, color: 'white', fontFamily: 'Poppins_bold', textAlign: 'right'}}>Stock</Text><Text style={{ fontSize: 24, color: 'white', fontFamily: 'Poppins_light', textAlign: 'left'}}>Up</Text>
          </View>);
        }}} name="Login" component={LoginView} />
        <Stack.Screen options={{headerStyle: { backgroundColor: '#204E4A'}, headerTitle: () => {
          return (
          <View style={styles.header}>
            <Text style={{ fontSize: 24, color: 'white', fontFamily: 'Poppins_bold', textAlign: 'right'}}>Stock</Text><Text style={{ fontSize: 24, color: 'white', fontFamily: 'Poppins_light', textAlign: 'left'}}>Up</Text>
          </View>);
        }}} name="Scanner" component={Scanner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}