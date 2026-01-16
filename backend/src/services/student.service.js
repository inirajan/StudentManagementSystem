import Student from "../models/Student.js";
import User from "../models/User.js";
import authService from "./auth.service.js";

const createStudentProfile = async (data) => {
  const existingProfile = await Student.findOne({ user: data.user });

  if (existingProfile)
    throw {
      status: 409,
      message: "Student profile already exists.",
    };

  return await authService.register(data);
};

const getStudents = async (query) => {
  const filter = {};

  if (query.classId) filter.classroom = query.classId;

  const student = await Student.find(filter)
    .populate("user", "-password")
    .populate("classRoom");

  return student;
};

const getStudentById = async (id) => {
  const student = await Student.findById(id)
    .populate("user", "-password")
    .populate("classRoom");

  if (!student)
    throw {
      status: 404,
      message: "Student not found.",
    };

  return student;
};

const updatStudent = async (id, data, requestorRole, requestorId) => {
  const student = await Student.findById(id);

  if (!student)
    throw {
      status: 404,
      message: "Student not found.",
    };

  if (
    requestorRole !== "ADMIN" &&
    student.user.toString() !== requestorId.toString()
  ) {
    throw { status: 403, message: "You can only update your own profile." };
  }

  return await Student.findByIdAndUpdate(id, data, { new: true })
    .populate("user", "-password")
    .populate("classRoom");
};

const deleteStudent = async (id) => {
  const student = await Student.findById(id);

  if (!student)
    throw {
      status: 404,
      message: "Student not found.",
    };

  // delete from user model
  await User.findByIdAndDelete(student.user);

  // delete from student model
  await Student.findByIdAndDelete(id);

  return { message: "Student profile and user account deleted successfully." };
};

export default {
  createStudentProfile,
  getStudents,
  getStudentById,
  updatStudent,
  deleteStudent,
};
