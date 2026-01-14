import assignmentService from "../services/assignment.service.js";

const createAssignment = async (req, res) => {
  try {
    const data = await assignmentService.createAssignment(req.data);

    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
};

const getAssignmentsByClass = async (req, res) => {
  try {
    // Expecting ?classId=... in URL
    const data = await assignmentService.getAssignmentsByClass(
      req.query.classId
    );

    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
};

const getAssignmentById = async (req, res) => {
  try {
    const data = await assignmentService.getAssignmentById(req.params.id);

    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
};

const updateAssginment = async (req, res) => {
  try {
    const data = await assignmentService.updateAssginment(
      req.params.id,
      req.body
    );

    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
};

const deleteAssignment = async (req, res) => {
  try {
    const data = await assignmentService.deleteAssignment(req.params.id);

    res.json(data);
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
};

export default {
  createAssignment,
  getAssignmentsByClass,
  getAssignmentById,
  updateAssginment,
  deleteAssignment,
};
