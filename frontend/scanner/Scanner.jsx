import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import axios from 'axios';

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState('no data');

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);


  const fetchProductData = async () => {
    let response = await axios.post('http://10.0.2.2:8000/barcode', { code: '043859582662' })
    alert(response.data.product.name);
    setData("test");
    setScanned(true);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return (
        <View>
            <Text>No access to camera</Text>
        </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'}}>
        <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : fetchProductData}
            style={styles.barcodebox}
        />
        <Text>{data}</Text>
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)}/>}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    barcodebox: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
        width: 400,
        overflow: 'hidden',
        borderRadius: 30,
    },
});
