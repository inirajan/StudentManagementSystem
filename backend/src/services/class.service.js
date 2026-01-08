import Class from "../models/Class.js";

export const createClassService = async (data) => {
  return await Class.create(data);
};

export const getAllClassesService = async () => {
  return await Class.find()
    .populate("classTeacher", "name email")
    .sort({ createdAt: -1 });
};

export const getClassByIdService = async (id) => {
  return await Class.findById(id).populate("classTeacher", "name email");
};

export const updateClassService = async (id, data) => {
  return await Class.findByIdAndUpdate(id, data, { new: true });
};

export const deleteClassService = async (id) => {
  return await Class.findByIdAndDelete(id);
};
