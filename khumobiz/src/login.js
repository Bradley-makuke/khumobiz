import {Image, Pressable, View, Text, TextInput} from "react-native";

export default function login() {
    return(
        <View style={{
            backgroundColor: "#00A693",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Image 
                source={require("../assets/logo2.png")}
                style={{
                    width: 250,
                    height: 250,
                    position: "relative",
                    top: -150,
                }}
            />
            <TextInput
                style={{
                    height: 40,
                    borderColor: '#ffd700',
                    borderWidth: 1,
                    margin: 12,
                    paddingLeft: 10,
                    borderRadius: 9,
                    position: "relative",
                    top: -130,
                    width: 290,
                }}
                placeholder="Username"
                placeholderTextColor={'#ffffff'}

            />
            <TextInput
                style={{
                    height: 40,
                    borderColor: '#ffd700',
                    borderWidth: 1,
                    margin: 12,
                    paddingLeft: 10,
                    borderRadius: 9,
                    position: "relative",
                    top: -110,
                    width: 290,
                }}
                placeholder="Password"
                placeholderTextColor={'#ffffff'}
                secureTextEntry={true}
            />

            <Pressable
                style={{
                    backgroundColor: '#ffd700',
                    padding: 10,
                    borderRadius: 9,
                    position: "relative",
                    top: -80,
                    width: 290,
                    alignItems: 'center',
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
        </View>
    );
}