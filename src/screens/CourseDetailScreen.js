import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import colors from "../theme/colors";
import Header from "../components/Header";
import ProgressBadge from "../components/ProgressBadge";
import PrimaryButton from "../components/PrimaryButton";
import FormInput from "../components/FormInput";
import {
  getAttendancePercentage,
  getAttendanceStatus,
  getMaxSafeSkips,
  getCoursePercentageScore,
  percentageToGrade,
  average,
} from "../utils/calculations";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export default function CourseDetailScreen({
  course,
  threshold,
  onBack,
  onMarkAttendance,
  onDeleteCourse,
  onAddQuizMark,
}) {
  const [quizInput, setQuizInput] = useState("");
  const [quizError, setQuizError] = useState("");

  const percentage = getAttendancePercentage(course);
  const status = getAttendanceStatus(percentage, threshold);
  const safeSkips = getMaxSafeSkips(course, threshold);
  const alreadyMarkedToday = course.lastMarkedDate === todayKey();

  const scorePercentage = getCoursePercentageScore(course);
  const grade = percentageToGrade(scorePercentage);
  const quizAvg = average(course.marks.quizzes);
  const assignAvg = average(course.marks.assignments);

  function handleMark(present) {
    if (alreadyMarkedToday) {
      Alert.alert("Already marked", "You've already logged attendance for today.");
      return;
    }
    onMarkAttendance(course.id, present);
  }

  function handleAddQuiz() {
    const num = Number(quizInput);
    if (quizInput.trim() === "" || Number.isNaN(num)) {
      setQuizError("Enter a valid number.");
      return;
    }
    if (num < 0 || num > 10) {
      setQuizError("Quiz score must be between 0 and 10.");
      return;
    }
    setQuizError("");
    onAddQuizMark(course.id, num);
    setQuizInput("");
  }

  function handleDelete() {
    Alert.alert(
      "Remove course?",
      `This will remove ${course.name} and all its data.`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Remove", style: "destructive", onPress: () => onDeleteCourse(course.id) },
      ]
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header title={course.name} onBack={onBack} />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={[styles.card, { borderTopColor: course.color }]}>
          <View style={styles.rowBetween}>
            <Text style={styles.code}>{course.code}</Text>
            <ProgressBadge status={status} />
          </View>

          <Text style={styles.bigPercentage}>{percentage}%</Text>
          <Text style={styles.helper}>
            {course.attended} attended / {course.classesHeld} held ·{" "}
            {course.semesterTotalClasses} total this semester
          </Text>
          <Text style={styles.helper}>
            {status === "critical"
              ? "You are below the safe threshold — attend upcoming classes."
              : `You can safely skip ${safeSkips} more class${safeSkips === 1 ? "" : "es"} and stay above ${threshold}%.`}
          </Text>

          <View style={styles.buttonRow}>
            <PrimaryButton
              title="Mark Present"
              variant="success"
              onPress={() => handleMark(true)}
              disabled={alreadyMarkedToday}
              style={{ flex: 1, marginRight: 8 }}
            />
            <PrimaryButton
              title="Mark Absent"
              variant="danger"
              onPress={() => handleMark(false)}
              disabled={alreadyMarkedToday}
              style={{ flex: 1 }}
            />
          </View>
          {alreadyMarkedToday ? (
            <Text style={styles.markedNote}>✓ Attendance already logged for today.</Text>
          ) : null}
        </View>

        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Grade Breakdown</Text>
            <Text style={[styles.gradeLetter, { color: course.color }]}>{grade.letter}</Text>
          </View>

          <View style={styles.marksRow}>
            <Text style={styles.marksLabel}>Quizzes (avg)</Text>
            <Text style={styles.marksValue}>{quizAvg.toFixed(1)} / 10</Text>
          </View>
          <View style={styles.marksRow}>
            <Text style={styles.marksLabel}>Assignments (avg)</Text>
            <Text style={styles.marksValue}>{assignAvg.toFixed(1)} / 20</Text>
          </View>
          <View style={styles.marksRow}>
            <Text style={styles.marksLabel}>Midterm</Text>
            <Text style={styles.marksValue}>{course.marks.midterm} / 30</Text>
          </View>
          <View style={styles.marksRow}>
            <Text style={styles.marksLabel}>Final</Text>
            <Text style={styles.marksValue}>
              {course.marks.final === null || course.marks.final === undefined
                ? "Not taken yet"
                : `${course.marks.final} / 40`}
            </Text>
          </View>
          <View style={[styles.marksRow, { marginTop: 4 }]}>
            <Text style={[styles.marksLabel, { fontWeight: "800" }]}>Overall</Text>
            <Text style={[styles.marksValue, { fontWeight: "800" }]}>
              {scorePercentage.toFixed(1)}%
            </Text>
          </View>

          <View style={{ marginTop: 14 }}>
            <FormInput
              label="Add a new quiz score (out of 10)"
              value={quizInput}
              onChangeText={(t) => {
                setQuizInput(t);
                if (quizError) setQuizError("");
              }}
              error={quizError}
              placeholder="e.g. 8"
              keyboardType="numeric"
              maxLength={4}
            />
            <PrimaryButton title="Add Quiz Score" variant="secondary" onPress={handleAddQuiz} />
          </View>
        </View>

        <PrimaryButton title="Remove Course" variant="danger" onPress={handleDelete} />
      </ScrollView>
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
    borderTopWidth: 4,
    borderTopColor: colors.border,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  code: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: "700",
  },
  bigPercentage: {
    fontSize: 40,
    fontWeight: "800",
    color: colors.textPrimary,
    marginTop: 8,
  },
  helper: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 16,
  },
  markedNote: {
    fontSize: 12,
    color: colors.success,
    fontWeight: "700",
    marginTop: 10,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  gradeLetter: {
    fontSize: 20,
    fontWeight: "800",
  },
  marksRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  marksLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  marksValue: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: "700",
  },
});
