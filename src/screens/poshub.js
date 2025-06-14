import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { DataTable } from "utility-custom-ui";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const POSHub = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>POS</Text>

      {/* Activation Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activation</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>QR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Virtual Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Mobile Money</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>E-Wallet</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* POS Activites */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>POS Activities</Text>
        <DataTable
          columns={["Item", "Price", "Time"]}
          data={[
            { Item: "Sugar", Price: 30, Time: "10:00 AM" },
            { Item: "Rice", Price: 50, Time: "10:05 AM" },
            { Item: "Beans", Price: 40, Time: "10:10 AM" },
            { Item: "Flour", Price: 20, Time: "10:15 AM" },
            { Item: "Salt", Price: 10, Time: "10:20 AM" },
            { Item: "Oil", Price: 60, Time: "10:25 AM" },
          ]}
          headerBackgroundColor="#F3971D"
          rowBackgroundColor="#fff"
          sortable={true}
          stickyHeader={true}
          height={"fit-content"}
        />
      </View>
      {/* Pay Section */}
      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.option, { width: "100%", height: "50%" }]}
        >
          <Text style={styles.optionText}>QR</Text>
          <MaterialCommunityIcons name="qrcode-scan" size={130} color="#F3971D" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  option: {
    width: "48%",
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 20,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  navItem: {
    padding: 10,
  },
  navText: {
    fontSize: 14,
  },
});

export default POSHub;
