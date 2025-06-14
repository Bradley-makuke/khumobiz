import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Input } from "utility-custom-ui";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
<FontAwesome6 name="money-bill-trend-up" size={24} color="black" />

import Account from "./account";
import POSHub from "./poshub";
import Analytics from "./analytics";
import Loans from "./loans";
import AddMore from "./addmore";

export default function Home() {
  const [currentView, setCurrentView] = useState("home");

  const renderContent = () => {
    switch (currentView) {
      case "home":
        return (
          <>
            <View style={styles.toppanel}>
              <Text style={styles.interprisename}>HisEnterprise</Text>
              <View style={styles.searchbar}>
                <Icon
                  name="search"
                  size={28}
                  color="#666"
                  style={styles.icon}
                />
                <Input
                  style={styles.input}
                  placeholder="What do you want to do today?"
                  placeholderTextColor="#666"
                  width="90%"
                  borderColor="transparent"
                  height={40}
                />
              </View>

              <TouchableOpacity
                style={[styles.card, styles.shadow]}
                onPress={() => setCurrentView("account")}
                activeOpacity={0.7}
              >
                <Text style={styles.label}>REVENUE</Text>
                <Text style={styles.amount}>P0.00</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.bottompanel}>
              <ScrollView contentContainerStyle={styles.cardsContainer}>
                <View style={styles.row}>
                  <TouchableOpacity
                    style={[styles.bottomCard, styles.shadow]}
                    onPress={() => setCurrentView("poshub")}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[styles.bottomCardTitle, { marginLeft: '5%' }]}
                    >
                      VIEW MY ACCOUNT
                    </Text>

                    <FontAwesome name="bank" style={{marginRight:'5%'}} size={44} color="#F3971D" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.bottomCard, styles.shadow]}
                    onPress={() => setCurrentView("poshub")}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.bottomCardTitle}>POS HUB</Text>
                    <Fontisto
                      name="shopping-pos-machine"
                      size={44}
                      color="#F3971D"
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.row}>
                  <TouchableOpacity
                    style={[styles.bottomCard, styles.shadow]}
                    onPress={() => setCurrentView("analytics")}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.bottomCardTitle}>
                      VIEW SALES ANALYTICS
                    </Text>
                    <MaterialIcons name="analytics" size={44} color="#F3971D" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.bottomCard, styles.shadow]}
                    onPress={() => setCurrentView("loans")}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.bottomCardTitle}>MY LOANS</Text>
                    <FontAwesome6 name="money-bill-trend-up" size={44} color="#F3971D" />
                  </TouchableOpacity>
                </View>

                <View style={styles.row}>
                  <TouchableOpacity
                    style={[styles.bottomCard, styles.shadow]}
                    onPress={() => setCurrentView("addmore")}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.bottomCardTitle}>ADD MORE</Text>
                    <AntDesign name="pluscircle" size={44} color="#F3971D" />
                  </TouchableOpacity>
                  <View style={styles.emptyCard}></View>
                </View>
              </ScrollView>
            </View>
          </>
        );
      case "account":
        return <Account goBack={() => setCurrentView("home")} />;
      case "poshub":
        return <POSHub goBack={() => setCurrentView("home")} />;
      case "analytics":
        return <Analytics goBack={() => setCurrentView("home")} />;
      case "loans":
        return <Loans goBack={() => setCurrentView("home")} />;
      case "addmore":
        return <AddMore goBack={() => setCurrentView("home")} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderContent()}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 0,
  },
  toppanel: {
    width: "100%",
    height: "40%",
    backgroundColor: "#00A693",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  searchbar: {
    width: "80%",
    height: "fit-content",
    backgroundColor: "#e0e0e0",
    borderRadius: 40,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
  },
  bottompanel: {
    width: "100%",
    height: "60%",
    backgroundColor: "white",
    paddingTop: 20,
  },
  interprisename: {
    fontSize: 44,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "flex-start",
    width: "100%",
    paddingLeft: 20,
  },
  card: {
    backgroundColor: "#217973",
    borderRadius: 12,
    width: "80%",
    height: 100,
    paddingLeft: 20,
    paddingTop: 20,
  },
  label: {
    color: "#fff",
    fontSize: 12,
    marginBottom: 4,
    fontWeight: "400",
  },
  amount: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  cardsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  bottomCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    width: "48%",
    height: 120,
    paddingLeft: 20,
    paddingRight: 20,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  emptyCard: {
    width: "48%",
  },
  bottomCardTitle: {
    fontSize: 17,
    color: "#000",
    fontWeight: "900",
    width: "80%",
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
