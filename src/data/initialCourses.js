// Sample/seed data. This is what makes the UI "data-driven" -- every
// screen renders from this array of objects instead of hardcoded JSX.
// Deliberately varied so the dashboard/charts have something interesting
// to show out of the box (some courses safe, some warning, some critical).

let idCounter = 100;
export function generateId() {
  idCounter += 1;
  return `course-${idCounter}`;
}

export const initialCourses = [
  {
    id: "course-1",
    name: "Mobile App Development",
    code: "CS-401",
    creditHours: 3,
    color: "#7C5CFC",
    semesterTotalClasses: 45,
    classesHeld: 30,
    attended: 27,
    lastMarkedDate: null,
    attendanceLog: [], // { date, present }
    marks: {
      quizzes: [8, 7, 9],
      assignments: [18, 20],
      midterm: 24,
      final: null,
    },
  },
  {
    id: "course-2",
    name: "Database Systems",
    code: "CS-315",
    creditHours: 3,
    color: "#FF6B9D",
    semesterTotalClasses: 45,
    classesHeld: 32,
    attended: 22,
    lastMarkedDate: null,
    attendanceLog: [],
    marks: {
      quizzes: [6, 5, 7],
      assignments: [14, 16],
      midterm: 19,
      final: null,
    },
  },
  {
    id: "course-3",
    name: "Computer Networks",
    code: "CS-330",
    creditHours: 3,
    color: "#00C2A8",
    semesterTotalClasses: 40,
    classesHeld: 28,
    attended: 26,
    lastMarkedDate: null,
    attendanceLog: [],
    marks: {
      quizzes: [9, 9, 8],
      assignments: [19, 20],
      midterm: 27,
      final: null,
    },
  },
  {
    id: "course-4",
    name: "Operating Systems",
    code: "CS-322",
    creditHours: 4,
    color: "#FFB020",
    semesterTotalClasses: 48,
    classesHeld: 34,
    attended: 24,
    lastMarkedDate: null,
    attendanceLog: [],
    marks: {
      quizzes: [7, 6, 6],
      assignments: [15, 17],
      midterm: 20,
      final: null,
    },
  },
  {
    id: "course-5",
    name: "Technical Writing",
    code: "HU-210",
    creditHours: 2,
    color: "#4D96FF",
    semesterTotalClasses: 30,
    classesHeld: 20,
    attended: 19,
    lastMarkedDate: null,
    attendanceLog: [],
    marks: {
      quizzes: [9, 8, 9],
      assignments: [19, 19],
      midterm: 26,
      final: null,
    },
  },
];

export const DEFAULT_THRESHOLD = 75;
