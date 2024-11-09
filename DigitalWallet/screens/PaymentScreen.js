import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function PaymentScreen({ route, navigation }) {
  const { paymentInfo, onBalanceUpdate } = route.params;
  const amount = typeof paymentInfo.amount === 'string' ? parseFloat(paymentInfo.amount) : paymentInfo.amount;

  const confirmPayment = async () => {
    try {
      const response = await fetch('http://192.168.1.106:3000/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromUserId: 'user1',
          toUserId: 'user2',
          amount: amount
        }),
      });
      const result = await response.json();
      
      if (result.success) {
        Alert.alert('Éxito', `Pago procesado. Nuevo saldo: $${result.newBalance.toFixed(2)}`);
        onBalanceUpdate(result.newBalance); // Actualizar balance en HomeScreen
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', result.error || 'El pago falló. Intenta de nuevo.');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error. Intenta de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.paymentContainer}>
      <Text style={styles.title}>Su pago es:</Text>
      <Text style={styles.amount}>${amount.toFixed(2)}</Text>
      </View>
      <View style={styles.ButtonConfirmcontainer}>
      <TouchableOpacity style={styles.confirmButton} onPress={confirmPayment}>
        <Text style={styles.confirmButtonText}>Confirmar Pago</Text>
      </TouchableOpacity>
      </View>
      </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  paymentContainer: {
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
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#ffffff'
  },
  amount: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#ffffff',
    paddingLeft: 15,
    paddingTop: 15,
  },
  ButtonConfirmcontainer: {
    width: '95%',                  // Ancho del botón
    marginBottom: 20,              // Espacio inferior
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#00d8ff',    // Color de fondo del botón
    padding: 15,                   // Espaciado interno
    borderRadius: 10,              // Bordes redondeados
    width: '100%',                 // Botón ocupa el 100% del contenedor
    alignItems: 'center',          // Centra el texto en el botón
  },
  confirmButtonText: {
    color: '#000000',              // Color del texto en el botón
    fontSize: 25,                  // Tamaño del texto
    fontWeight: 'bold',            // Negrita para destacar el texto
  },
});