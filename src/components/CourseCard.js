import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../theme/colors";
import ProgressBadge from "./ProgressBadge";
import {
  getAttendancePercentage,
  getAttendanceStatus,
  getMaxSafeSkips,
} from "../utils/calculations";

// The main reusable list item. Rendered once per course object via
// .map() in CoursesScreen and DashboardScreen -- this is the clearest
// example of "data-driven UI" in the app: change the data, the whole
// card (color, %, badge, warning text) updates automatically.
export default function CourseCard({ course, threshold, onPress }) {
  const percentage = getAttendancePercentage(course);
  const status = getAttendanceStatus(percentage, threshold);
  const safeSkips = getMaxSafeSkips(course, threshold);

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.75}
      onPress={onPress}
    >
      <View style={[styles.colorStrip, { backgroundColor: course.color }]} />

      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.name} numberOfLines={1}>
              {course.name}
            </Text>
            <Text style={styles.code}>{course.code}</Text>
          </View>
          <Text style={[styles.percentage, { color: course.color }]}>
            {percentage}%
          </Text>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(percentage, 100)}%`,
                backgroundColor: course.color,
              },
            ]}
          />
        </View>

        <View style={styles.bottomRow}>
          <ProgressBadge status={status} />
          <Text style={styles.helperText}>
            {status === "critical"
              ? "Below threshold"
              : `${safeSkips} skip${safeSkips === 1 ? "" : "s"} left`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: 16,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  colorStrip: {
    width: 6,
  },
  content: {
    flex: 1,
    padding: 14,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  code: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  percentage: {
    fontSize: 18,
    fontWeight: "800",
    marginLeft: 8,
  },
  progressTrack: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    marginTop: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  helperText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "600",
  },
});
