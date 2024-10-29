import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import PaymentScreen from './screens/PaymentScreen';
import QRScannerScreen from './screens/QRScannerScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="QRScanner" component={QRScannerScreen} options={{ title: 'Scan' }} />
        <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'Confirm Payment' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}