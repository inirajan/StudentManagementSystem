// src/services/users.service.js
import User from "../models/User.js";

// Create a new user
export const createUser = async (data) => {
  const user = new User(data);
  await user.save();
  return user;
};

// Get all users
export const getAllUsers = async () => {
  return await User.find().select("-password");
};

// Get a user by ID
export const getUserById = async (id) => {
  const user = await User.findById(id).select("-password");
  if (!user) throw new Error("User not found");
  return user;
};

// Update a user by ID
export const updateUser = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, { new: true }).select("-password");
  if (!user) throw new Error("User not found");
  return user;
};

// Delete a user by ID
export const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error("User not found");
};
