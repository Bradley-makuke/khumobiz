import {
    Image,
    Pressable,
    View,
    Text,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    AppState,
    Alert 
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import {supabase} from '../utils/supabase';


export default function Login() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    AppState.addEventListener('change', (state) => {
        if (state === 'active'){
            supabase.auth.startAutoRefresh()
        }
        else{
            supabase.auth.stopAutoRefresh()
        }
    })

    async function signInWithEmail() {
        try{
            // Basic validation
            if (!email || !password) {
                Alert.alert("Error", "Please fill in all fields.");
                return;
            }

            setLoading(true)
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.trim(), 
                password: password,
            })
            
            if (error) {
                Alert.alert("Login Failed", error.message)
            } else {
                navigation.replace('dashboard')
            }
        }
        catch (error){
            Alert.alert("Unexpected Error", error.message || "Something went wrong");
        }
        finally{
            setLoading(false);
        }
    }
    
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "android" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <View style={{
                    backgroundColor: "#00A693",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 50,
                }}>
                    <Image
                        source={require("../../assets/logo2.png")}
                        style={{
                            width: 300,
                            height: 300,
                            marginBottom: -5,
                        }}
                    />

                    <TextInput
                        style={inputStyle}
                        placeholder="Email"
                        placeholderTextColor={'#ffffff'}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="email-address"
                        autoCapitalize="none" 
                    />

                    <TextInput
                        style={inputStyle}
                        placeholder="Password"
                        placeholderTextColor={'#ffffff'}
                        value={password}
                        secureTextEntry
                        autoCapitalize={'none'}
                        onChangeText={(text) => setPassword(text)}
                    />

                    {/* Login Button */}
                    <Pressable
                        style={{
                            backgroundColor: loading ? '#cccccc' : '#ffd700',
                            padding: 10,
                            borderRadius: 9,
                            width: 290,
                            alignItems: 'center',
                            marginTop: 10,
                        }}
                        onPress={() => signInWithEmail()}
                        disabled={loading}
                    >
                        <Text style={{
                            color: '#000000',
                            fontSize: 16,
                            fontWeight: 'bold',
                        }}>
                            {loading ? 'Logging in...' : 'Login'} {/* Show loading text */}
                        </Text>
                    </Pressable>

                    {/* Signup Redirect */}
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Text style={{ color: '#ffffff', textAlign: "center", fontSize: 18, textDecorationLine: "underline"}}>Don't have an account? </Text>
                        <Pressable onPress={() => navigation.replace('BusinessProfile')}>
                            <Text style={{ color: '#ffd700', fontWeight: 'bold', fontSize: 18,  }}>Sign up</Text>
                        </Pressable>
                    </View>

                     {/* Forgot Password Link */}
                    <Pressable onPress={() => alert('Forgot Password pressed')}>
                        <Text style={{
                            color: '#ffffff',
                            fontSize: 18,
                            textAlign: 'center',
                            width: 290,
                            marginTop: 10,
                            marginBottom: 10,
                            textDecorationLine: "underline"
                        }}>
                            Forgot Password?
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const inputStyle = {
    height: 40,
    borderColor: '#ffd700',
    borderWidth: 1,
    margin: 12,
    paddingLeft: 10,
    borderRadius: 9,
    width: 290,
    color: '#ffffff',
};