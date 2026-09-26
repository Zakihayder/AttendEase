// Pure JavaScript helper functions: array methods, object manipulation,
// and arithmetic used across screens. Kept separate from components so
// the same logic can be demoed/explained independently during the viva.

export function average(numbers) {
  if (!numbers || numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, n) => acc + n, 0);
  return sum / numbers.length;
}

export function getAttendancePercentage(course) {
  if (!course.classesHeld || course.classesHeld === 0) return 0;
  return Math.round((course.attended / course.classesHeld) * 100);
}

// Returns 'safe' | 'warning' | 'critical' based on how far a course's
// attendance is from the configurable threshold.
export function getAttendanceStatus(percentage, threshold) {
  if (percentage >= threshold) return "safe";
  if (percentage >= threshold - 10) return "warning";
  return "critical";
}

export const STATUS_META = {
  safe: { label: "Safe", color: "#2ECC71" },
  warning: { label: "Warning", color: "#FFB020" },
  critical: { label: "Critical", color: "#FF5252" },
};

// How many more classes can this student skip in the rest of the
// semester while still finishing at/above the threshold?
export function getMaxSafeSkips(course, threshold) {
  const remaining = course.semesterTotalClasses - course.classesHeld;
  if (remaining <= 0) return 0;

  const requiredFinalAttended = Math.ceil(
    (threshold / 100) * course.semesterTotalClasses
  );
  const stillNeeded = Math.max(0, requiredFinalAttended - course.attended);
  const safeSkips = remaining - stillNeeded;
  return Math.max(0, safeSkips);
}

// Simple weighted percentage score for a course based on quizzes,
// assignments, midterm and (optionally) final.
export function getCoursePercentageScore(course) {
  const { marks } = course;
  const quizAvg = average(marks.quizzes); // each out of 10
  const assignAvg = average(marks.assignments); // each out of 20
  const midterm = marks.midterm ?? 0; // out of 30
  const final = marks.final; // out of 40, may be null/undefined

  const quizScore = (quizAvg / 10) * 100;
  const assignScore = (assignAvg / 20) * 100;
  const midtermScore = (midterm / 30) * 100;

  if (final === null || final === undefined) {
    // Final not sat yet -> re-weight the components we do have.
    return quizScore * 0.15 + assignScore * 0.25 + midtermScore * 0.6;
  }

  const finalScore = (final / 40) * 100;
  return (
    quizScore * 0.1 + assignScore * 0.2 + midtermScore * 0.3 + finalScore * 0.4
  );
}

const GPA_SCALE = [
  { min: 85, points: 4.0, letter: "A" },
  { min: 80, points: 3.7, letter: "A-" },
  { min: 75, points: 3.3, letter: "B+" },
  { min: 70, points: 3.0, letter: "B" },
  { min: 65, points: 2.7, letter: "B-" },
  { min: 60, points: 2.3, letter: "C+" },
  { min: 55, points: 2.0, letter: "C" },
  { min: 50, points: 1.7, letter: "C-" },
  { min: 0, points: 0.0, letter: "F" },
];

export function percentageToGrade(percentage) {
  return GPA_SCALE.find((tier) => percentage >= tier.min) || GPA_SCALE[GPA_SCALE.length - 1];
}

export function getOverallGpa(courses) {
  const totalCredits = courses.reduce((acc, c) => acc + c.creditHours, 0);
  if (totalCredits === 0) return 0;

  const weightedSum = courses.reduce((acc, c) => {
    const pct = getCoursePercentageScore(c);
    const gpaPoints = percentageToGrade(pct).points;
    return acc + gpaPoints * c.creditHours;
  }, 0);

  return weightedSum / totalCredits;
}

export function getOverallAttendance(courses) {
  const totals = courses.reduce(
    (acc, c) => {
      acc.held += c.classesHeld;
      acc.attended += c.attended;
      return acc;
    },
    { held: 0, attended: 0 }
  );
  if (totals.held === 0) return 0;
  return Math.round((totals.attended / totals.held) * 100);
}

export function countAtRiskCourses(courses, threshold) {
  return courses.filter((c) => {
    const pct = getAttendancePercentage(c);
    const status = getAttendanceStatus(pct, threshold);
    return status !== "safe";
  }).length;
}
