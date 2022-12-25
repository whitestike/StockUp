import React from 'react';
import { Button, Text, SafeAreaView, AsyncStorage } from 'react-native';

export default function NotLoggedIn({ navigation }) {

    return(
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Welcome to StockUp</Text>
            <Text>You are not logged in</Text>
            <Button title="Login" onPress={() => navigation.navigate('Login')}/>
        </SafeAreaView>
    );
}
