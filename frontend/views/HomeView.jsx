import React, { useState, useEffect } from 'react';
import { Text, Pressable, StyleSheet, View, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

export default function HomeView({ navigation }) {
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);

    async function getProducts(){
        const email = await AsyncStorage.getItem( '@email' );
        const token = await AsyncStorage.getItem( '@token' );

        let response = await axios.post('http://139.144.72.93:8000/api/inventory/get', { email: email }, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
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
          await AsyncStorage.setItem( '@token', response.data.token);
        }

        getToken();
        getProducts();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{fontSize:24}}>Welcome to StockUp</Text>
            <View>
                <View style={{width: "100%", borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                    <Text style={{fontSize:15, padding: 10, width: "55%", color: 'black'}}>Product Name</Text>
                    <Text style={{fontSize:15, width: "25%", color: 'black'}}>Amount</Text>
                    <Text style={{fontSize:15, width: "20%", color: 'black'}}>Remove</Text>
                </View>
                {show && products.map(product => {
                    return (
                        <View key={product.id} style={{width: "100%", backgroundColor: 'black', borderBottomWidth: 1 , borderColor:'white',flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                            <Text style={{fontSize:15,padding: 10, width: "60%", color: 'white'}}>{product.product.name}</Text>
                            <Text style={{fontSize:15,padding: 10, color: 'white'}}>{product.count}</Text>
                            <Pressable onPress={async () => {
                                let response = await axios.post('http://139.144.72.93:8000/api/inventory/remove', { email: email, password: password },  
                                    {headers: {
                                        'content-type': 'application/json'
                                    }
                                });
                            }}><Text style={{fontSize: 15, color: "white", width: 10}}>X</Text></Pressable>
                        </View>
                    );
                })}
            </View>

            <Pressable style={styles.button} onPress={() => navigation.navigate('Scanner')}>
                <Text style={styles.text}>Go to scanner</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={() => { getProducts(); }}>
                <Text style={styles.text}>Refresh</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'black',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
  });