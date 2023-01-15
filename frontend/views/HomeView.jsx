import React, { useState, useEffect } from 'react';
import { Text, Pressable, SafeAreaView, StatusBar, View, RefreshControl, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFonts } from 'expo-font';

import styles from '../Styles/styles';

import ProductList from '../Components/ProductList';

import axios from 'axios';

export default function HomeView({ navigation }) {
    const [name, setName] = useState('');
    const [products, setProducts] = useState([]);
    const [tags, setTags] = useState([]);
    const [wishlistTags, setWishlistTags] = useState([]);
    const [wishList, setWishList] = useState([]);
    const [show, setShow] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [addToWishlist, setAddToWishlist] = React.useState(false);

    const [loaded] = useFonts({
        Poppins: require('../assets/fonts/Poppins-Medium.ttf'),
        Poppins_light: require('../assets/fonts/Poppins-Light.ttf'),
        Poppins_bold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    });

    const getToken = async () => {
    
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

    const handleAddToWishlist = async (product) => {
        const email = await AsyncStorage.getItem( '@email' );
        const token = await AsyncStorage.getItem( '@token' );

        await axios.post('http://139.144.72.93:8000/api/wishlist/add', { email: email, code: product.product.code}, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
    }

    const handleRemoveFromWishlist = async (product) => {
        const email = await AsyncStorage.getItem( '@email' );
        const token = await AsyncStorage.getItem( '@token' );

        await axios.post('http://139.144.72.93:8000/api/wishlist/remove', { email: email, code: product.product.code}, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
    }

    const getProducts = async () => {
        const email = await AsyncStorage.getItem( '@email' );
        const token = await AsyncStorage.getItem( '@token' );

        let response = await axios.post('http://139.144.72.93:8000/api/inventory/toget', { email: email }, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })

        let returnProducts = [];
        let returnWishList = [];
        let returnWishlistTags = [];
        let returnTags = [];
        response.data.products.forEach(product => {
            if(product.onWishList){
                returnWishList.push(product);
                if(!returnWishlistTags.includes(product.product.tag))
                {
                    returnWishlistTags.push(product.product.tag);
                }
            }else{
                returnProducts.push(product);
                if(!returnTags.includes(product.product.tag))
                {
                    returnTags.push(product.product.tag);
                }
            }
        });

        setTags(returnTags);
        setWishlistTags(returnWishlistTags);
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

    {if (!loaded) {
        return null;
    }}

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
                <View style={styles.titleContainer}>
                        <Text style={styles.title}>Wishlist</Text>
                        <View style={styles.line}></View>
                </View>
                <View style={{ height: "90%", alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                        {show && 
                            <ProductList buttonText='Remove' buttonFunction={handleRemoveFromWishlist} onRefresh={onRefresh} tags={wishlistTags} products={wishList}/>
                        }
                    </View>
                </View> 
            </ScrollView>
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around', marginBottom: 5}}>
                <Pressable style={styles.homeScreenButton} onPress={() => navigation.navigate('Scanner')}>
                    <Text style={[styles.text, {textAlign: 'center'}]}>Scanner</Text>
                </Pressable>
                <Pressable style={[styles.homeScreenButton, {borderLeftColor: '#0F2D2A', borderLeftWidth: 1}]} onPress={() => setAddToWishlist(true)}>
                    <Text style={[styles.text, {textAlign: 'center'}]}>Add to wishlist</Text>
                </Pressable>
            </View>
            {addToWishlist &&
                <View style={styles.basicModal}>
                    <Text style={{ borderBottomWidth: 1, borderBottomColor: 'black', fontSize: 26, fontFamily: 'Poppins_bold', textAlign: 'center', width: '100%', marginVertical: 15}}>Add items to your wishlist</Text>
                    <ProductList buttonText='Add' buttonFunction={handleAddToWishlist} onRefresh={onRefresh} tags={tags} products={products}/>
                    <Pressable style={[styles.button2, {position: 'absolute', bottom: -50}]} onPress={() => setAddToWishlist(false)}><Text style={styles.text}>Exit</Text></Pressable>
                </View>
            }
        </SafeAreaView>
    );
}