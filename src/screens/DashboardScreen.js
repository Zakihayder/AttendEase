import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { BarChart, PieChart, ProgressChart } from "react-native-chart-kit";
import colors from "../theme/colors";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import EmptyState from "../components/EmptyState";
import {
  getAttendancePercentage,
  getAttendanceStatus,
  getOverallAttendance,
  getOverallGpa,
  countAtRiskCourses,
} from "../utils/calculations";

const screenWidth = Dimensions.get("window").width;
const CHART_WIDTH = screenWidth - 64;

const chartConfig = {
  backgroundGradientFrom: colors.surface,
  backgroundGradientTo: colors.surface,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(124, 92, 252, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(115, 111, 141, ${opacity})`,
  propsForBackgroundLines: { stroke: colors.border },
  barPercentage: 0.6,
};

export default function DashboardScreen({ courses, threshold, onGoToCourses }) {
  if (courses.length === 0) {
    return (
      <EmptyState
        icon="📊"
        title="No data to show yet"
        subtitle="Add a course to see your attendance and grade dashboard come to life."
        actionLabel="Go to Courses"
        onAction={onGoToCourses}
      />
    );
  }

  const overallAttendance = getOverallAttendance(courses);
  const overallGpa = getOverallGpa(courses);
  const atRiskCount = countAtRiskCourses(courses, threshold);

  // Courses currently below the safe threshold, for the warning banner below.
  const riskyCourses = courses.filter((c) => {
    const pct = getAttendancePercentage(c);
    return getAttendanceStatus(pct, threshold) !== "safe";
  });

  // --- Bar chart: attendance % per course ---
  const barData = {
    labels: courses.map((c) => c.code),
    datasets: [{ data: courses.map((c) => getAttendancePercentage(c)) }],
  };

  // --- Pie chart: total present vs absent across all courses ---
  const totals = courses.reduce(
    (acc, c) => {
      acc.attended += c.attended;
      acc.missed += c.classesHeld - c.attended;
      return acc;
    },
    { attended: 0, missed: 0 }
  );
  const pieData = [
    {
      name: "Attended",
      population: totals.attended,
      color: colors.success,
      legendFontColor: colors.textSecondary,
      legendFontSize: 12,
    },
    {
      name: "Missed",
      population: totals.missed,
      color: colors.danger,
      legendFontColor: colors.textSecondary,
      legendFontSize: 12,
    },
  ];

  // --- Progress chart: per-course attendance ratio rings (top 4) ---
  const topCourses = courses.slice(0, 4);
  const progressData = {
    labels: topCourses.map((c) => c.code),
    data: topCourses.map((c) => getAttendancePercentage(c) / 100),
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.statsRow}>
        <StatCard
          label="Overall Attendance"
          value={`${overallAttendance}%`}
          accentColor={colors.primary}
        />
        <StatCard
          label="Current GPA"
          value={overallGpa.toFixed(2)}
          accentColor={colors.secondary}
        />
        <StatCard
          label="At Risk"
          value={atRiskCount}
          subtitle="course(s)"
          accentColor={atRiskCount > 0 ? colors.danger : colors.success}
        />
      </View>

      {riskyCourses.length > 0 && (
        <View style={styles.riskBanner}>
          <Text style={styles.riskBannerTitle}>⚠ Needs attention</Text>
          {riskyCourses.map((c) => (
            <Text key={c.id} style={styles.riskBannerItem}>
              {c.name} — {getAttendancePercentage(c)}%
            </Text>
          ))}
        </View>
      )}

      <ChartCard title="Attendance by Course" subtitle="Bar chart · percentage per course">
        <BarChart
          data={barData}
          width={CHART_WIDTH}
          height={210}
          yAxisSuffix="%"
          yAxisLabel=""
          fromZero
          chartConfig={chartConfig}
          style={styles.chart}
          showValuesOnTopOfBars
        />
      </ChartCard>

      <ChartCard title="Overall Attendance Split" subtitle="Pie chart · attended vs missed classes">
        <PieChart
          data={pieData}
          width={CHART_WIDTH}
          height={200}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="8"
          absolute
        />
      </ChartCard>

      <ChartCard title="Attendance Health" subtitle="Progress rings · top courses">
        <ProgressChart
          data={progressData}
          width={CHART_WIDTH}
          height={200}
          strokeWidth={10}
          radius={22}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(0, 194, 168, ${opacity})`,
          }}
          hideLegend={false}
        />
      </ChartCard>

      <Text style={styles.footerNote}>
        Threshold is currently set to {threshold}%. Change it in Settings to see every chart and
        badge update instantly.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  statsRow: {
    flexDirection: "row",
    marginBottom: 18,
    marginHorizontal: -4,
  },
  chart: {
    borderRadius: 12,
  },
  riskBanner: {
    backgroundColor: "#FFF4E5",
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  riskBannerTitle: {
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 4,
  },
  riskBannerItem: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  footerNote: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 20,
    lineHeight: 17,
  },
});