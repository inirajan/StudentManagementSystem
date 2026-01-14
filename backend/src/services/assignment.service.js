import Assignment from "../models/Assignment.js";

const createAssignment = async (data) => {
  const assignment = await Assignment.create(data);

  return assignment;
};

const getAssignmentsByClass = async (classId) => {
  if (!classId) throw { status: 400, message: "Class Id is required." };

  return await Assignment.find({ classRoom: classId }).sort({
    dueDate: 1,
  });
};

const getAssignmentById = async (id) => {
  const assignment = await Assignment.findById(id).populate("classRoom");

  if (!assignment)
    throw {
      status: 400,
      message: "Assignment not Found.",
    };

  return assignment;
};

const updateAssginment = async (id, data) => {
  const assignment = await Assignment.findByIdAndUpdate(id, data, {
    new: true,
  });

  if (!assignment)
    throw {
      status: 400,
      message: "Assignment not Found.",
    };

  return assignment;
};

const deleteAssignment = async (id) => {
  const assignment = await Assignment.findOneAndDelete(id);

  if (!assignment)
    throw {
      status: 400,
      message: "Assignment not Found.",
    };

  //if student have submitted then converting id into string
  const hasSubmitted = assignment.submissions.som(
    (subId) => subId.toString() === studentId.toString()
  );

  if (hasSubmitted)
    throw {
      status: 400,
      message: "You have already sumbitted the assignment.",
    };

  //adding student to submission
  assignment.submissions.push(studentId);
  await assignment.save();

  return { message: "Assginment submitted successfully." };
};

export default {
  createAssignment,
  getAssignmentsByClass,
  getAssignmentById,
  updateAssginment,
  deleteAssignment,
};
