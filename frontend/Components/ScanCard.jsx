import React, { useState, useEffect } from 'react';
import { Button, Text, View, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ScanCard(props) {
    return(
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{font: 'Montserrat'}}>{props.productName}</Text>
        </View>
    );
}
