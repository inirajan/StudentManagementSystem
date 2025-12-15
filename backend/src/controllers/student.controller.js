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

export default {
  createStudent,
  getStudents,
};
