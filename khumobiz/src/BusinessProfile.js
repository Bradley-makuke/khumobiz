import {Image, Pressable, View, Text, TextInput} from "react-native";
import {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import supabase from "./supabaseClient";
import{Modal, ActivityIndicator} from "react-native";


export default function BusinessProfile() {

  const navigation = useNavigation();

  const [businessName, setBusinessName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const [omangNumber, setOmangNumber] = useState('');

  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleVerify = async () => {

    try{
    setLoading(true);

    // Query business table
    const { data: business, error: businessError } = await supabase
      .from("business")
      .select("*")
      .eq("business_name", businessName)
      .eq("bs_registration_number", regNumber)
      .maybeSingle();

    // Query profile table
    const { data: profile, error: profileError } = await supabase
      .from("profile")
      .select("*")
      .eq("id_number", omangNumber)
      .maybeSingle();

    setLoading(false);

    if (business && profile && !businessError && !profileError) {
      setVerified(true);
      setTimeout(() => {
        navigation.navigate("signup");
      }, 1000);
    } else {
      alert("Credentials not found. Please check your input.");
    }
    }
    catch (err) {
  setLoading(false);
  console.error("Error verifying credentials:", err);
  alert("Something went wrong.");
}
  };

  
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
                style={inputStyle(-50)}
                value={businessName}
                placeholder="Business Name"
                placeholderTextColor={'#ffffff'}
                onChangeText={setBusinessName}

            />

             <TextInput
                style={inputStyle(-40)}
                value={companyEmail}
                placeholder="Company Email"
                placeholderTextColor={'#ffffff'}
                onChangeText={setCompanyEmail}

            />

            <TextInput
                style={inputStyle(-30)}
                value={regNumber}
                placeholder="Registration Number"
                placeholderTextColor={'#ffffff'}
                onChangeText={setRegNumber}
                
            />

             <TextInput
                style={inputStyle(-20)}
                value={omangNumber}
                placeholder="Omang Number"
                placeholderTextColor={'#ffffff'}
                onChangeText={setOmangNumber}
            />

            <Pressable
                style={buttonStyle}
                onPress={handleVerify}
            >
                <Text style={buttonTextStyle}>Next+  </Text>
            </Pressable>

            {/* Modal for loading and verifying */}
      <Modal visible={loading} transparent animationType="fade">
        <View style={modalStyle}>
          <ActivityIndicator size="large" color="#ffd700" />
          <Text style={{ color: "#fff", marginTop: 10 }}>Verifying credentials...</Text>
        </View>
      </Modal>
      {/* Modal for verified check */}
      <Modal visible={verified} transparent animationType="fade">
        <View style={modalStyle}>
          <Text style={{ fontSize: 50, color: "lime" }}>✔️</Text>
        </View>
      </Modal>
        </View>
    );
}
const inputStyle = (top) => ({
  height: 40,
  borderColor: "#ffd700",
  borderWidth: 1,
  margin: 12,
  paddingLeft: 10,
  borderRadius: 9,
  position: "relative",
  top: top,
  width: 290,
  color: "#ffffff",
});

const buttonStyle = {
  backgroundColor: "#ffd700",
  padding: 10,
  borderRadius: 9,
  position: "relative",
  top: 0,
  width: 290,
  alignItems: "center",
};

const buttonTextStyle = {
  color: "#000000",
  fontSize: 16,
  fontWeight: "bold",
};

const modalStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.7)",
};
