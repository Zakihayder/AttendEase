import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import colors from "../theme/colors";

// Reusable form field. Used by AddCourseScreen for every input so
// validation styling/feedback is written once, not duplicated per field.
// `error` (string) is passed down from the parent's validation logic;
// `touched` tracks local blur state so errors don't show before the
// user has actually interacted with the field.
export default function FormInput({
  label,
  value,
  onChangeText,
  error,
  placeholder,
  keyboardType = "default",
  maxLength,
}) {
  const [touched, setTouched] = useState(false);
  const showError = touched && !!error;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, showError && styles.inputError]}
        value={value}
        onChangeText={onChangeText}
        onBlur={() => setTouched(true)}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
      {showError ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.textPrimary,
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
});
