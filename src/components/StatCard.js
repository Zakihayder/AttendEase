import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

// Generic stat display card, reused 3x on the Dashboard (attendance,
// GPA, at-risk count) via props -- avoids duplicating layout JSX.
export default function StatCard({ label, value, accentColor, subtitle }) {
  return (
    <View style={[styles.card, { borderTopColor: accentColor || colors.primary }]}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 14,
    borderTopWidth: 4,
    marginHorizontal: 4,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  value: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  label: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
