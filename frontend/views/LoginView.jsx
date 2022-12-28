import React, {useState} from 'react';
import { SafeAreaView, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

export default function LoginView({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TextInput
                style={{padding: 10, borderBottomWidth: 1}}
                placeholder='Enter your email here'
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                style={{padding: 10, borderBottomWidth: 1}}
                placeholder='Enter your password here'
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <Button title='Submit' onPress={async () => {
                let response = await axios.post('http://139.144.72.93:8000/api/login_check', { email: email, password: password },  {headers: {
                        'content-type': 'application/json'
                    }
                });
                try {
                    await AsyncStorage.setItem( '@token', response.data.token);
                } catch (e) {
                    alert(e);   
                }

                navigation.navigate('Home');
            }}/>
        </SafeAreaView>
    );
}
