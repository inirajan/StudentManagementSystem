import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Subject name is required."],
    unique: true,
    trim: true,
  },
  code: {
    type: String,
    required: [true, "Subject code is required."],
    unique: true,
    uppercase: true,
  },
  description: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

export default mongoose.model("Subject", subjectSchema);
