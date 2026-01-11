import studentService from "../services/student.service.js";

const createStudent = async (req, res) => {
  try {
    const data = await studentService.createStudent(req.body);

    res.status(201).json(data);
  } catch (error) {
    res.status(400).send(error?.message);
  }
};

const getStudents = async (req, res) => {
  try {
    const data = await studentService.getStudents(req.body);

    res.status(201).json(data);
  } catch (error) {
    res.status(400).send(error?.message);
  }
};

const getStudentById = async (req, res) => {
  try {
    const data = await studentService.getStudentById(req.params.id);

    res.status(200).json(data);
  } catch (error) {
    res.status(error?.status || 500).send(error?.message);
  }
};

const updateStudent = async (req, res) => {
  try {
    const data = await studentService.updateStudent(req.params._id, req.body);

    res.status(201).json(data);
  } catch (error) {
    res.status(400).send(error?.message);
  }
};

const deleteStudent = async (req, res) => {
  try {
    const data = await studentService.deleteStudent(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(error?.status || 400).send(error?.message);
  }
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

  return { message: "Student deleted successfully." };


};



export default {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
