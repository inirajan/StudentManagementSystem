import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",

    required: [true, "User reference is required."],
  },
  studentId: {
    type: String,
    required: [true, "Student ID is required."],
    unique: true,
  },
  classRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: [true, "Class room is required."],
  },
  currentGPA: {
    type: String,
    required: [true, "Current Grade is required."],
  },
  attendanceRate: {
    type: String,
    required: [true, "Attendance Rate is required."],
  },
  totalAbasences: {
    type: String,
    required: [true, "Total Abasences is required."],
  },
  parentContact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Parent Contact is required."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

const model = mongoose.model("Student", studentSchema);
export default model;
