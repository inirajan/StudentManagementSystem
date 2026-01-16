import reportCardService from "../services/reportCard.service.js";

const createReporCard = async (req, res) => {
  try {
    const data = await reportCardService.createReporCard(req.body);

    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
};

const getStudentReports = async (req, res) => {
  try {
    const data = await reportCardService.getStudentReports(
      req.params.studentId
    );

    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
};

export default { createReporCard, getStudentReports };
