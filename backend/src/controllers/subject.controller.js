import subjectService from "../services/subject.service.js";

const createSubject = async (req, res) => {
  try {
    const data = await subjectService.createSubject(req.body);
    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
};

const getAllSubjects = async (req, res) => {
  try {
    const data = await subjectService.getAllSubjects();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteSubject = async (req, res) => {
  try {
    await subjectService.deleteSubject(req.params.id);
    res.json({ success: true, message: "Subject deactivated successfully." });
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
};

export default {
  createSubject,
  getAllSubjects,
  deleteSubject,
};
