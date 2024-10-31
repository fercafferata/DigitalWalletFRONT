import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';
import QRScannerScreen from './screens/QRScannerScreen';
import PaymentScreen from './screens/PaymentScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
          headerTitleAlign: 'center',
          headerLeftContainerStyle: {
            paddingLeft: 15,
          },
          headerRightContainerStyle: {
            paddingRight: 15,
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: 'Billetera Digital',
          }}
        />
        <Stack.Screen 
          name="QRScanner" 
          component={QRScannerScreen} 
          options={{ 
            title: 'Escanear QR',
          }}
        />
        <Stack.Screen 
          name="Payment" 
          component={PaymentScreen} 
          options={{ 
            title: 'Confirmar Pago',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}