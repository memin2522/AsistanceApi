export function createWarningRecord(studentCode, courseName, type) 
{
  return {
    studentCode,
    courseName,
    type,
    sentAt: new Date().toISOString()
  };
}