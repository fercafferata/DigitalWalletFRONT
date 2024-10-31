import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setBalance(1000); // Saldo inicial de ejemplo
  }, []);

  const handleBalanceUpdate = (newBalance) => {
    setBalance(newBalance);
  };

  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>Su saldo:</Text>
        <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => navigation.navigate('QRScanner', { onBalanceUpdate: handleBalanceUpdate })}
        >
          <Text style={styles.scanButtonText}>Escanear código QR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#000000',
    padding: 16,
  },
  balanceContainer: {
    width: '95%',                 // Tarjeta un poco más chica que el ancho de la pantalla
    backgroundColor: '#000000',    // Fondo blanco para la tarjeta
    borderRadius: 10,              // Bordes sutilmente redondeados
    padding: 30,                   // Espacio interno en la tarjeta
    shadowColor: '#00d8ff',           // Sombras para dar profundidad
    shadowOffset: { width: 30, height: 30 },
    shadowRadius: 10,
    elevation: 50,                  // Sombra en Android
    alignItems: 'center',
    marginTop: 30,            // Alineación a la izquierda
    marginBottom: 420,       
  },
  balanceText: {
    fontSize: 25,
    color: '#ffffff',
    marginBottom: 10,
  },
  balanceAmount: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#ffffff',
    paddingLeft: 15,
    paddingTop: 15,
  },
  buttonContainer: {
    width: '95%',                  // Ancho del botón
    marginBottom: 20,              // Espacio inferior
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButton: {
    backgroundColor: '#00d8ff',    // Color de fondo del botón
    padding: 15,                   // Espaciado interno
    borderRadius: 10,              // Bordes redondeados
    width: '100%',                 // Botón ocupa el 100% del contenedor
    alignItems: 'center',          // Centra el texto en el botón
  },
  scanButtonText: {
    color: '#000000',              // Color del texto en el botón
    fontSize: 25,                  // Tamaño del texto
    fontWeight: 'bold',            // Negrita para destacar el texto
  },
});