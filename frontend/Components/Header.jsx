import styles from "../Styles/styles";

import { Text, View } from 'react-native';

export default function Header()
{
    return (
        <View style={styles.header}>
            <Text style={{ fontSize: 24, color: 'white', fontFamily: 'Poppins_bold', textAlign: 'right'}}>Stock</Text><Text style={{ fontSize: 24, color: 'white', fontFamily: 'Poppins_light', textAlign: 'left'}}>Up</Text>
        </View>
    );
}