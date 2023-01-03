import React, {useState} from 'react';
import { SafeAreaView, Button, TextInput, Text, Pressable, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

export default function LoginView({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(false);
    const [signIn, setSignin] = useState(false);

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            
            {(!login && !signIn) && 
                <View>
                    <Pressable style={styles.button} onPress={() => setSignin(true)}>
                        <Text style={styles.text}>Sign in</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => setLogin(true)}>
                        <Text style={styles.text}>Login</Text>
                    </Pressable>
                </View>
            }
            
            {signIn && <View><TextInput
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
                    await AsyncStorage.setItem( '@email', email);
                    await AsyncStorage.setItem( '@password', password);
                    await AsyncStorage.setItem( '@token', response.data.token);
                } catch (e) {
                    alert(e);   
                }

                navigation.navigate('Home');
            }}/></View>}
            
            {login && <View><TextInput
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
                    await AsyncStorage.setItem( '@email', email);
                    await AsyncStorage.setItem( '@password', password);
                    await AsyncStorage.setItem( '@token', response.data.token);
                } catch (e) {
                    alert(e);   
                }

                navigation.navigate('Home');
            }}/></View>}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    button: {
      margin: 5,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'black',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});