import classService from "../services/class.service.js";

const createClass = async (req, res) => {
  try {
    const newClass = await classService.createClass(req.body);

    res.status(201).json({
      success: true,
      data: newClass,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllClasses = async (req, res) => {
  try {
    const classes = await classService.getAllClasses();

    res.json({
      success: true,
      data: classes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getClassById = async (req, res) => {
  try {
    const singleClass = await classService.getClassById(req.params.id);

    if (!singleClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    res.json({
      success: true,
      data: singleClass,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid class ID",
    });
  }
};

const updateClass = async (req, res) => {
  try {
    const updatedClass = await classService.updateClass(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: updatedClass,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteClass = async (req, res) => {
  try {
    await classService.deleteClass(req.params.id);

    res.json({
      success: true,
      message: "Class deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
};
