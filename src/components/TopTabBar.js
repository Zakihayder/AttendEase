import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../theme/colors";

// Simple state-driven segmented tab control rendered under the header.
// Per the assignment brief we deliberately avoid any navigation library
// and bottom/side tab bars -- switching screens is just a state update
// in App.js (see `activeTab` / `setActiveTab`).
const TABS = [
  { key: "dashboard", label: "Dashboard", icon: "📊" },
  { key: "courses", label: "Courses", icon: "📚" },
  { key: "settings", label: "Settings", icon: "⚙️" },
];

export default function TopTabBar({ activeTab, onChange }) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onChange(tab.key)}
            activeOpacity={0.8}
          >
            <Text style={styles.icon}>{tab.icon}</Text>
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 20,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 14,
    padding: 4,
    marginBottom: 8,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 9,
    borderRadius: 11,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  icon: {
    fontSize: 13,
    marginRight: 5,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textSecondary,
  },
  activeLabel: {
    color: colors.textOnPrimary,
  },
});
