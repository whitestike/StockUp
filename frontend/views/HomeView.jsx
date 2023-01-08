import React, { useState, useEffect } from 'react';
import { Text, Pressable, SafeAreaView, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFonts } from 'expo-font';

import styles from '../Styles/styles';

import axios from 'axios';

export default function HomeView({ navigation }) {
    const [name, setName] = useState(false);

    const [loaded] = useFonts({
        Poppins: require('../assets/fonts/Poppins-Medium.ttf'),
        Poppins_light: require('../assets/fonts/Poppins-Light.ttf'),
        Poppins_bold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    });

    useEffect(() => {
        async function getToken(){
    
          const email = await AsyncStorage.getItem( '@email' );
          const password = await AsyncStorage.getItem( '@password' );
          if(email == null || password == null)
          {
            navigation.navigate('Login');
          }

          setName(email.split('.')[0][0].toUpperCase() + email.split('.')[0].slice(1, email.split('.')[0].length));
    
          let response = await axios.post('http://139.144.72.93:8000/api/login_check', { email: email, password: password },  
            {headers: {
              'content-type': 'application/json'
            }
          });
          await AsyncStorage.setItem( '@token', response.data.token);
        }

        getToken();
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <SafeAreaView style={{height: '100%', marginTop: 5, backgroundColor:"white"}}>
            <Pressable style={{ paddingLeft: 10, width: "50%", justifyContent: 'center'}} onPress={async () => {
                await AsyncStorage.removeItem( '@email' );
                await AsyncStorage.removeItem( '@password' );
                navigation.navigate('Login')
            }}>
                <Text style={{  color: '#0F2D2A', fontSize:16, fontFamily: 'Poppins_light', lineHeight: 18}}>Hello</Text>
                <Text style={{  color: '#0F2D2A', fontSize:16, fontFamily: 'Poppins_bold', lineHeight: 18}}>{name}</Text>
            </Pressable>
            <View style={styles.titleContainer}>
                    <Text style={styles.title}>Items you need</Text>
                    <View style={styles.line}></View>
            </View>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Scanner')}>
                <Text style={styles.text}>Scanner</Text>
            </Pressable>
        </SafeAreaView>
    );
}