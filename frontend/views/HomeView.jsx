import React, { useState, useEffect } from 'react';
import { Button, Text, View, SafeAreaView, AsyncStorage } from 'react-native';

export default function HomeView({ navigation }) {
    const [token, setToken] = useState('');

    useEffect(() => {
        async function getToken(){
            AsyncStorage.getItem('token').then((value) => {
                setToken(value);
            });
        }

        getToken();
    }, []);


    if(token != null){
        return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Welcome to StockUp</Text>
                <Button title="Go to scanner" onPress={() => navigation.navigate('Scanner')}/>
                <Button title="Logout" onPress={() => {
                    AsyncStorage.removeItem('token')
                    navigation.navigate('NotLoggedIn');
                }}/>
            </SafeAreaView>
        );
    }
    navigation.navigate('NotLoggedIn');
}
