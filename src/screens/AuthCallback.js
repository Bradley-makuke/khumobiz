// src/screens/AuthCallback.js
import { View, Text } from 'react-native';
import { useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { useNavigation } from '@react-navigation/native';
import * as Linking from 'expo-linking';

export default function AuthCallback() {
  const navigation = useNavigation();

  useEffect(() => {
    const processDeepLink = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        const { data, error } = await supabase.auth.getSessionFromUrl({ url });
        if (!error) {
          navigation.replace('login'); // or wherever you want
        }
      }
    };

    processDeepLink();
  }, []);

  return (
    <View>
      <Text>Processing confirmation...</Text>
    </View>
  );
}
