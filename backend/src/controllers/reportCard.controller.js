import reportCardService from "../services/reportCard.service.js";

const createReportCard = async (req, res) => {
  try {
    const data = await reportCardService.createReportCard(req.body);
    res.status(201).json({ success: true, data });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const getStudentReports = async (req, res) => {
  try {
    const data = await reportCardService.getStudentReports(
      req.params.studentId
    );
    res.json({ success: true, data });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const getAllReportCards = async (req, res) => {
  try {
    const data = await reportCardService.getAllReportCards();
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getReportCardById = async (req, res) => {
  try {
    const data = await reportCardService.getReportCardById(req.params.id);
    res.json({ success: true, data });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const updateReportCard = async (req, res) => {
  try {
    const data = await reportCardService.updateReportCard(
      req.params.id,
      req.body
    );
    res.json({ success: true, data });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const deleteReportCard = async (req, res) => {
  try {
    const data = await reportCardService.deleteReportCard(req.params.id);
    res.json(data);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export default {
  createReportCard,
  getStudentReports,
  getAllReportCards,
  getReportCardById,
  updateReportCard,
  deleteReportCard,
};
