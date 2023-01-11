import { Text, TextInput, Pressable, View, SafeAreaView, StatusBar, RefreshControl, ScrollView } from 'react-native';
import styles from '../Styles/styles';


export default function ProductListModal(props)
{
    const products = Object.values( props.products );
    return(
        <View style={styles.basicModal}>
            <Text style={{ borderBottomWidth: 1, borderBottomColor: 'black', fontSize: 22, fontFamily: 'Poppins_light', textAlign: 'center', width: '100%', marginVertical: 15}}>Add items to your wishlist</Text>
            {products.map(product => {
                return (
                    <View key={product.id} style={{borderBottomWidth: 1, borderBottomColor: '#204E4A', width: '90%', alignItems: 'flex-start', marginVertical: 7}}>
                    {(product.onWishList) && 
                            <View style={{width: '100%'}}>
                                <View style={styles.containerProductText}><Text style={styles.textLabel}>name</Text><Text style={[styles.textDark, {fontSize: 16}]}>{product.product.name}</Text></View>
                                <View style={styles.containerProductText}><Text style={styles.textLabel}>brand</Text><Text style={[styles.textDark, {fontSize: 16}]}>{product.product.brand}</Text></View>
                                <Pressable style={styles.removeButton} onPress={async () => {
                                    setSelectedProduct(product);
                                    setRemoveModalShow(true);
                                }}><Text style={[styles.textLight, {fontSize: 14}]}>Add</Text></Pressable>
                            </View>
                        }
                    </View>
                );
            })}
        </View>
    );
}