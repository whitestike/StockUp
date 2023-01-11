import { Text, TextInput, Pressable, View, SafeAreaView, StatusBar, RefreshControl, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFonts } from 'expo-font';

import styles from '../Styles/styles';
import SearchSvg from '../Images/search';

import axios from 'axios';

export default function InventoryView({ navigation }) {
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [removeModalShow, setRemoveModalShow] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [amount, setAmount] = useState('1');
    const [refreshing, setRefreshing] = React.useState(false);
    const [filter, setFilter] = React.useState('');
    const [tags, setTags] = React.useState([]);

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

        let returnProducts = [];

        response.data.products.forEach(product => {
            if(product.product.name.includes(filter))
            {
                returnProducts.push(product);
            }
        });

        setProducts(returnProducts);
        setTags(response.data.tags);
        setShow(true);
        setRefreshing(false);
    }

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

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setFilter('');
        getToken();
        getProducts();
    }, []);

    useEffect(() => {
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
        setAmount('1');
        setRemoveModalShow(false);
        setSelectedProduct(null);
    }

    if (!loaded) {
        return null;
    }

    return(
        <SafeAreaView>
            <StatusBar backgroundColor='#204E4A'/>
            <ScrollView style={{ height: '100%', backgroundColor:"white", position: 'relative' }} refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }>
                {!removeModalShow && 
                <View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Inventory</Text>
                        <View style={styles.line}></View>
                    </View>
                    <View style={{ padding: 5, flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between', marginLeft: '47%', marginBottom: 15, width: '50%', borderRadius: 10, backgroundColor: '#204E4A'}}>
                        <TextInput
                            style={{width: '80%', color: 'white', fontFamily: 'Poppins_light'}}
                            value={filter}
                            onChangeText={text => {
                                setFilter(text);
                                getProducts();
                            }}
                        />
                        <Pressable style={{paddingRight: 5}} onPress={() => {getProducts();}}>
                            <SearchSvg/>
                        </Pressable>
                    </View>
                    <View style={{ height: "90%", alignItems: 'center'}}>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                            {show && 
                                tags.map(tag => {
                                    return (
                                        <View key={tag.id} style={{width: '100%', alignItems: 'center'}}>
                                            <Text style={styles.textLabel}>{tag.name}</Text>
                                            {products.map(product => {
                                                return (
                                                    <View key={product.id} style={{width: '100%', alignItems: 'center'}}>
                                                        {(product.product.tag == tag.name) && 
                                                            <View style={styles.productCard}>
                                                                <View>
                                                                    <View style={styles.containerProductText}><Text style={styles.textLabel}>name</Text><Text style={[styles.textDark, {fontSize: 16}]}>{product.product.name}</Text></View>
                                                                    <View style={styles.containerProductText}><Text style={styles.textLabel}>brand</Text><Text style={[styles.textDark, {fontSize: 16}]}>{product.product.brand}</Text></View>
                                                                    <View style={styles.containerProductText}><Text style={styles.textLabel}>count</Text><Text style={[styles.textDark, {fontSize: 16}]}>{product.count}</Text></View>
                                                                </View>
                                                                <Pressable style={styles.removeButton} onPress={async () => {
                                                                    setSelectedProduct(product);
                                                                    setRemoveModalShow(true);
                                                                }}><Text style={[styles.textLight, {fontSize: 14}]}>Remove</Text></Pressable>
                                                            </View>
                                                        }
                                                    </View>
                                                );
                                            })}
                                        </View>
                                    );
                                })
                            }
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
                                style={styles.numberInput}
                                value={amount}
                                onPressIn={() => setAmount()}
                                keyboardType="numeric"
                                maxLength={3}
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
            </ScrollView>
        </SafeAreaView>
    );
}