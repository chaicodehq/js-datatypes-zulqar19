/**
 * 📝 School Report Card Generator
 *
 * Sharma ji ke bete ka report card generate karna hai! Student ka naam aur
 * subjects ke marks milenge, tujhe pura analysis karke report card banana hai.
 *
 * Rules:
 *   - student object: { name: "Rahul", marks: { maths: 85, science: 92, ... } }
 *   - Calculate using Object.values() and array methods:
 *     - totalMarks: sum of all marks (use reduce)
 *     - percentage: (totalMarks / (numSubjects * 100)) * 100,
 *       rounded to 2 decimal places using parseFloat(val.toFixed(2))
 *     - grade based on percentage:
 *       "A+" (>= 90), "A" (>= 80), "B" (>= 70), "C" (>= 60), "D" (>= 40), "F" (< 40)
 *     - highestSubject: subject name with highest marks (use Object.entries)
 *     - lowestSubject: subject name with lowest marks
 *     - passedSubjects: array of subject names where marks >= 40 (use filter)
 *     - failedSubjects: array of subject names where marks < 40
 *     - subjectCount: total number of subjects (Object.keys().length)
 *   - Hint: Use Object.keys(), Object.values(), Object.entries(),
 *     reduce(), filter(), map(), Math.max(), Math.min(), toFixed()
 *
 * Validation:
 *   - Agar student object nahi hai ya null hai, return null
 *   - Agar student.name string nahi hai ya empty hai, return null
 *   - Agar student.marks object nahi hai ya empty hai (no keys), return null
 *   - Agar koi mark valid number nahi hai (not between 0 and 100 inclusive),
 *     return null
 *
 * @param {{ name: string, marks: Object<string, number> }} student
 * @returns {{ name: string, totalMarks: number, percentage: number, grade: string, highestSubject: string, lowestSubject: string, passedSubjects: string[], failedSubjects: string[], subjectCount: number } | null}
 *
 * @example
 *   generateReportCard({ name: "Rahul", marks: { maths: 85, science: 92, english: 78 } })
 *   // => { name: "Rahul", totalMarks: 255, percentage: 85, grade: "A",
 *   //      highestSubject: "science", lowestSubject: "english",
 *   //      passedSubjects: ["maths", "science", "english"], failedSubjects: [],
 *   //      subjectCount: 3 }
 *
 *   generateReportCard({ name: "Priya", marks: { maths: 35, science: 28 } })
 *   // => { name: "Priya", totalMarks: 63, percentage: 31.5, grade: "F", ... }
 */
export function generateReportCard(student) {
  if(!student || typeof student !== "object" || Array.isArray(student) || typeof student.name !== "string" || student.name.trim() === "" || typeof student.marks !== "object" || Array.isArray(student.marks) || !student.marks){
    return null
  }

  const entries = Object.entries(student.marks);
  if (entries.length === 0) return null;

  // 2. Ek hi REDUCE mein sab kuch calculate karo
  const analysis = entries.reduce((acc, [subject, mark]) => {
    // Validation check: marks 0-100 ke beech hone chahiye
    if (typeof mark !== 'number' || mark < 0 || mark > 100) {
      acc.isValid = false;
    }

    acc.totalMarks += mark;

    // Highest Subject dhundho
    if (mark > acc.maxMark) {
      acc.maxMark = mark;
      acc.highestSubject = subject;
    }

    // Lowest Subject dhundho
    if (mark < acc.minMark) {
      acc.minMark = mark;
      acc.lowestSubject = subject;
    }

    // Passed/Failed list mein dalo
    if (mark >= 40) acc.passedSubjects.push(subject);
    else acc.failedSubjects.push(subject);

    return acc;
  }, {
    totalMarks: 0,
    maxMark: -1,
    minMark: 101,
    highestSubject: "",
    lowestSubject: "",
    passedSubjects: [],
    failedSubjects: [],
    isValid: true
  });

  if (!analysis.isValid) return null;

  // 3. Final Calculations
  const subjectCount = entries.length;
  const percentage = parseFloat(((analysis.totalMarks / (subjectCount * 100)) * 100).toFixed(2));

  let grade = "F";
  if (percentage >= 90) grade = "A+";
  else if (percentage >= 80) grade = "A";
  else if (percentage >= 70) grade = "B";
  else if (percentage >= 60) grade = "C";
  else if (percentage >= 40) grade = "D";

  return {
    name: student.name,
    totalMarks: analysis.totalMarks,
    percentage,
    grade,
    highestSubject: analysis.highestSubject,
    lowestSubject: analysis.lowestSubject,
    passedSubjects: analysis.passedSubjects,
    failedSubjects: analysis.failedSubjects,
    subjectCount
  };
}