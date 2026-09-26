import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import colors from "../theme/colors";
import Header from "../components/Header";
import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";

// Demonstrates the "Form/Input" requirement: multiple fields, each
// with its own validation rule, plus a combined submit-time check.
// Colors are cycled from the theme palette so every new course still
// looks visually distinct without the user picking a color.
export default function AddCourseScreen({ onBack, onSubmit, existingCodes, nextColor }) {
  const [form, setForm] = useState({
    name: "",
    code: "",
    creditHours: "",
    semesterTotalClasses: "",
  });
  const [errors, setErrors] = useState({});

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate() {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Course name is required.";
    }

    if (!form.code.trim()) {
      newErrors.code = "Course code is required.";
    } else if (existingCodes.includes(form.code.trim().toUpperCase())) {
      newErrors.code = "A course with this code already exists.";
    }

    const credits = Number(form.creditHours);
    if (!form.creditHours.trim() || Number.isNaN(credits)) {
      newErrors.creditHours = "Enter a valid number.";
    } else if (credits <= 0 || credits > 6) {
      newErrors.creditHours = "Credit hours should be between 1 and 6.";
    }

    const totalClasses = Number(form.semesterTotalClasses);
    if (!form.semesterTotalClasses.trim() || Number.isNaN(totalClasses)) {
      newErrors.semesterTotalClasses = "Enter a valid number.";
    } else if (totalClasses <= 0 || totalClasses > 100) {
      newErrors.semesterTotalClasses = "Total classes should be between 1 and 100.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;

    onSubmit({
      name: form.name.trim(),
      code: form.code.trim().toUpperCase(),
      creditHours: Number(form.creditHours),
      semesterTotalClasses: Number(form.semesterTotalClasses),
      color: nextColor,
    });
  }

  return (
    <View style={{ flex: 1 }}>
      <Header title="Add Course" onBack={onBack} />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.hint}>
          New courses start at 0 classes held / 0 attended — log attendance from the course
          detail screen as the semester goes on.
        </Text>

        <FormInput
          label="Course Name"
          value={form.name}
          onChangeText={(t) => updateField("name", t)}
          error={errors.name}
          placeholder="e.g. Mobile App Development"
        />
        <FormInput
          label="Course Code"
          value={form.code}
          onChangeText={(t) => updateField("code", t)}
          error={errors.code}
          placeholder="e.g. CS-401"
          maxLength={12}
        />
        <FormInput
          label="Credit Hours"
          value={form.creditHours}
          onChangeText={(t) => updateField("creditHours", t)}
          error={errors.creditHours}
          placeholder="e.g. 3"
          keyboardType="numeric"
          maxLength={2}
        />
        <FormInput
          label="Total Classes This Semester"
          value={form.semesterTotalClasses}
          onChangeText={(t) => updateField("semesterTotalClasses", t)}
          error={errors.semesterTotalClasses}
          placeholder="e.g. 45"
          keyboardType="numeric"
          maxLength={3}
        />

        <PrimaryButton title="Save Course" onPress={handleSubmit} style={{ marginTop: 8 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  hint: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 18,
    lineHeight: 17,
  },
});
