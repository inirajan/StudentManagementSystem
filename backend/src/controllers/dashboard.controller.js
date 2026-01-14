import dashboardService from "../services/dashboard.service.js";

const getStudentDashboard = async (req, res) => {
  try {
    const data = await dashboardService.getStudentDashboard(req.user._id);

    res.json(data);
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message });
  }
};

export default { getStudentDashboard };
