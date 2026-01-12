import jwt from "jsonwebtoken";
<<<<<<< HEAD
import config from "../config/config.js";

const createJWT = (data) => {
  const token = jwt.sign(data, config.jwtSecret, { expiresIn: "30d" });

  console.log(token);

  return token;
};

const verifyJWT = async (token) => {
  return await new Promise((resolve, reject) => {
    jwt.verify(token, config.jwtSecret, (error, data) => {
      if (error) return reject(error);

      resolve(data);
    });
  });
};

export default { createJWT, verifyJWT };
=======

export const createJWT = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};
>>>>>>> upstream/main
