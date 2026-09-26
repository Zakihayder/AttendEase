import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import colors from "../theme/colors";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";

// This screen is the easiest "live modification" demo for the viva:
// tapping +/- immediately re-evaluates every badge, chart and warning
// across the whole app because they all derive from the same
// `threshold` state value owned by App.js.
export default function SettingsScreen({ threshold, onChangeThreshold, onResetData }) {
  function adjust(delta) {
    const next = threshold + delta;
    if (next < 50 || next > 100) return;
    onChangeThreshold(next);
  }

  function handleReset() {
    Alert.alert(
      "Reset all data?",
      "This restores the 5 sample courses and clears anything you've added or logged.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Reset", style: "destructive", onPress: onResetData },
      ]
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header title="Settings" />
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Attendance Threshold</Text>
          <Text style={styles.description}>
            The minimum attendance percentage considered "safe". Courses below this (minus a
            10-point buffer) are flagged as Warning or Critical everywhere in the app.
          </Text>

          <View style={styles.stepperRow}>
            <TouchableOpacity
              style={styles.stepperButton}
              onPress={() => adjust(-5)}
            >
              <Text style={styles.stepperButtonText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.thresholdValue}>{threshold}%</Text>

            <TouchableOpacity
              style={styles.stepperButton}
              onPress={() => adjust(5)}
            >
              <Text style={styles.stepperButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Data</Text>
          <Text style={styles.description}>
            Restore the app to its original 5 sample courses. Useful for demo purposes.
          </Text>
          <PrimaryButton title="Reset Sample Data" variant="danger" onPress={handleReset} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  description: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 6,
    marginBottom: 14,
    lineHeight: 17,
  },
  stepperRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  stepperButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  stepperButtonText: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.primaryDark,
  },
  thresholdValue: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.textPrimary,
    marginHorizontal: 28,
    minWidth: 80,
    textAlign: "center",
  },
});
