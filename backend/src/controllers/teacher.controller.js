import teacherService from "../services/teacher.service.js";

const createStudentProfile = async (req, res) => {
  try {
    const data = await teacherService.createTeacherProfile(req.body);

    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(err.status || 400).send(err.message);
  }
};

const getAllTeachers = async (req, res) => {
  try {
    const data = await teacherService.getAllTeachers();

    res.status(201).json({ success: true, data });
  } catch (error) {
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
  } catch (error) {
    res.status(err.status || 400).send(err.message);
  }
};

const getStudentById = async (req, res) => {
  try {
    const data = await teacherService.getTeacherById(req.params.id);

    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(err.status || 400).send(err.message);
  }
};

const updateTeacher = async (req, res) => {
  try {
    const data = teacherService.updateTeacher(req.params.id, req.body);

    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(err.status || 400).send(err.message);
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const data = await teacherService.deleteTeacher(req.params.id);

    res.json(data);
  } catch (error) {
    res.status(err.status || 400).send(err.message);
  }
};

export default {
  createStudentProfile,
  getAllTeachers,
  assignSubjectToTeacher,
  getStudentById,
  updateTeacher,
  deleteTeacher,
};
