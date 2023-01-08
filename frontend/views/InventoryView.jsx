import { Text, TextInput, Pressable, View, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import ScanCard from '../Components/ScanCard';

import styles from '../Styles/styles';

import axios from 'axios';

export default function InventoryView({ navigation }) {
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [removeModalShow, setRemoveModalShow] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [amount, setAmount] = useState(1);

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
        setSelectedProduct(null);
        setRemoveModalShow(false);
    }

    return(
        <SafeAreaView>
            {!removeModalShow && 
            <View>
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
                                    setSelectedProduct(product);
                                    setRemoveModalShow(true);
                                }}><Text style={{fontSize: 15, color: "white", width: 10}}>X</Text></Pressable>
                            </View>
                        );
                    })}
                </View>
                <Pressable style={styles.button} onPress={() => { getProducts(); }}>
                    <Text style={styles.text}>Refresh</Text>
                </Pressable>
            </View>}

            {removeModalShow && 
                <View>
                    <ScanCard productName={selectedProduct.product.name}/>
                    <ScanCard productName={selectedProduct.count}/>
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