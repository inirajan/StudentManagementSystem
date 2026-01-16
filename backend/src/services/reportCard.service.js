import ReportCard from "../models/reportCard.js";

const calculateGrade = (obtained, total) => {
  const p = (obtained / total) * 100;

  if (p >= 90) return "A+";

  if (p >= 80) return "A";

  if (p >= 70) return "B";

  if (p >= 60) return "C";

  if (p >= 50) return "D";

  return "F";
};

const createReporCard = async (data) => {
  const { student, classLevel, section, examType, subjects, teacherRemarks } =
    data;

  let grandTotalObtained = 0;
  let grandTotalMarks = 0;
  let hasFailed = false;

  const processedSubjects = subjects.map((sub) => {
    const grade = calculateGrade(sub.marksObtained, sub.totalMarks);

    grandTotalObtained += Number(sub.marksObtained);
    grandTotalMarks += Number(sub.totalMarks);

    if (grade === "F") hasFailed = true;

    return { ...sub, subjectGrade: grade };
  });

  const overallGrade = calculateGrade(grandTotalObtained, grandTotalMarks);

  const status = overallGrade === "F" || hasFailed ? "Failed" : "Pass";

  return await ReportCard.create({
    student,
    classLevel,
    section,
    examType,
    teacherRemarks,
    Subject: processedSubjects,
    grandTotalObtained,
    grandTotalMarks,
    overallGrade,
    status,
  });
};

const getStudentReports = async (studenId) => {
  return await ReportCard.find({ student: studenId }).sort({ createdAt: -1 });
};

export default {
  createReporCard,
  getStudentReports,
};
