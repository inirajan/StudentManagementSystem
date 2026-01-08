import User from "../models/User.js";

const createStudent = async (data) => {
  return await User.create(data);
};

const getStudents = async () => {
  return await User.find();
};

const getStudentById = async (id) => {
  const student = await User.findById(id);

  if (!student)
    throw {
      status: 404,
      message: "Student not found.",
    };

  return student;
};

const updateStudent = async (id, data) => {
  const student = await getStudentById(id);

  if (!student)
    throw {
      status: 404,
      message: "Student not found.",
    };

  return await User.findByIdandUpdate(
    id,
    {
      name: data?.name,
      age: data?.age,
      email: data?.email,
      phone: data?.phone,
      dateOfBirth: data?.dateOfBirth,
    },
    { new: true }
  );
};

const deleteStudent = async (id) => {
  await getStudentById(id);

  await User.findByIdandUpdate(id);

  return { message: "Student deleted successfully.." };
};

export default {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
