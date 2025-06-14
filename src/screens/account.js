import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Account({ goBack }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Information</Text>
      {/* Your account content here */}
      
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:0,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  backButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#00A693',
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});