import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
  } from "react-native";
import QRCode from "react-qr-code";

export default function About({navigation}) {
  return (
    <View style={styles.container}>
    <QRCode
        size={1000}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={`{\"nombres\": Tami Schnaiderman y Maia Szmedra`}
        viewBox={`0 0 256 256`}
        fgColor="#479A50"
    />
    <TouchableOpacity
    style={styles.btn}
    onPress={() => {navigation.navigate('QRScanner');}}
    >
        <Text>Escanear</Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
