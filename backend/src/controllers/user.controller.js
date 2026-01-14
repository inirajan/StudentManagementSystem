import userService from "../services/user.service.js";

const createUser = async (req, res) => {
  try {
    const data = await userService.createUser(req.body);

    res.status(201).json({ suceess: true, data });
  } catch (error) {
    res.status(400).send(error?.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const data = await userService.getUsers(req.query);

    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(400).send(error?.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const data = await userService.getUserById(req.params.id);

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(error?.status || 500).send(error?.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const data = await userService.updateUser(req.params.id, req.body);

    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(400).send(error?.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const data = await userService.deleteUser(req.params.id);

    res.json(data);
  } catch (error) {
    res.status(error?.status || 400).send(error?.message);
  }
};

export default {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
