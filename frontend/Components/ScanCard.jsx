import React, { useState, useEffect } from 'react';
import { Button, Text, View, SafeAreaView, AsyncStorage } from 'react-native';

export default function ScanCard(props) {
    return(
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{font: 'Montserrat'}}>{props.productName}</Text>
        </View>
    );
}
