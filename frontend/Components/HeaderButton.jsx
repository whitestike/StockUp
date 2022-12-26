import React, { useEffect } from 'react';
import { Pressable, Text} from 'react-native';

export default function HeaderButton(props){
    return (
        <Pressable onPress={() => props.navigation.navigation.navigate('Home')}>
           <Text style={{color: 'black'}}>{props.text}</Text>
        </Pressable>
    );
}