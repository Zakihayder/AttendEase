# AttendEase — Smart Attendance & GPA Companion

A mobile-first React Native (Expo) app that helps university students answer the
questions they actually worry about every week: *"Am I about to fall below the
attendance requirement?"* and *"How many classes can I still afford to miss?"*
It replaces mental math and guesswork with a live, data-driven dashboard.

## 1. Problem Statement

Most student portals show a raw attendance percentage and stop there. Students
are left to manually calculate whether they can skip a class, how their grade
is trending, or which course needs urgent attention. AttendEase turns that raw
number into an actionable, at-a-glance system:

- A **configurable safety threshold** (default 75%) instead of a fixed rule.
- A **"safe skips remaining"** calculation per course, based on classes already
  held vs. total classes for the semester.
- A combined **attendance + grade dashboard** so students see the full academic
  picture in one place, not two separate portal pages.

## 2. Key Features

| Area | What it does |
|---|---|
| Dashboard | Bar chart (attendance per course), Pie chart (overall present/absent split), Progress rings (attendance health) + 3 summary stat cards (overall attendance, GPA, at-risk course count) |
| My Courses | Searchable, filterable (Safe/Warning/Critical), sortable (by risk) list of courses |
| Course Detail | Mark today's attendance (Present/Absent), live "safe skips" recalculation, grade breakdown (quizzes/assignments/midterm/final), add a new quiz score, remove course |
| Add Course | Fully validated form (empty fields, duplicate course code, numeric ranges) |
| Settings | Adjustable attendance threshold (+/- stepper), reset to sample data |

## 3. Tech / Concepts Demonstrated

- **React**: functional components, `useState`, `useMemo`, props drilling,
  conditional rendering, controlled inputs, lists via `.map()`/`FlatList`.
- **JavaScript**: array methods (`map`, `filter`, `reduce`, `sort`, `find`),
  object spreading/immutable updates, template literals, ternaries.
- **Navigation**: no navigation library is used. Screen switching is done via
  plain state (`activeTab`, `screen`) in `App.js`, as required by the
  assignment brief. A custom top segmented tab bar (not a bottom/side bar)
  switches between Dashboard / Courses / Settings.
- **Charts**: `react-native-chart-kit` — Bar, Pie, and Progress charts,
  satisfying the "at least two chart types" dashboard requirement with three.
- **Reusable components**: `CourseCard`, `StatCard`, `ProgressBadge`,
  `FormInput`, `EmptyState`, `ChartCard`, `PrimaryButton`, `Header`,
  `TopTabBar` — each used in 2+ places.

## 4. Project Structure

```
AttendEase/
├── App.js                     # Root component: all app state + view switching
├── app.json                   # Expo config
├── babel.config.js
├── package.json
└── src/
    ├── theme/colors.js        # Central color palette
    ├── data/initialCourses.js # Seed data (5 sample courses)
    ├── utils/calculations.js  # Attendance %, GPA, safe-skip logic (pure functions)
    ├── components/            # Reusable UI building blocks
    └── screens/                # Dashboard, Courses, CourseDetail, AddCourse, Settings
```

## 5. Setup & Run Instructions

**Requirements:** Node.js (LTS), the Expo Go app on your phone (or an emulator).

```bash
# 1. Install dependencies
cd AttendEase
npm install

# 2. Start the Expo dev server
npx expo start

# 3. Scan the QR code with Expo Go (Android) or the Camera app (iOS),
#    or press 'a' / 'i' for an Android/iOS emulator, or 'w' for web.
```

No backend, database, or environment variables are required — all data lives
in React state and resets on app reload (by design, per the assignment scope).

## 6. Suggested Viva Walkthrough

1. **Structure** — `App.js` owns all state and decides which screen to render;
   screens are "dumb" and receive data/handlers via props.
2. **React concepts** — point to `CourseCard` (props-driven), `AddCourseScreen`
   (controlled form state + validation), `CoursesScreen` (conditional
   rendering for empty/filtered states).
3. **JS/data handling** — walk through `src/utils/calculations.js`,
   specifically `getMaxSafeSkips` and `getOverallGpa`.
4. **Live modification** — change the threshold in Settings, add a course,
   or mark attendance, and show every dependent screen update instantly.
5. **AI usage** — see `AI_USAGE_REPORT.md`.
