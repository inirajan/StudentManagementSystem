import teacherService from "../services/teacher.service.js";

const createStudentProfile = async (req, res) => {
  try {
    const data = await teacherService.createTeacherProfile(req.body);

    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(err.status || 400).send(err.message);
  }
};

const getAllTeachers = async (req, res) => {
  try {
    const data = await teacherService.getAllTeachers();

    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(err.status || 400).send(err.message);
  }
};

const assignSubjectToTeacher = async (req, res) => {
  try {
    const { classId, subject } = req.body;

    const data = await teacherService.assignSubjectToTeacher(
      req.params.id,
      classId,
      subject
    );

    res.status(201).json({ success: true, message: "Subject assigned", data });
  } catch (err) {
    res.status(err.status || 400).send(err.message);
  }
};

const getStudentById = async (req, res) => {
  try {
    const data = await teacherService.getTeacherById(req.params.id);

    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(err.status || 400).send(err.message);
  }
};

const updateTeacher = async (req, res) => {
  try {
    const data = await teacherService.updateTeacher(
      req.params.id,
      req.body,
      req.user.role,
      req.user._id
    );

    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(err.status || 400).send(err.message);
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const data = await teacherService.deleteTeacher(req.params.id);

    res.json(data);
  } catch (err) {
    res.status(err.status || 400).send(err.message);
  }
};

const getClassStudents = async (req, res) => {
  try {
    const data = await teacherService.getClassStudent(req.user._id);
    res.json({ success: true, data });
  } catch (err) {
    res.status(err.status || 400).json({ message: err.message });
  }
};

export default {
  createStudentProfile,
  getAllTeachers,
  assignSubjectToTeacher,
  getStudentById,
  updateTeacher,
  deleteTeacher,
  getClassStudents,
};
