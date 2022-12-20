import React from 'react';
import { Button, Text, View } from 'react-native';
import axios from 'axios';

export default function HomeView({ navigation }) {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Welcome to StockUp</Text>
            <Button title="scan" onPress={() => navigation.navigate('Scanner')}/>
            <Button title="test api endpoint" onPress={async () => {
                axios.post('https://139.144.72.93:8000/barcode', {
                    code: '981237490',
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });}
            }/>
        </View>
    );
}
