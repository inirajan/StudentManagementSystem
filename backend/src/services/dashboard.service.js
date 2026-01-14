import Assginment from "../models/Assignment.js";
import ReportCard from "../models/reportCard.js";
import Student from "../models/Student.js";

const getStudentDashboard = async (userId) => {
  const student = await Student.findOne({ user: userId })
    .populate("user", "name")
    .populate("classRoom");

  if (!student)
    throw {
      status: 404,
      message: "Student not found.",
    };

  // Count assignments that are due in the future AND not submitted by this student
  const pendingAssginment = await Assginment.countDocuments({
    classRoom: student.classRoom._id,
    dueDate: { $gt: new Date() },
    submissions: { $ne: student._id },
  });

  const latestResult = await ReportCard.findOne({ student: student._id }).sort({
    createdAt: -1,
  });

  return {
    studentName: student.user.name,
    classDetails: student.classRoom
      ? `${student.classRoom.room}-${student.classRoom.section}`
      : "N/A",

    stats: {
      gpa: student.currentGPA,
      attendance: student.attendanceRate,
      pendingAssginment,
    },
    latestResult,
  };
};

export default { getStudentDashboard };
