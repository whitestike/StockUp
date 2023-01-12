import { Text, TextInput, Pressable, View, SafeAreaView, StatusBar, RefreshControl, ScrollView } from 'react-native';

import styles from '../Styles/styles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function ProductListModal(props){


    async function handleAddToWishlist(product){
        const email = await AsyncStorage.getItem( '@email' );
        const token = await AsyncStorage.getItem( '@token' );

        let response = await axios.post('http://139.144.72.93:8000/api/wishlist/add', { email: email, code: product.product.code}, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
    }

    const products = Object.values( props.products );
    return(
        <View style={styles.basicModal}>
            <Text style={{ borderBottomWidth: 1, borderBottomColor: 'black', fontSize: 22, fontFamily: 'Poppins_light', textAlign: 'center', width: '100%', marginVertical: 15}}>Add items to your wishlist</Text>
            {products.map(product => {
                return (
                    <View key={product.id} style={{borderBottomWidth: 1, borderBottomColor: '#204E4A', width: '90%', alignItems: 'flex-start', marginVertical: 7}}>
                        <View style={{width: '100%'}}>
                            <View style={styles.containerProductText}><Text style={styles.textLabel}>name</Text><Text style={[styles.textDark, {fontSize: 16}]}>{product.product.name}</Text></View>
                            <View style={styles.containerProductText}><Text style={styles.textLabel}>brand</Text><Text style={[styles.textDark, {fontSize: 16}]}>{product.product.brand}</Text></View>
                            <Pressable style={styles.removeButton} onPress={async () => handleAddToWishlist(product) }><Text style={[styles.textLight, {fontSize: 14}]}>Add</Text></Pressable>
                        </View>
                    </View>
                );
            })}
            <Pressable style={[styles.button2, {position: 'absolute', bottom: 10}]} onPress={props.handleBack}><Text style={styles.text}>Exit</Text></Pressable>
        </View>
    );
}