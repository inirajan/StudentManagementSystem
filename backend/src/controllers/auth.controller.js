import authService from "../services/auth.service.js";
import jwt from "../utils/jwt.js";

const login = async (req, res) => {
  try {
    const data = await authService.login(req.body);

    //generate token
    const token = jwt.createJWT(data);

    res.cookie("authToken", token, { maxAge: 86400 * 1000 });

    res.status(200).json({ data: data, message: "User logged In." });
  } catch (error) {
    res.status(error?.status || 500).send(error?.message);
  }
};

const register = async (req, res) => {
  try {
    const data = await authService.register(req.body);

    res.status(201).json(data);
  } catch (error) {
    res.status(error?.status || 409).send(error?.message);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("authToken");

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(error?.status || 409).send(error?.message);
  }
};

export default {
  login,
  register,
  logout,
};
