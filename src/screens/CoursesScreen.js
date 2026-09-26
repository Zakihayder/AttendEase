import React, { useMemo, useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../theme/colors";
import CourseCard from "../components/CourseCard";
import EmptyState from "../components/EmptyState";
import PrimaryButton from "../components/PrimaryButton";
import { getAttendancePercentage, getAttendanceStatus } from "../utils/calculations";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "safe", label: "Safe" },
  { key: "warning", label: "Warning" },
  { key: "critical", label: "Critical" },
];

// Demonstrates: search (string filtering), filter (status filtering),
// and sort (array methods) all driven by local component state, then
// combined with .filter()/.sort() over the `courses` data array.
export default function CoursesScreen({ courses, threshold, onOpenCourse, onAddCourse }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortByRisk, setSortByRisk] = useState(false);

  const visibleCourses = useMemo(() => {
    let list = courses.filter((c) => {
      const matchesQuery =
        c.name.toLowerCase().includes(query.trim().toLowerCase()) ||
        c.code.toLowerCase().includes(query.trim().toLowerCase());

      if (!matchesQuery) return false;

      if (filter === "all") return true;
      const pct = getAttendancePercentage(c);
      const status = getAttendanceStatus(pct, threshold);
      return status === filter;
    });

    if (sortByRisk) {
      list = [...list].sort(
        (a, b) => getAttendancePercentage(a) - getAttendancePercentage(b)
      );
    }

    return list;
  }, [courses, query, filter, sortByRisk]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search by course name or code..."
        placeholderTextColor={colors.textSecondary}
        value={query}
        onChangeText={setQuery}
      />

      <View style={styles.filterRow}>
        {FILTERS.map((f) => {
          const active = f.key === filter;
          return (
            <TouchableOpacity
              key={f.key}
              style={[styles.filterChip, active && styles.filterChipActive]}
              onPress={() => setFilter(f.key)}
            >
              <Text style={[styles.filterText, active && styles.filterTextActive]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          style={[styles.sortChip, sortByRisk && styles.filterChipActive]}
          onPress={() => setSortByRisk((s) => !s)}
        >
          <Text style={[styles.filterText, sortByRisk && styles.filterTextActive]}>
            {sortByRisk ? "Sorted: Risk ↑" : "Sort by risk"}
          </Text>
        </TouchableOpacity>
      </View>

      {courses.length === 0 ? (
        <EmptyState
          icon="📚"
          title="No courses yet"
          subtitle="Add your first course to start tracking attendance and grades."
          actionLabel="+ Add Course"
          onAction={onAddCourse}
        />
      ) : visibleCourses.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No matching courses"
          subtitle="Try a different search term or filter."
        />
      ) : (
        <FlatList
          data={visibleCourses}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <CourseCard
              course={item}
              threshold={threshold}
              onPress={() => onOpenCourse(item.id)}
            />
          )}
        />
      )}

      {courses.length > 0 ? (
        <PrimaryButton
          title="+ Add Course"
          onPress={onAddCourse}
          style={styles.fabButton}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  search: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 14,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: colors.surfaceAlt,
    marginRight: 8,
    marginBottom: 8,
  },
  sortChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: colors.surfaceAlt,
    marginBottom: 8,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: colors.textOnPrimary,
  },
  fabButton: {
    position: "absolute",
    bottom: 16,
    left: 20,
    right: 20,
  },
});
