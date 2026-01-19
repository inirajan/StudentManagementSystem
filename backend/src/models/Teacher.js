import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Teacher name is required"],
  },
  qualification: [{ type: String }],

  // classTeacher
  classTeacherOf: {
    type: mongoose.Schema.ObjectId,
    ref: "Class",
    default: null,
  },
  assignedClasses: [
    {
      class: {
        type: mongoose.Schema.ObjectId,
        ref: "Class",
      },
      Subject: { type: String },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});

const model = mongoose.model("Teacher", teacherSchema);
export default model;
