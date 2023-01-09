import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, TextInput, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarCodeScanner } from 'expo-barcode-scanner';

import styles from '../Styles/styles';

import ScanCard from '../Components/ScanCard';

import axios from 'axios';

export default function Scanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [code, setCode] = useState('no data');
  const [product, setProduct] = useState('no data');
  const [brand, setBrand] = useState('no data');
  const [token, setToken] = useState('');
  const [modalVisable, setModalVisable] = useState(false);
  const [createProductVisable, setCreateProductVisable] = useState(false);
  const [amount, setAmount] = useState('1');

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
    setCreateProductVisable(false);
    setModalVisable(true);

    const email = await AsyncStorage.getItem('@email');
    let response = await axios.post('http://139.144.72.93:8000/api/inventory/add', { email: email, code: code, amount: amount}, {
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
      setAmount('1');
      setModalVisable(true);
    }
  }

  const handleCreateProduct = async () => {
    let response = await axios.post('http://139.144.72.93:8000/api/product/add', { name: product ,code: code, brand: brand }, {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    })
    setCreateProductVisable(false);
    setScanned(true);
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
    }
    else if(response.data.product.name == 'no product linked to code')
    {
      setCode(response.data.product.code);
      setCreateProductVisable(true);
    }
    else
    {
      setScanned(true);
      setCode(response.data.product.code);
      setProduct(response.data.product.name);
      setBrand(response.data.product.brand);
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
        
        {(!scanned && !createProductVisable && !modalVisable) && <BarCodeScanner
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
          <ScanCard productName={code}/>
          <ScanCard productName={product}/>
          <ScanCard productName={brand}/>
          <SafeAreaView style={{width: "100%", alignItems: 'center', justifyContent: 'center'}}>
            <Text>Amount</Text>
            <TextInput
                style={styles.numberInput}
                value={amount}
                onPressIn={() => setAmount()}
                keyboardType="numeric"
                maxLength={3}
                onChangeText={text => setAmount(text)} 
            />
            <Pressable style={styles.button} onPress={handleAddProduct}>
              <Text style={styles.text}>Add to your inventory</Text>
            </Pressable>    
            <Pressable style={styles.button} onPress={() => setScanned(false)}>
              <Text style={styles.text}>Scan again</Text>
            </Pressable>
          </SafeAreaView>
        </SafeAreaView>}

        {createProductVisable && 
        <SafeAreaView style={styles.modalView}>
          <Text>code: {code}</Text>
          <Text>Enter product name</Text>
          <TextInput style={styles.input} onChangeText={productName => setProduct(productName)}/>
          <Text>Enter product brand</Text>
          <TextInput style={styles.input} onChangeText={productBrand => setBrand(productBrand)}/>
          <Pressable style={styles.button} onPress={handleCreateProduct}>
            <Text style={styles.text}>Create Product</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => setCreateProductVisable(false)}>  
              <Text style={styles.text}>Scan again</Text>
          </Pressable>
        </SafeAreaView>}
    </SafeAreaView>
  );
}