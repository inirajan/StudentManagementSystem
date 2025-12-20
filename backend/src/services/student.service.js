import Student from "../models/Student.js";

const createStudent = async (data) => {
  console.log(data);
  return await Student.create(data);
};

const getStudents = async () => {
  return await Student.find();
};

export default {
  createStudent,
  getStudents,
};
