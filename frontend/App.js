import React, { useState, useEffect } from 'react';

import styles from './Styles/styles';

import { Text, View } from 'react-native';

import { useFonts } from 'expo-font';

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
import Header from './Components/Header';

import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Home(){
  const [showRealApp, setShowRealApp] =  useState(false);

  const slides = [
    {
      key: 1,
      title: 'How to use the app',
      text: 'When you go shopping use the scanner to keep track of what you buy',
      image: <BarcodeSvg color='white' width={150} height={150}/>,
      backgroundColor: '#59b2ab',
    },
    {
      key: 2,
      title: 'Your inventory',
      text: 'In the inventory tab you can see what items you still have at home',
      image: <BoxesSvg color='white' width={150} height={150}/>,
      backgroundColor: '#febe29',
    },
    {
      key: 3,
      title: 'Wishlist',
      text: 'At last you can add items you removed from your inventory to your wishlist if you want to see wat you need while shopping',
      image: <HouseSvg color='white' width={150} height={150}/>,
      backgroundColor: '#22bcb5',
    }
  ];

  renderItem = ({ item }) => {
    return (
      <View style={[styles.slide, {backgroundColor: item.backgroundColor}]}>
        <Text style={styles.slideTitle}>{item.title}</Text>
        <View style={{width: '100%', height: '50%', justifyContent: 'center', alignItems: 'center'}}>{item.image}</View>
        <Text style={styles.slideText}>{item.text}</Text>
      </View>
    );
  }

  onDone = async () => {
    await AsyncStorage.setItem('@useRealApp', 'true');
    setShowRealApp(true);
  }

  useEffect(() => {
    async function getUseRealApp(){
      const useRealApp = await AsyncStorage.getItem('@useRealApp');
      if(useRealApp != undefined){
        setShowRealApp(true);
      }else{
        setShowRealApp(false);
      }
    }

    getUseRealApp();
  }, []);

  if(showRealApp){
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
  }else {
    return <AppIntroSlider renderItem={renderItem} data={slides} onDone={onDone}/>;
  }
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
        <Stack.Screen options={{headerStyle: { backgroundColor: '#204E4A'}, headerTitle: () => null, headerLeft: () => {return <Header/>}}} name="HomeScreen" component={Home} />
        <Stack.Screen options={{headerStyle: { backgroundColor: '#204E4A'}, headerTitle: () => null, headerLeft: () => {return <Header/>}}} name="Login" component={LoginView} />
        <Stack.Screen options={{headerStyle: { backgroundColor: '#204E4A'}, headerTitle: () => {return <Header/>}}} name="Scanner" component={Scanner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}