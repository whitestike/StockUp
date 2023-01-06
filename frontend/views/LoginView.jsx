import React, {useEffect, useState} from 'react';
import { Alert, SafeAreaView, TextInput, Text, Pressable, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../Styles/styles';

import axios from 'axios';

export default function LoginView({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(false);
    const [signIn, setSignin] = useState(false);

    useEffect(() => {
        navigation.addListener('beforeRemove',  async (e) => {
            let email = await AsyncStorage.getItem( '@email', email);
            if(email == null){
                Alert.alert(
                    'Not logged in',
                    'You need to be logged in to use this app',
                    [
                        { text: "Go back to login", style: 'cancel', onPress: () => {
                                navigation.navigate("Login");
                        } },
                    ]
                );
            }else{
                return;
            }
        })
    });

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

            {signIn && 
            <View>
            
                <Text>Sing in</Text>
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
                <Pressable style={styles.button} onPress={async () => {
                    let singin = await axios.post('http://139.144.72.93:8000/signin/user/create', { email: email, password: password },  {headers: {
                            'content-type': 'application/json'
                        }
                    });

                    if(!singin.data.userExists)
                    {
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
                    }else{
                        alert("user already exists with this email");
                    }
                }}>
                    <Text style={styles.text}>Submit</Text>
                </Pressable>
           </View>}
            
            {login && 
            <View>
                <Text>Login</Text>

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
                <Pressable style={styles.button} onPress={async () => {
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
                }}>
                    <Text style={styles.text}>Submit</Text>
                </Pressable>
            </View>}
        </SafeAreaView>
    );
}