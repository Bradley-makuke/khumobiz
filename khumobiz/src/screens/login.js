import {
    Image,
    Pressable,
    View,
    Text,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useNavigation } from '@react-navigation/native';


export default function Login() {
    const navigation = useNavigation();
    
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
                        placeholder="Username"
                        placeholderTextColor={'#ffffff'}
                    />

                    <TextInput
                        style={inputStyle}
                        placeholder="Password"
                        placeholderTextColor={'#ffffff'}
                        secureTextEntry
                    />

                    {/* Login Button */}
                    <Pressable
                        style={{
                            backgroundColor: '#ffd700',
                            padding: 10,
                            borderRadius: 9,
                            width: 290,
                            alignItems: 'center',
                            marginTop: 10,
                        }}
                        onPress={() => alert('Login button pressed')}
                    >
                        <Text style={{
                            color: '#000000',
                            fontSize: 16,
                            fontWeight: 'bold',
                        }}>
                            Login
                        </Text>
                    </Pressable>

                    {/* Signup Redirect */}
                    <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <Text style={{ color: '#ffffff', textAlign: "center", fontSize: 18, textDecorationLine: "underline"}}>Don't have an account? </Text>
                        <Pressable onPress={() => navigation.replace('signup')}>
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
