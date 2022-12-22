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
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json'},
                    url: 'http://127.0.0.1:8000/barcode',
                    data: {code: "043859582662"}
                }).then((response) => {
                    alert(response.data.product.name);
                })
            }}/>
        </View>
    );
}
