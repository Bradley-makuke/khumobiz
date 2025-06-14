import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import Home from "./home";
import Settings from "./settings";
import Chatbot from "./chatbot";
import Notifications from "./notification";
import Profile from "./profile";

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("home");

  const renderContent = () => {
    switch (selectedTab) {
      case "home": return <Home />;
      case "settings": return <Settings />;
      case "chatbot": return <Chatbot />;
      case "profile": return <Profile />;
      case "notifications": return <Notifications />;
      default: return <Home />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        {renderContent()}
      </View>

      <View style={styles.tabsContainer}>
        <Pressable 
          style={styles.iconButton} 
          onPress={() => setSelectedTab("home")}
        >
          {selectedTab === "home" && <View style={styles.selected} />}
          <Ionicons 
            name="home-outline" 
            size={28} 
            color={selectedTab === "home" ? "#F3971D" : "#999"} 
          />
        </Pressable>

        <Pressable 
          style={styles.iconButton} 
          onPress={() => setSelectedTab("settings")}
        >
          {selectedTab === "settings" && <View style={styles.selected} />}
          <Ionicons 
            name="settings-outline" 
            size={28} 
            color={selectedTab === "settings" ? "#F3971D" : "#999"} 
          />
        </Pressable>

        <Pressable 
          style={styles.iconButton} 
          onPress={() => setSelectedTab("chatbot")}
        >
          {selectedTab === "chatbot" && <View style={styles.selected} />}
          <MaterialCommunityIcons 
            name="robot-outline" 
            size={28} 
            color={selectedTab === "chatbot" ? "#F3971D" : "#999"} 
          />
        </Pressable>

        <Pressable 
          style={styles.iconButton} 
          onPress={() => setSelectedTab("notifications")}
        >
          {selectedTab === "notifications" && <View style={styles.selected} />}
          <Ionicons 
            name="notifications-outline" 
            size={28} 
            color={selectedTab === "notifications" ? "#F3971D" : "#999"} 
          />
        </Pressable>

        <Pressable 
          style={styles.iconButton} 
          onPress={() => setSelectedTab("profile")}
        >
          {selectedTab === "profile" && <View style={styles.selected} />}
          <FontAwesome5 
            name="user-alt" 
            size={24} 
            color={selectedTab === "profile" ? "#F3971D" : "#999"} 
          />
        </Pressable>
      </View>
      <StatusBar style="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  mainContent: {
    flex: 1,
    width: "100%",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    paddingBottom: 10,
    backgroundColor: "#237B6E",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  iconButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    height: "100%",
  },
  selected: {
    position: "absolute",
    top: 0,
    height: 3,
    width: "60%",
    backgroundColor: "#F3971D",
    borderRadius: 2,
  },
});