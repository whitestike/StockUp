import { View, Pressable } from 'react-native';
import React from 'react';

import HouseSvg from '../Images/house-solid';
import BoxesSvg from '../Images/boxes';
import BarcodeSvg from '../Images/barcode';

import styles from '../Styles/styles';

export default function Footer({ navigation }) {
    return(
        <View style={styles.footer}>
            <Pressable onPress={() => navigation.navigate('Home')}>
                <HouseSvg/>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Inventory')}>
                <BoxesSvg/>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Scanner')}>
                <BarcodeSvg/>
            </Pressable>
        </View>
    );
}