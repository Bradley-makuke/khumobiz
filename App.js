import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking';

import Onboarding1 from './src/screens/Onboarding1';
import Login from './src/screens/login';
import Signup from './src/screens/signup';

const Stack = createStackNavigator();

const linking = {
  prefixes: ['khumobiz://'],
  config: {
    screens: {
      AuthCallback: 'auth/callback',
      Onboarding1: 'onboarding1',
      login: 'login',
      signup: 'signup',
    }
  }
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="Onboarding1"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Onboarding1" component={Onboarding1} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}