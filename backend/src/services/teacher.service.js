import Teacher from "../models/Teacher.js";
import Class from "../models/Class.js";
import User from "../models/User.js";
import Student from "../models/Student.js";
import authService from "../services/auth.service.js";

const createTeacherProfile = async (data) => {
  const exist = await Teacher.findOne({ user: data.user });

  if (exist)
    throw {
      status: 409,
      message: "Teacher Profile already exists.",
    };

  const teacher = await authService.register(data);

  return teacher;
};

const assignSubjectToTeacher = async (teacherUserId, classId, subject) => {
  const teacher = await Teacher.findOne({ user: teacherUserId });

  if (!teacher) throw { status: 404, message: "Teacher not found" };

  const isAssigned = teacher.assignedClasses.some(
    (item) =>
      item.class.toString() === classId.toString() && item.Subject === subject
  );

  if (isAssigned)
    throw {
      status: 400,
      message: "Teacher already assigned to this subject in this class.",
    };

  teacher.assignedClasses.push({ class: classId, subject: subject });

  return await teacher.save();
};

const getAllTeachers = async () => {
  return await Teacher.find()
    .populate("user", "name email phone")
    .populate("classTeacherOf", "grade section")
    .populate("assignedClasses.class", "grade section");
};

const getTeacherById = async (id) => {
  const teacher = await Teacher.findById(id)
    .populate("user", "name email phone")
    .populate("classTeacherOf", "grade section")
    .populate("assignedClasses.class", "grade section");

  if (!teacher)
    throw {
      status: 404,
      message: "Teacher not found.",
    };

  return teacher;
};

const updateTeacher = async (id, data, requestorRole, requestorId) => {
  const teacher = await Teacher.findById(id);

  if (!teacher) throw { status: 404, message: "Teacher not found" };

  if (
    requestorRole !== "ADMIN" &&
    teacher.user.toString() !== requestorId.toString()
  ) {
    throw {
      status: 403,
      message: "You can only update your own profile.",
    };
  }

  return await Teacher.findByIdAndUpdate(id, data, {
    new: true,
  });
};

const deleteTeacher = async (id) => {
  const teacher = await Teacher.findById(id);

  if (!teacher) throw { status: 404, message: "Teacher not found." };

  if (teacher.classTeacherOf) {
    await Class.findByIdAndUpdate(teacher.classTeacherOf, {
      $unset: { classTeacher: "" },
    });
  }

  await User.findByIdAndDelete(teacher.user);
  await Teacher.findByIdAndDelete(id);

  return { message: "Teacher deleted successfully." };
};

const getClassStudent = async (teacherUserId) => {
  const teacher = await Teacher.findOne({ user: teacherUserId });

  if (!teacher || !teacher.classTeacherOf) {
    throw { status: 404, message: "You are not assigned as a Class Teacher." };
  }

  // Return students with embedded parent info visible
  return await Student.find({ classRoom: teacher.classTeacherOf }).populate(
    "user",
    "name email phone rollNumber"
  );
};

export default {
  createTeacherProfile,
  assignSubjectToTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  getClassStudent,
};
