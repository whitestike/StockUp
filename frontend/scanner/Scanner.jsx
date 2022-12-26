import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, AsyncStorage, Pressable} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import ScanCard from '../Components/ScanCard';

import axios from 'axios';

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [data, setData] = useState('no data');
  const [token, setToken] = useState('');

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);


  const fetchProductData = async (data) => {
    AsyncStorage.getItem('token').then((value) => {
      setToken(value);
    });
    let response = await axios.post('http://139.144.72.93:8000/api/barcode', { code: data.data }, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    })
    if(response.data.product.name == 'no data')
    {
      setScanned(false);
    }else if(response.data.product.name == 'no product linked to code')
    {
      setScanned(true);
      setData(response.data.product.name);
    }
    else
    {
      setScanned(true);
      setData(response.data.product.name);
    }
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
        {scanned && <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', position: 'relative'}}>
          <ScanCard productName={data}/>
          <View style={{width: "100%", alignItems: 'center', justifyContent: 'center'}}>
            <Pressable style={styles.button} onPress={() => setScanned(false)}>
              <Text style={styles.text}>Add to your inventory</Text>
            </Pressable>    
            <Pressable style={styles.button} onPress={() => setScanned(false)}>
              <Text style={styles.text}>Scan again</Text>
            </Pressable>
          </View>
        </View>}
    </View>
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
