import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { STATUS_META } from "../utils/calculations";

// Small reusable "pill" badge. Reused on Course cards, Course detail,
// and the Dashboard risk summary -- one place to change the look.
export default function ProgressBadge({ status, style }) {
  const meta = STATUS_META[status] || STATUS_META.safe;

  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: `${meta.color}22`, borderColor: meta.color },
        style,
      ]}
    >
      <View style={[styles.dot, { backgroundColor: meta.color }]} />
      <Text style={[styles.text, { color: meta.color }]}>{meta.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: "700",
  },
});
