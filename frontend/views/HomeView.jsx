import React, { useState, useEffect } from 'react';
import { Text, Pressable, View, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../Styles/styles';

import axios from 'axios';

export default function HomeView({ navigation }) {
    const [name, setName] = useState(false);

    useEffect(() => {
        async function getToken(){
    
          const email = await AsyncStorage.getItem( '@email' );
          const password = await AsyncStorage.getItem( '@password' );
          if(email == null || password == null)
          {
            navigation.navigate('Login');
          }

          setName(email.split('.')[0]);
    
          let response = await axios.post('http://139.144.72.93:8000/api/login_check', { email: email, password: password },  
            {headers: {
              'content-type': 'application/json'
            }
          });
          await AsyncStorage.setItem( '@token', response.data.token);
        }

        getToken();
    }, []);

    return (
        <SafeAreaView style={{position: 'relative', height: '100%'}}>
            <View style={{ paddingLeft: 10, marginTop: '12%',width: "50%", justifyContent: 'center'}}>
                <Text style={{fontSize:14}}>Welcome {name}</Text>
                <Text style={{fontSize:14}}>to StockUp</Text>
            </View>

            <Pressable style={styles.button} onPress={async () => {
                await AsyncStorage.removeItem( '@email' );
                await AsyncStorage.removeItem( '@password' );
                navigation.navigate('Login')
            }}>
                <Text style={styles.text}>Logout</Text>
            </Pressable>
        </SafeAreaView>
    );
}