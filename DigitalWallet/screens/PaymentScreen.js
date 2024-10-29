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
      <Text style={styles.title}>Confirmar Pago</Text>
      <Text style={styles.amount}>${amount.toFixed(2)}</Text>
      <Text style={styles.description}>{paymentInfo.description}</Text>
      <TouchableOpacity style={styles.confirmButton} onPress={confirmPayment}>
        <Text style={styles.confirmButtonText}>Confirmar Pago</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  amount: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 30,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
  },
});