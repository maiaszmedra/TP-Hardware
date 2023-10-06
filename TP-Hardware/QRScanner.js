import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
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

  
  //=========================================== ABRIR CAMARA ===========================================

  const onQRCodeRead = (e) => {
    //MostrarModal();
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
    setScanned(true);
    setText(data);
    const obj = JSON.parse(data);
    setNombres(obj.nombres);

  };

 //============================ MODAL =========================================

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
        <Text style={styles.escanea}>Escanea el codigo QR</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 200,
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
    color: "#C08552",
    padding: 10,
    margin: -85,
    fontWeight: "bold",
    backgroundColor: "#F3E9DC",
    borderRadius: "25px",
  },
});
