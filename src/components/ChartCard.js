import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

// Consistent card "frame" (title + padding + shadow) around every
// chart on the Dashboard, so DashboardScreen just supplies the chart
// itself as children.
export default function ChartCard({ title, subtitle, children }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <View style={styles.chartWrapper}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  chartWrapper: {
    marginTop: 10,
    alignItems: "center",
  },
});
