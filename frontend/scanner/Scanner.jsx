import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, Button, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarCodeScanner } from 'expo-barcode-scanner';

import ScanCard from '../Components/ScanCard';

import axios from 'axios';

export default function Scanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [code, setCode] = useState('no data');
  const [product, setProduct] = useState('no data');
  const [token, setToken] = useState('');
  const [modalVisable, setModalVisable] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    async function getToken(){
      const token = await AsyncStorage.getItem('@token');
      setToken(token);
    }

    getToken();
    getBarCodeScannerPermissions();
  }, []);

  const handleAddProduct = async () => {
    const email = await AsyncStorage.getItem('@email');
    let response = await axios.post('http://139.144.72.93:8000/api/inventory/add', { email: email ,code: code }, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    })

    if(response.status !== 200){
      alert(response.status);
    }
    else
    {
      setScanned(false);
      setModalVisable(true);
    }
  }

  const fetchProductData = async (data) => {
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
      setCode(response.data.product.code);
      setProduct(response.data.product.name);
    }
    else
    {
      setScanned(true);
      setCode(response.data.product.code);
      setProduct(response.data.product.name);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return (
        <SafeAreaView>
            <Text>No access to camera</Text>
        </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff'}}>
        {(!modalVisable && !scanned) && <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : fetchProductData}
            style={styles.barcodebox}
        />}
        {modalVisable && <SafeAreaView style={styles.modalView}>
          <Text>Product has been added to your inventory</Text>
          <Pressable style={styles.button} onPress={() => setModalVisable(false)}>
            <Text style={styles.text}>OK</Text>
          </Pressable> 
        </SafeAreaView>}
        {scanned && <SafeAreaView style={styles.modalView}>
          <ScanCard productName={product}/>
          <SafeAreaView style={{width: "100%", alignItems: 'center', justifyContent: 'center'}}>
            <Pressable style={styles.button} onPress={handleAddProduct}>
              <Text style={styles.text}>Add to your inventory</Text>
            </Pressable>    
            <Pressable style={styles.button} onPress={() => setScanned(false)}>
              <Text style={styles.text}>Scan again</Text>
            </Pressable>
          </SafeAreaView>
        </SafeAreaView>}
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
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
