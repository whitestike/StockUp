import React, { useState, useEffect } from 'react';
import { Text, Pressable, StyleSheet, View, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

export default function HomeView({ navigation }) {
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [name, setName] = useState(false);

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

          setName(email.split('.')[0]);
    
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
        <SafeAreaView>
            <View style={{ paddingLeft: 10, marginTop: '12%',width: "50%", justifyContent: 'center'}}>
                <Text style={{fontSize:14}}>Welcome {name}</Text>
                <Text style={{fontSize:14}}>to StockUp</Text>
            </View>
            <View style={{ height: "50%", alignItems: 'center', justifyContent: 'center'}}>
                <View style={{width: "100%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                    <Text style={{fontSize:15, padding: 10, width: "55%", color: 'black'}}>Product Name</Text>
                    <Text style={{fontSize:15, width: "25%", color: 'black'}}>Amount</Text>
                    <Text style={{fontSize:15, width: "20%", color: 'black'}}>Remove</Text>
                </View>
                {show && products.map(product => {
                    return (
                        <View key={product.id} style={{width: "100%", backgroundColor: 'black', borderBottomWidth: 1 , borderColor:'white',flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                            <Text style={{fontSize:15,padding: 10, width: "60%", color: 'white'}}>{product.product.name}</Text>
                            <Text style={{fontSize:15,padding: 10, color: 'white'}}>{product.count}</Text>
                            <Pressable style={{backgroundColor:'red', width: 35, height: 40, alignItems: "center", justifyContent: 'center'}} onPress={async () => {
                                const email = await AsyncStorage.getItem('@email');
                                const token = await AsyncStorage.getItem('@token');
                                await axios.post('http://139.144.72.93:8000/api/inventory/remove', { email: email, code: product.product.code },  
                                    {headers: {
                                        'Authorization': 'Bearer ' + token,
                                    }
                                });

                                getProducts();
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