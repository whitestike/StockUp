import React from 'react';
import { Button, Text, View } from 'react-native';
import axios from 'axios';

export default function HomeView({ navigation }) {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Welcome to StockUp</Text>
            <Button title="scan" onPress={() => navigation.navigate('Scanner')}/>
            <Button title="test api endpoint" onPress={async () => {
                axios({
                    method: 'post',
                    headers: { 'Content-Type': 'application/json'},
                    url: 'http://localhost:8000/barcode',
                    data: {'code': '38104'},
                }).then(function (response) {
                    console.log(response);
                });
    
            }}/>
        </View>
    );
}
