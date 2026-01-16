import assignmentService from "../services/assignment.service.js";
import uploadFile from "../utils/fileUploader.js";

const createAssignment = async (req, res) => {
  try {
    let fileUrl = null;

    if (req.file) {
      const result = await uploadFile(req.file);
      fileUrl = result[0].secure_url;
    }

    const data = await assignmentService.createAssignment(req.dat, fileUrl);

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

const submitAssignment = async (req, res) => {
  try {
    let url = null;

    if (req.file) {
      const result = await uploadFile(req.file);
      url = result[0].secure_url;
    } else if (req.body.link) url = req.body.link;

    const data = await assignmentService.submitAssignment(
      req.params.id,
      req.user._id,
      url
    );

    res.json(data);
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
};

const checkAssignment = async (req, res) => {
  try {
    const data = await assignmentService.checkAssignment(
      req.params.id,
      req.body.studentId,
      req.body.marks,
      req.body.remarks
    );

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
  submitAssignment,
  checkAssignment,
};
