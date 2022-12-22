import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import axios from 'axios';

export default function HomeView({ navigation }) {

    const [data, setData] = useState('no data');

    const fetchProductData = async () => {
        try{
            let response = await axios.post('http://139.144.72.93:8000/barcode', { code: '043859582662' })

            setData(response.data.product.name);
        }catch(e){
            console.log(e);
        }
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Welcome to StockUp</Text>
            <Button title="scan" onPress={() => navigation.navigate('Scanner')}/>
            <Button title="test api endpoint" onPress={fetchProductData}/>
            <Text>{data}</Text>
        </View>
    );
}
