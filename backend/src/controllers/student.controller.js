import { success } from "zod";
import studentService from "../services/student.service.js";

const createStudentProfile = async (req, res) => {
  try {
    const data = await studentService.createStudentProfile(req.body);

    res.status(201).json({ suceess: true, data });
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
};

const getStudents = async (req, res) => {
  try {
    const data = await studentService.getStudents(req.query);

    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const data = await studentService.getStudentById(req.params.id);

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
};

const updatStudent = async (req, res) => {
  try {
    const data = await studentService.updatStudent(
      req.params.id,
      req.body,
      req.user.role,
      req.user._id
    );

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const data = await studentService.deleteStudent(req.params.id);

    res.json(data);
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
};

export default {
  createStudentProfile,
  getStudents,
  getStudentById,
  updatStudent,
  deleteStudent,
};
