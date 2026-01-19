import Subject from "../models/Subject.js";

const createSubject = async (data) => {
  const exists = await Subject.findOne({ name: data.name });
  if (exists) throw { status: 409, message: "Subject already exists." };

  return await Subject.create(data);
};

const getAllSubjects = async () => {
  return await Subject.find({ isActive: true });
};

const getSubjectById = async (id) => {
  const subject = await Subject.findById(id);
  if (!subject) throw { status: 404, message: "Subject not found." };
  return subject;
};

const updateSubject = async (id, data) => {
  return await Subject.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const deleteSubject = async (id) => {
  // Soft delete by setting isActive to false
  return await Subject.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true },
  );
};

export default {
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
