import * as authService from "../services/auth.service.js";

import { createJWT } from "../utils/jwt.js";


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password required" });
    }

    const user = await authService.loginUser({ email, password });

    const token = createJWT(user);

    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, 
       sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      message:"Successfully logged In",
      id: user._id,
      email: user.email,
      role: user.role,
      token
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ message: "Logged out successfully" });
};
