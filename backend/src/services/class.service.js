import Class from "../models/Class.js";

const createClass = async (data) => {
  const exists = await Class.findOne({
    grade: data.grade,
    section: data.section,
    academicYear: data.academicYear,
  });

  if (exists) {
    throw new Error("Class already exists for this academic year");
  }

  return await Class.create(data);
};

const getAllClasses = async () => {
  return await Class.find({ isActive: true }).populate(
    "classTeacher",
    "name email"
  );
};

const getClassById = async (id) => {
  return await Class.findById(id).populate("classTeacher", "name email");
};

export const updateClass = async (id, data) => {
  return await Class.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteClass = async (id) => {
  return await Class.findByIdAndUpdate(id, { isActive: false }, { new: true });
};

export default {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
};
