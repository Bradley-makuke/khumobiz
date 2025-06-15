import{ StatusBar } from 'react-native';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { SafeAreaProvider,SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding1 from './src/screens/Onboarding1';
import Login from './src/screens/login';
import Signup from './src/screens/signup';
import Dashboard from './src/screens/dashboard';
import BusinessProfile from './src/screens/BusinessProfile';

const Stack = createStackNavigator();

// const linking = {
//   prefixes: ['khumobiz://'],
//   config: {
//     screens: {
//       AuthCallback: 'auth/callback',
//       Onboarding1: 'onboarding1',
//       login: 'login',
//       signup: 'signup',
//     }
//   }
// };

export default function App() {
  return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Onboarding1">
            <Stack.Screen 
              name="Onboarding1" 
              component={Onboarding1} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="login" 
              component={Login} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="signup" 
              component={Signup} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="dashboard" 
              component={Dashboard} 
              options={{ headerShown: false }} 
            />
            <Stack.Screen name="BusinessProfile" component={BusinessProfile}/>
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" backgroundColor='#00A693' />
      </SafeAreaView>
  );
}