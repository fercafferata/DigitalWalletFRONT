import React, { useState, useEffect } from 'react'; 
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QRScannerScreen({ navigation, route }) {
  const { onBalanceUpdate } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    try {
      const paymentInfo = JSON.parse(data);
      navigation.navigate('Payment', { paymentInfo, onBalanceUpdate });
    } catch (error) {
      alert(`Invalid QR code: ${data}`);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
          <Text style={styles.buttonText}>Escanear nuevamente</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#00d8ff',    // Color de fondo del botón
    padding: 15,                   // Espaciado interno
    borderRadius: 10,              // Bordes redondeados
    width: '100%',                 // Botón ocupa el 100% del contenedor
    alignItems: 'center',          // Centra el texto en el botón
  },
  buttonText: {
    color: '#000000',              // Color del texto en el botón
    fontSize: 25,                  // Tamaño del texto
    fontFamily: 'Fredoka',         // Fuente personalizada
    fontWeight: 'bold',            // Negrita para destacar el texto
  },
});
