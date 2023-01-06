import React from 'react';

import styles from './Styles/styles';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import HouseSvg from './Images/house-solid';
import BoxesSvg from './Images/boxes';
import BarcodeSvg from './Images/barcode';

import Scanner from './scanner/Scanner';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import InventoryView from './views/InventoryView';

function Home(){
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen options={{headerShown: false, tabBarIcon: () => {
        return <HouseSvg/>;
      }}} name="Home" component={HomeView} />
      <Tab.Screen options={{tabBarIcon: () => {
        return <BoxesSvg/>;
      }}} name="Inventory" component={InventoryView} />
      <Tab.Screen options={{tabBarIcon: () => {
        return <BarcodeSvg/>;x
      }}} name="Scanner" component={Scanner} />
    </Tab.Navigator>
  );
}

export default function App() {

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{headerShown: false}} name="Home" component={Home} />
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}