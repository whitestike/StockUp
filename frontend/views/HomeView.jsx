import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

export default function HomeView({ navigation }) {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Welcome to StockUp</Text>
            <Button title="scan" onPress={() => navigation.navigate('Scanner')}/>
        </View>
    );
}
