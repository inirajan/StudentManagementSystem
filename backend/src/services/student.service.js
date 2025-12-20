import Student from "../models/Student.js";

const createStudent = async (data) => {
<<<<<<< HEAD
=======
  console.log(data);
>>>>>>> f228c2b (connection)
  return await Student.create(data);
};

const getStudents = async () => {
  return await Student.find();
};

export default {
  createStudent,
  getStudents,
};
