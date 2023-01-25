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
    const [dontShowPassword, setdontShowPassword] = useState(true);

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
    
    const handleLogin = async () => {
        if(email.includes('@'))
        {
            try {
                let response = await axios.post('http://139.144.72.93:8000/api/login_check', { email: email, password: password },  {headers: {
                        'content-type': 'application/json'
                    }
                });
                await AsyncStorage.setItem( '@email', email);
                await AsyncStorage.setItem( '@password', password);
                await AsyncStorage.setItem( '@token', response.data.token);
                navigation.navigate('Home');
            } catch (e) {
                Alert.alert(
                    'Wrong email or password',
                    'Try signing in if you dont have an account',
                    [
                        { text: "Ok", style: 'cancel', onPress: () => {
                                navigation.navigate("Login");
                        } },
                    ]
                );
            }
        }else{
            Alert.alert(
                'Email is invalid',
                'You need to use a valid mail address',
                [
                    { text: "Ok", style: 'cancel', onPress: () => {
                            navigation.navigate("Login");
                    } },
                ]
            );
        }
    }

    const handleCreateUser = async () => {
        if(email.includes('@')){
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
        }else{
            Alert.alert(
                'Email is invalid',
                'You need to use a valid mail address',
                [
                    { text: "Ok", style: 'cancel', onPress: () => {
                            navigation.navigate("Login");
                    } },
                ]
            );
        }

    }

    const handleShowPassword = () => {
        setdontShowPassword(!dontShowPassword)
    }

    const handlePassword = (_password) =>{
        setPassword(_password);
    }

    return (
        <SafeAreaView style={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
            
            {(!login && !signIn) && 
                <View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                        <Pressable style={styles.button2} onPress={() => setSignin(true)}>
                            <Text style={styles.text}>Sign in</Text>
                        </Pressable>
                        <Pressable style={styles.button2} onPress={() => setLogin(true)}>
                            <Text style={styles.text}>Login</Text>
                        </Pressable>
                    </View>
                </View>
            }

            {signIn && 
            <View style={{width: '100%', alignItems: 'center'}}>
                <Text>Sing in</Text>
                <View style={{width: '100%', alignItems: 'center'}}>
                    <TextInput
                        style={{ width: '80%', padding: 10, borderBottomWidth: 1}}
                        placeholder='Enter your email here'
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    <TextInput
                        style={{ width: '80%', padding: 10, borderBottomWidth: 1}}
                        placeholder='Enter your password here'
                        value={password}
                        secureTextEntry={dontShowPassword}
                        onChangeText={text => handlePassword(text)}
                    />
                    <Pressable style={styles.button2} onPress={handleCreateUser}>
                        <Text style={styles.text}>Sign in</Text>
                    </Pressable>
                    <Pressable style={styles.button2} onPress={handleShowPassword}>
                        <Text style={styles.text}>show password</Text>
                    </Pressable>
                    <Pressable style={styles.button2} onPress={() => {
                        setSignin(!signIn);
                        setEmail('');
                        setPassword('');
                    }}>
                        <Text style={styles.text}>Go back</Text>
                    </Pressable>
                </View>
           </View>}
            
            {login && 
            <View style={{width: '100%', alignItems: 'center'}}>
                <Text>Login</Text>
                <View style={{width: '100%', alignItems: 'center'}}>
                    <TextInput
                        style={{ width: '80%', padding: 10, borderBottomWidth: 1}}
                        placeholder='Enter your email here'
                        value={email}
                        onChangeText={text => setEmail(text)}
                    /> 
                    <TextInput
                        style={{ width: '80%', padding: 10, borderBottomWidth: 1}}
                        placeholder='Enter your password here'
                        value={password}
                        secureTextEntry={dontShowPassword}
                        onChangeText={text => handlePassword(text)}
                    />
                    <Pressable style={styles.button2} onPress={handleLogin}>
                        <Text style={styles.text}>Login</Text>
                    </Pressable>
                    <Pressable style={styles.button2} onPress={handleShowPassword}>
                        <Text style={styles.text}>show password</Text>
                    </Pressable>
                    <Pressable style={styles.button2} onPress={() => {
                        setLogin(!login);
                        setEmail('');
                        setPassword('');
                    }}>
                        <Text style={styles.text}>Go back</Text>
                    </Pressable>
                </View>
            </View>}
        </SafeAreaView>
    );
}