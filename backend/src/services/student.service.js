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

  return await Student.create(data);
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

const updatStudent = async (id, data) => {
  const student = await Student.findByIdAndUpdate(id, data, { new: true })
    .populate("user", "-password")
    .populate("classRoom");

  if (!student)
    throw {
      status: 404,
      message: "Student not found.",
    };

  return student;
};

const deleteStudent = async (id) => {
  const student = await Student.findById(id);

  if (!student)
    throw {
      status: 404,
      message: "Student not found.",
    };

  // delete from user
  await User.findByIdAndDelete(student.user);

  // delete from student
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
