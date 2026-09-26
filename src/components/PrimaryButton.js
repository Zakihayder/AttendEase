import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../theme/colors";

// Reused across every screen for primary/secondary/danger actions
// (Add Course, Save, Mark Present, Mark Absent, Delete...) so button
// styling never has to be re-written per screen.
export default function PrimaryButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  style,
}) {
  const variantStyle = VARIANTS[variant] || VARIANTS.primary;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: variantStyle.bg },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, { color: variantStyle.text }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const VARIANTS = {
  primary: { bg: colors.primary, text: colors.textOnPrimary },
  secondary: { bg: colors.primaryLight, text: colors.primaryDark },
  success: { bg: colors.success, text: "#FFFFFF" },
  danger: { bg: colors.danger, text: "#FFFFFF" },
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: "700",
  },
  disabled: {
    opacity: 0.5,
  },
});
