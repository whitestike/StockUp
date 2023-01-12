import React, { useState, useEffect } from 'react';
import { Text, Pressable, SafeAreaView, StatusBar, View, RefreshControl, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFonts } from 'expo-font';

import styles from '../Styles/styles';

import ProductListModal from '../Components/ProductListModal';

import axios from 'axios';

export default function HomeView({ navigation }) {
    const [name, setName] = useState(false);
    const [products, setProducts] = useState(false);
    const [wishList, setWishList] = useState(false);
    const [show, setShow] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [addToWishlist, setAddToWishlist] = React.useState(false);

    const [loaded] = useFonts({
        Poppins: require('../assets/fonts/Poppins-Medium.ttf'),
        Poppins_light: require('../assets/fonts/Poppins-Light.ttf'),
        Poppins_bold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    });

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

    async function handleRemoveFromWishlist(product){
        const email = await AsyncStorage.getItem( '@email' );
        const token = await AsyncStorage.getItem( '@token' );

        let response = await axios.post('http://139.144.72.93:8000/api/wishlist/remove', { email: email, code: product.product.code}, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
    }

    async function getProducts(){
        const email = await AsyncStorage.getItem( '@email' );
        const token = await AsyncStorage.getItem( '@token' );

        let response = await axios.post('http://139.144.72.93:8000/api/inventory/toget', { email: email }, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })

        returnProducts = [];
        returnWishList = [];
        response.data.products.forEach(product => {
            if(product.onWishList){
                returnProducts.push(product);
            }else{
                returnWishList.push(product);
            }
        });

        setProducts(returnProducts);
        setWishList(returnWishList);
        setShow(true);
        setRefreshing(false);
    }


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getToken();
        getProducts();
    }, []);

    useEffect(() => {
        getToken();
        getProducts();
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <SafeAreaView style={{height: '100%', marginTop: 5, backgroundColor:"white", position: 'relative'}}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <StatusBar backgroundColor='#204E4A'/>
                <Pressable style={{ paddingLeft: 10, width: "50%", justifyContent: 'center'}} onPress={async () => {
                    await AsyncStorage.removeItem( '@email' );
                    await AsyncStorage.removeItem( '@password' );
                    navigation.navigate('Login')
                }}>
                    <Text style={{  color: '#0F2D2A', fontSize:16, fontFamily: 'Poppins_light', lineHeight: 18}}>Hello</Text>
                    <Text style={{  color: '#0F2D2A', fontSize:16, fontFamily: 'Poppins_bold', lineHeight: 18}}>{name}</Text>
                </Pressable>
                <View style={{position: 'absolute', top: 0, right: 5}}>
                    <Pressable style={styles.button2} onPress={() => navigation.navigate('Scanner')}>
                        <Text style={styles.text}>Scanner</Text>
                    </Pressable>
                    <Pressable style={styles.button2} onPress={() => setAddToWishlist(true)}>
                        <Text style={styles.text}>Add to wishlist</Text>
                    </Pressable>
                </View>
                <View style={styles.titleContainer}>
                        <Text style={styles.title2}>Wishlist</Text>
                        <View style={styles.line}></View>
                </View>
                <View style={{ height: "90%", alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                        {show && products.map(product => {
                            return (
                                <View key={product.id} style={{borderBottomWidth: 1, borderBottomColor: '#204E4A', width: '90%', alignItems: 'flex-start', marginVertical: 7}}>
                                    <Text style={styles.textSecondaryLight}>{product.product.name}</Text>
                                    <Text style={styles.textSecondaryLight}>brand: {product.product.brand}</Text>
                                    <Pressable style={styles.removeButton} onPress={() => {
                                        handleRemoveFromWishlist(product);
                                        onRefresh();
                                    } }><Text style={[styles.textLight, {fontSize: 14}]}>Remove</Text></Pressable>
                                </View>
                            );
                        })}
                    </View>
                </View> 

            </ScrollView> 
            {addToWishlist &&
                <ProductListModal buttonText='Add' onRefresh={onRefresh} products={wishList} handleBack={() => setAddToWishlist(false) }/>
            }
        </SafeAreaView>
    );
}