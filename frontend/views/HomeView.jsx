import React, { useState, useEffect } from 'react';
import { Button, Text, View, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

export default function HomeView({ navigation }) {
    const [token, setToken] = useState('');
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);

    async function getProducts(){
        let response = await axios.post('http://139.144.72.93:8000/api/inventory/get', { userId: 1 }, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
        setProducts(response.data.products);
        setShow(true);
    }

    useEffect(() => {
        async function getToken(){
    
          const email = await AsyncStorage.getItem( '@email' );
          const password = await AsyncStorage.getItem( '@password' );
          if(email == null || password == null)
          {
            navigation.navigate('Login');
          }
    
          let response = await axios.post('http://139.144.72.93:8000/api/login_check', { email: email, password: password },  
            {headers: {
              'content-type': 'application/json'
            }
          });
          setToken(response.data.token);
        }

        getProducts();
        getToken();
    }, []);


    if(token != null){
        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Welcome to StockUp</Text>
                <Button title="Go to scanner" onPress={() => navigation.navigate('Scanner')}/>
                {/* <Button title="Logout" onPress={() => {
                    AsyncStorage.removeItem('token')
                    navigation.navigate('NotLoggedIn');
                }}/> */}
                <Button title="Refresh" onPress={() => {
                    getProducts();
                }}/>
                {show && products.map((product) => {
                    <Text>{product.product.name}</Text>
                })}
            </SafeAreaView>
        );
    }
}
