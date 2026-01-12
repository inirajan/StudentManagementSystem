import User from "../models/User.js";
import authService from "./auth.service.js";

const createUser = async (data) => {
  return await authService.register(data);
};

const getUsers = async (qurey) => {
  const data = await User.find(qurey);

  return data;
};

const getUserById = async (id) => {
  const user = await User.findById(id);

  if (!user)
    throw {
      status: 404,
      message: "User not found",
    };

  return user;
};

const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(
    id,
    {
      name: data?.name,
      address: data?.address,
      phone: data?.phone,
      email: data?.email,
    },
    { new: true }
  );
};

const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);

  return "User deleted successfully";
};

export default {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
