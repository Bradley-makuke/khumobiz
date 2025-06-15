import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Notifications() {
 
  return (
    <View style={styles.container}>
      <Text>notifications</Text>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 0,
  },
});
