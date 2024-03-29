import { Text, Pressable, View, ScrollView } from 'react-native';

import styles from '../Styles/styles';

export default function ProductList(props){

    const products = Object.values( props.products );
    let showAmount = false;
    if(props.showAmount != null){showAmount = props.showAmount;}

    if(products.length == 0)
    {
        return (
            <View>
                {props.emptyMessage}
            </View>
        );
    }

    return(
        <ScrollView style={{width: '100%', overflow: 'hidden'}}>
            {props.tags.map(tag => {
                    return(
                        <View key={tag} style={{width: '100%', alignItems: 'center'}}>
                            <Text style={[styles.textLabel2, {width: '90%'}]}>{tag}</Text>
                            {products.map(product => {
                                if(product.product.tag == tag)
                                {
                                    return (
                                        <View key={product.id} style={{borderBottomWidth: 1, borderBottomColor: '#4BC188', width: '90%', alignItems: 'flex-start', marginVertical: 7}}>
                                            <Text style={styles.textSecondaryLight}>{product.product.name}</Text>
                                            <Text style={styles.textSecondaryLight}>brand: {product.product.brand}</Text>
                                            {showAmount && 
                                                <Text style={styles.textSecondaryLight}>amount: {product.count}</Text>
                                            }
                                            <Pressable style={styles.removeButton} onPress={() => { 
                                                props.buttonFunction(product);
                                                props.onRefresh();
                                            }}><Text style={[styles.textLight, {fontSize: 14}]}>{props.buttonText}</Text></Pressable>
                                        </View>
                                    );
                                }
                            })}
                        </View>
                    );
                })
            }
        </ScrollView>
    );
}