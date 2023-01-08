import { Text, TextInput, Pressable, View, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFonts } from 'expo-font';

import styles from '../Styles/styles';

import axios from 'axios';

export default function InventoryView({ navigation }) {
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [removeModalShow, setRemoveModalShow] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [amount, setAmount] = useState(1);

    const [loaded] = useFonts({
        Poppins: require('../assets/fonts/Poppins-Medium.ttf'),
        Poppins_light: require('../assets/fonts/Poppins-Light.ttf'),
        Poppins_bold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    });

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

    const handleRemove = async() => {
        const email = await AsyncStorage.getItem('@email');
        const token = await AsyncStorage.getItem('@token');
        await axios.post('http://139.144.72.93:8000/api/inventory/remove', { email: email, code: selectedProduct.product.code, amount: amount},  
            {headers: {
                'Authorization': 'Bearer ' + token,
            }
        });

        getProducts();
        setRemoveModalShow(false);
        setSelectedProduct(null);
    }

    if (!loaded) {
        return null;
    }

    return(
        <SafeAreaView>
            {!removeModalShow && 
            <View style={{height: '100%'}}>
                <View style={{ height: "90%", alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                        {show && products.map(product => {
                            return (
                                <View key={product.id} style={styles.productCard}>
                                    <Text style={[styles.textDark, {position: "absolute", left: 5, width: '100%', lineHeight: 16, top: 10}]}>{product.product.name}</Text>
                                    <Text style={[styles.textDark, {position: "absolute", left: 5, width: '100%', bottom: 10}]}>{product.count}</Text>
                                    <View style={{position: 'absolute', right: 5, bottom: 5}}>
                                        <Pressable style={styles.removeButton} onPress={async () => {
                                            setSelectedProduct(product);
                                            setRemoveModalShow(true);
                                        }}><Text style={styles.textLight}>Remove item</Text></Pressable>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </View>
                <Pressable style={styles.button} onPress={() => { getProducts(); }}>
                    <Text style={styles.text}>Refresh</Text>
                </Pressable>
            </View>}

            {removeModalShow && 
                <View style={styles.modalView}>
                    <View style={styles.container}>
                        <Text style={styles.headerText}>{selectedProduct.count} {selectedProduct.product.name}'s are in your inventory</Text>
                        <Text style={styles.headerText}></Text>
                    </View>
                    <SafeAreaView style={{width: "100%", alignItems: 'center', justifyContent: 'center'}}>
                        <Text>Amount</Text>
                        <TextInput
                            style={{padding: 10, borderBottomWidth: 1}}
                            value={amount}
                            onChangeText={text => setAmount(text)}
                        />
                        <Pressable style={styles.button} onPress={handleRemove}>
                            <Text style={styles.text}>Remove from your inventory</Text>
                        </Pressable>
                        <Pressable style={styles.button} onPress={() => setRemoveModalShow(false)}>
                            <Text style={styles.text}>Cancel</Text>
                        </Pressable>
                    </SafeAreaView>
                </View>
            }
        </SafeAreaView>
    );
}