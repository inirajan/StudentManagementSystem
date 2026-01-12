import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  classRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: [true, "Class reference is required."],
  },
  subject: {
    type: String,
    required: [true, "Subject is required."],
  },
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
    required: [true, "Due date is required."],
  },

  submissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});

const model = mongoose.model("Assignment", assignmentSchema);

export default model;
