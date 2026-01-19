import Assignment from "../models/Assignment.js";

const createAssignment = async (data, fileUrl) => {
  const assignment = await Assignment.create({
    ...data,
    fileUrl: fileUrl || null,
  });

  return assignment;
};

const getAssignmentsByClass = async (classId) => {
  if (!classId) throw { status: 400, message: "Class Id is required." };

  return await Assignment.find({ classRoom: classId }).sort({
    dueDate: 1,
  });
};

const getAssignmentById = async (id) => {
  const assignment = await Assignment.findById(id).populate(
    "grade",
    "grade section",
  );

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

  return { message: "Assignment deleted successfully." };
};

const submitAssignment = async (assignmentId, studentId, link) => {
  const assignment = await Assignment.findById(assignmentId);

  if (!assignment) throw { status: 404, message: "Not found." };
  const exists = assignment.submissions.some(
    (s) => s.student.toString() === studentId.toString(),
  );

  if (exists) throw { status: 400, message: "Already submitted." };
  assignment.submissions.push({
    student: studentId,
    submissionLink: link || "",
  });

  await assignment.save();

  return { message: "Submitted." };
};

const checkAssignment = async (assignmentId, studentId, marks, remarks) => {
  const assignment = await Assignment.findById(assignmentId);

  if (!assignment) throw { status: 404, message: "Not found." };

  const index = assignment.submissions.findIndex(
    (s) => s.student.toString() === studentId.toString(),
  );

  if (index === -1) throw { status: 404, message: "Submission not found." };

  assignment.submissions[index].marks = marks;

  assignment.submissions[index].remarks = remarks;

  assignment.submissions[index].isChecked = true;

  await assignment.save();

  return { message: "Checked." };
};

export default {
  createAssignment,
  getAssignmentsByClass,
  getAssignmentById,
  updateAssginment,
  deleteAssignment,
  submitAssignment,
  checkAssignment,
};
