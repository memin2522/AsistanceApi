import { createWarningRecord } from "../models/warningRecord.model.js";
import { sendAttendanceMail } from "./mailService.js";

export function evaluateAttendance(students, course, warningRecords) {
  const newWarnings = [];

  for (const student of students) {
    const status = evaluateStudentStatus(student, course);

    if (!status) continue;

    const alreadyNotified = hasWarning(
      warningRecords,
      student.code,
      course.name,
      status
    );

    if (alreadyNotified) continue;

    notify(student, course, status);

    const record = createWarningRecord(student.code, course.name, status);
    newWarnings.push(record);
  }

  return newWarnings;
}

function evaluateStudentStatus(student, course) {
  if (student.absences >= course.sessionsLost) {
    return "FAILED";
  }

  if (student.absences === course.sessionsLost - 1) {
    return "WARNING";
  }

  return null;
}

function hasWarning(warningRecords, studentCode, courseName, type) {
  return warningRecords.some(
    r =>
      r.studentCode === studentCode &&
      r.courseName === courseName &&
      r.type === type
  );
}

function notify(student, course, type) {
  sendAttendanceMail(student, course, type);
  console.log(`[${type}] ${student.name} (${student.code}) - ${course.name}`);
}