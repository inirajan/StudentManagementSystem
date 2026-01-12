import bcrypt from "bcrypt";
import User from "../models/User.js";

const login = async (data) => {
  const user = await User.findOne({
    $or: [{ email: data.email }, { phone: data.phone }],
  });

  if (!user) throw { status: 404, message: "User not found." };

  const isPasswordMatch = bcrypt.compareSync(data.password, user.password);

  if (!isPasswordMatch)
    throw {
      status: 400,
      message: "Incorrect email or password.",
    };

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    address: user.address,
  };
};

const register = async (data) => {
  const user = await User.findOne({
    $or: [{ email: data.email }, { phone: data.phone }],
  });

  if (user) throw { status: 409, message: "User already exists." };

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(data.password, salt);

  const createData = await User.create({
    name: data.name,
    email: data.email,
    password: hashPassword,
    age: data.age,
    phone: data.phone,
    role: data.role,
    gender: data.gender,
    address: data.address,
  });

  return createData;
};

export default { login, register };
