import {Image, Pressable, View, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform, AppState, Alert} from "react-native";
import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import {supabase} from '../utils/supabase';

export default function Signup() {

    const navigation = useNavigation();
    AppState.addEventListener('change', (state) => {
        if (state === 'active'){
            supabase.auth.startAutoRefresh()
        }
        else{
            supabase.auth.stopAutoRefresh()
        }
    })

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    async function signUpWithEmail() {
        setLoading(true);
        
        // Basic validation
        if (!email || !password || !username) {
            Alert.alert("Error", "Please fill in all fields.");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        username: username, 
                    }
                }
            });

            if (error) {
                Alert.alert("Error", error.message);
            } else {
                Alert.alert(
                    "Registration Successful",
                    "Check your email to confirm your account.",
                    [
                        {
                            text: "OK",
                            onPress: () => navigation.replace('login'),
                        },
                    ]
                );
            }
        } catch (error) {
            Alert.alert("Error", "An unexpected error occurred. Please try again.");
            console.error('Signup error:', error);
        }
        
        setLoading(false);
    }

    return(
        <KeyboardAvoidingView
            behavior={Platform.OS === "android" ? "padding" : "height"}
            style={{flex : 1}}
        >
            <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps="handled">
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
                        placeholder="Username"
                        placeholderTextColor={'#ffffff'}
                        value={username}
                        onChangeText={(text) => setUserName(text)}
                    />

                    <TextInput
                        style={inputStyle}
                        placeholder="Email"
                        value={email}
                        placeholderTextColor={'#ffffff'}
                        autoCapitalize={'none'}
                        keyboardType="email-address"
                        onChangeText={(text) => setEmail(text)}
                    />

                    <View >
                        <TextInput
                            style={inputStyle}
                            placeholder="Password"
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            placeholderTextColor={'#ffffff'}
                            secureTextEntry={!showPassword}
                            autoCapitalize={'none'}
                        />
                        <Pressable
                            onPress={() => setShowPassword(!showPassword)}
                            style={{
                            position: 'absolute',
                            right: 21,
                            top: 21,
                            }}
                        >
                            <Text style={{ color: '#ffd700' }}>{showPassword ? 'Hide' : 'Show'}</Text>
                        </Pressable>
                    </View>

                    <View>
                        <TextInput
                            style={inputStyle}
                            placeholder="Confirm Password"
                            onChangeText={(text) => setConfirmPassword(text)}
                            value={confirmPassword}
                            placeholderTextColor={'#ffffff'}
                            secureTextEntry={!showConfirmPassword}
                            autoCapitalize={'none'}
                        />
                        <Pressable
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={{
                            position: 'absolute',
                            right: 21,
                            top: 21,
                            }}
                        >
                            <Text style={{ color: '#ffd700' }}>{showConfirmPassword ? 'Hide' : 'Show'}</Text>
                        </Pressable>
                    </View>

                    <Pressable
                        style={{
                            backgroundColor: loading ? '#cccccc' : '#ffd700',
                            padding: 10,
                            borderRadius: 9,
                            width: 290,
                            alignItems: 'center',
                            marginTop: 10,
                        }}
                        onPress={() => signUpWithEmail()}
                        disabled={loading}
                    >
                        <Text style={{
                            color: '#000000',
                            fontSize: 16,
                            fontWeight: 'bold',
                        }}>
                            {loading ? 'Registering...' : 'Register'}
                        </Text>
                    </Pressable>

                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Text style={{ color: '#ffffff', textAlign: "center", fontSize: 18, textDecorationLine: "underline" }}>
                            Already have an account?{' '}
                        </Text>
                        <Pressable onPress={() => navigation.replace('login')}>
                            <Text style={{ color: '#ffd700', fontWeight: 'bold', fontSize: 18 }}>
                                Login
                            </Text>
                        </Pressable>
                    </View>
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
    width: 320,
    color: '#ffffff',
};