# AI Usage Report — AttendEase

> Note: The assignment mentions an official AI Usage Report template as an
> attachment, which was not included in the PDF I was given. This report
> follows the standard structure such templates typically use. Please swap
> in the actual template from your course if your instructor shares one
> separately, copying the same information across.

## 1. AI Tool(s) Used
- Claude (Anthropic) — used for planning the app architecture and generating
  the initial React Native codebase.

## 2. How AI Was Used

| Activity | Description |
|---|---|
| Ideation | Discussed module options against the rubric before committing to the "Smart Attendance & GPA Companion" idea. |
| Architecture planning | Planned screen structure, data model, reusable components, and navigation approach (state-based, no nav library) before coding. |
| Code generation | Generated the initial project scaffold: components, screens, calculation utilities, and seed data. |
| Documentation | Drafted this report and the README. |

## 3. What I Reviewed, Tested, and Understood
*(Fill this in honestly before submission — this section is graded on your
actual understanding, not on what AI wrote.)*

- [ ] I ran the app in Expo Go / an emulator and manually tested every screen.
- [ ] I traced through `src/utils/calculations.js` and can explain
      `getMaxSafeSkips` and `getOverallGpa` line by line.
- [ ] I can explain why `App.js` owns all state and how props flow down to
      each screen.
- [ ] I can explain the validation logic in `AddCourseScreen.js`.
- [ ] I modified/extended at least one piece of AI-generated code myself
      (describe what you changed here).

## 4. Modifications I Made to AI-Generated Code
*(Document anything you changed — new features, bug fixes, styling tweaks,
different data, a removed/added screen, etc. This is required — submitting
unmodified AI output as-is is discouraged by the assignment brief.)*

- 
- 
- 

## 5. A Design Decision I Can Defend in the Viva
*(Pick one and be ready to explain the trade-off, e.g.: "Why is attendance
threshold configurable instead of hardcoded at 75%?" or "Why is navigation
done with state instead of a library?")*

- 

## 6. Limitations / Known Issues
- All data is stored in local React state only; it resets when the app
  reloads (no backend or persistent storage, by design/scope).
- Attendance can only be logged once per day per course (`lastMarkedDate`
  check) — a deliberate simplification, not a bug.
