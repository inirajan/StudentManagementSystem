import ReportCard from "../models/reportCard.js";

const calculateGrade = (obt, total) => {
  const p = (obt / total) * 100;
  if (p >= 90) return "A+";
  if (p >= 80) return "A";
  if (p >= 70) return "B";
  if (p >= 60) return "C";
  if (p >= 50) return "D";
  return "F";
};

const createReportCard = async (data) => {
  const { student, classLevel, section, examType, subjects, teacherRemarks } =
    data;
  let obt = 0,
    total = 0,
    fail = false;

  const processed = subjects.map((s) => {
    const g = calculateGrade(s.marksObtained, s.totalMarks);

    obt += Number(s.marksObtained);
    total += Number(s.totalMarks);

    if (g === "F") fail = true;

    return { ...s, subjectGrade: g };
  });

  const overall = calculateGrade(obt, total);
  const status = overall === "F" || fail ? "Failed" : "Pass";

  return await ReportCard.create({
    student,
    classLevel,
    section,
    examType,
    teacherRemarks,
    Subjects: processed,
    grandTotalObtained: obt,
    grandTotalMarks: total,
    overallGrade: overall,
    status,
  });
};

const getStudentReports = async (studentId) => {
  return await ReportCard.find({ student: studentId }).sort({ createdAt: -1 });
};

const getAllReportCards = async () => {
  return await ReportCard.find().populate({
    path: "student",
    populate: { path: "user", select: "name" },
  });
};

const getReportCardById = async (id) => {
  const report = await ReportCard.findById(id).populate(
    "student",
    "name email",
  );

  if (!report) throw { status: 404, message: "Report card not found" };

  return report;
};

const updateReportCard = async (id, data) => {
  const report = await ReportCard.findByIdAndUpdate(id, data, { new: true });

  if (!report) throw { status: 404, message: "Report card not found" };

  return report;
};

const deleteReportCard = async (id) => {
  const report = await ReportCard.findByIdAndDelete(id);

  if (!report) throw { status: 404, message: "Report card not found" };

  return { message: "Report card deleted successfully" };
};

export default {
  createReportCard,
  getStudentReports,
  getAllReportCards,
  getReportCardById,
  updateReportCard,
  deleteReportCard,
};
