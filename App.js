import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import colors from "./src/theme/colors";
import { initialCourses, DEFAULT_THRESHOLD, generateId } from "./src/data/initialCourses";

import Header from "./src/components/Header";
import TopTabBar from "./src/components/TopTabBar";

import DashboardScreen from "./src/screens/DashboardScreen";
import CoursesScreen from "./src/screens/CoursesScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import CourseDetailScreen from "./src/screens/CourseDetailScreen";
import AddCourseScreen from "./src/screens/AddCourseScreen";

const TAB_TITLES = {
  dashboard: "Dashboard",
  courses: "My Courses",
  settings: "Settings",
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export default function App() {
  // ---- Core application state ----
  const [courses, setCourses] = useState(initialCourses);
  const [threshold, setThreshold] = useState(DEFAULT_THRESHOLD);

  // "tabs" = main 3-tab area, "detail" / "add" are pushed screens.
  // No navigation library is used -- this is plain conditional
  // rendering driven by state, as required by the assignment.
  const [activeTab, setActiveTab] = useState("dashboard");
  const [screen, setScreen] = useState("tabs");
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  // ---- Navigation helpers ----
  function openCourse(courseId) {
    setSelectedCourseId(courseId);
    setScreen("detail");
  }

  function goToAddCourse() {
    setScreen("add");
  }

  function goBackToTabs() {
    setScreen("tabs");
    setSelectedCourseId(null);
  }

  // ---- Data mutation handlers ----
  function handleAddCourse(newCourseData) {
    const course = {
      id: generateId(),
      ...newCourseData,
      classesHeld: 0,
      attended: 0,
      lastMarkedDate: null,
      attendanceLog: [],
      marks: {
        quizzes: [],
        assignments: [],
        midterm: 0,
        final: null,
      },
    };
    setCourses((prev) => [...prev, course]);
    setScreen("tabs");
    setActiveTab("courses");
  }

  function handleMarkAttendance(courseId, present) {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id !== courseId) return c;
        return {
          ...c,
          classesHeld: c.classesHeld + 1,
          attended: present ? c.attended + 1 : c.attended,
          lastMarkedDate: todayKey(),
          attendanceLog: [
            ...c.attendanceLog,
            { date: todayKey(), present },
          ],
        };
      })
    );
  }

  function handleAddQuizMark(courseId, score) {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id !== courseId) return c;
        return {
          ...c,
          marks: {
            ...c.marks,
            quizzes: [...c.marks.quizzes, score],
          },
        };
      })
    );
  }

  function handleDeleteCourse(courseId) {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    goBackToTabs();
  }

  function handleResetData() {
    setCourses(initialCourses.map((c) => ({ ...c, marks: { ...c.marks } })));
    setThreshold(DEFAULT_THRESHOLD);
    goBackToTabs();
    setActiveTab("dashboard");
  }

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || null;
  const existingCodes = courses.map((c) => c.code.toUpperCase());
  const nextColor = colors.chartPalette[courses.length % colors.chartPalette.length];

  // ---- Render: pushed screens take over the whole app area ----
  let content;
  if (screen === "detail" && selectedCourse) {
    content = (
      <CourseDetailScreen
        course={selectedCourse}
        threshold={threshold}
        onBack={goBackToTabs}
        onMarkAttendance={handleMarkAttendance}
        onDeleteCourse={handleDeleteCourse}
        onAddQuizMark={handleAddQuizMark}
      />
    );
  } else if (screen === "add") {
    content = (
      <AddCourseScreen
        onBack={goBackToTabs}
        onSubmit={handleAddCourse}
        existingCodes={existingCodes}
        nextColor={nextColor}
      />
    );
  } else {
    let tabScreen;
    if (activeTab === "dashboard") {
      tabScreen = (
        <DashboardScreen
          courses={courses}
          threshold={threshold}
          onGoToCourses={() => setActiveTab("courses")}
        />
      );
    } else if (activeTab === "courses") {
      tabScreen = (
        <CoursesScreen
          courses={courses}
          threshold={threshold}
          onOpenCourse={openCourse}
          onAddCourse={goToAddCourse}
        />
      );
    } else {
      tabScreen = (
        <SettingsScreen
          threshold={threshold}
          onChangeThreshold={setThreshold}
          onResetData={handleResetData}
        />
      );
    }

    content = (
      <View style={{ flex: 1 }}>
        <Header title={TAB_TITLES[activeTab]} />
        <TopTabBar activeTab={activeTab} onChange={setActiveTab} />
        {tabScreen}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
