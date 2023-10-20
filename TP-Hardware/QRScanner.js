import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Modal, Pressable} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { CurrentRenderContext } from "@react-navigation/native";

// npm install react-native-camera react-native-qrcode-scanner
// import { RNCamera } from 'react-native-camera'

export default function QRScanner({ navigation }) {
  const [nombres, setNombres] = useState();
  const [botellasIngresadas, setBotellasIngresadas] = useState();
  const [puntos, setPuntos] = useState();
  const [idUsuario, setIdUsuario] = useState();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");
  const [qrscan, setQrscan] = useState("No result");
  const [scanResults, setScanResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  
  //=========================================== ABRIR CAMARA ===========================================

  const onQRCodeRead = (e) => {
    
  };

  const askForCameraPermission = () => {
    (async () => {})();
  };

  useEffect(() => {
    
    BarCodeScanner.requestPermissionsAsync()
      .then((res) => {
        console.log(res);
        setHasPermission(res.granted === "granted");
      })
      .catch((error) => console.log());
  }, []);

  //=========================================== LEER QR ===========================================

  useEffect(() => {
    onQRCodeRead();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    onQRCodeRead
    setScanned(true);
    setText(data);
    const obj = data;
    setNombres(obj);
    console.log(obj)
      
  };

  //============== RETURN =====================================================

  if (hasPermission === null) {
    return (
      <View style={styles.cameraContainer}>
        <Text> Requesting for camera permission</Text>
        <Button
          title={"Allow camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {nombres ? <Text style={styles.autores}>Los autores del codigo escaneado son: {nombres}</Text>: 
        <Text style={styles.escanea}>Escanea el codigo QR</Text>}
       

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 200,
    borderRadius: 100000,
  },
  cameraContainer: {
    flex: 1,
    margin: 200,
  },
  Button: {
    backgroundColor: "#469735",
  },
  escanea: {
    textAlign: "center",
    color: "#FFFAED",
    padding: 10,
    margin: -85,
    fontWeight: "bold",
    backgroundColor: "#93A8AC",
    borderRadius: 20000000,
  },
  autores: {
    textAlign: "center",
    color: "#FFFAED",
    padding: 10,
    margin: -85,
    fontWeight: "bold",
    backgroundColor: "#93A8AC",
    borderRadius:10000000,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
