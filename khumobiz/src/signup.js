import {Image, Pressable, View, Text, TextInput} from "react-native";

export default function signup() {
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
                    width: 300,
                    height: 300,
                    position: "relative",
                    top: -60,
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
                    top: -50,
                    width: 290,
                }}
                placeholder="Business Name"
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
                    top: -40,
                    width: 290,
                }}
                placeholder="Company Email"
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
                    top: -30,
                    width: 290,
                }}
                placeholder="Password"
                placeholderTextColor={'#ffffff'}
                secureTextEntry={true}
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
                    top: -20,
                    width: 290,
                }}
                placeholder="Confirm Password"
                placeholderTextColor={'#ffffff'}
                secureTextEntry={true}
            />

            <Pressable
                style={{
                    backgroundColor: '#ffd700',
                    padding: 10,
                    borderRadius: 9,
                    position: "relative",
                    top: 0,
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
                    Register
                </Text>
            </Pressable>
        </View>
    );
}