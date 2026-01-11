import mongoose from "mongoose";

const reportCardSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: [true, "Student reference is required."],
  },
  classLevel: {
    type: String,
    required: [true, "Class Level is required."],
  },
  section: {
    type: String,
    required: [true, "Section is required."],
  },
  examType: {
    type: String,
    required: [true, "Exam Type is required."],
    enum: ["Midterm", "Final", "Firstterm"],
    default: "Final",
  },
  Subjects: [
    {
      subejectName: {
        type: String,
        required: [true, "Subject Name is required."],
      },
      marksObtained: {
        type: Number,
        required: [true, "Marks Obtained is required."],
      },
      totalMarks: {
        type: Number,
        required: [true, "Total Marks is required."],
      },
      subjeGrade: {
        type: String,
        required: [true, "Subject Grade is required."],
      },
    },
  ],

  garndTotalObtained: {
    type: Number,
    required: [true, "Grand Total Obtained is required."],
  },
  garndTotalMarks: {
    type: Number,
    required: [true, "Grand Total Marks is required."],
  },
  overallGrade: {
    type: String,
    required: [true, "Overall Grade is required."],
  },

  status: {
    type: String,
    enum: ["Pass", "Failed"],
    default: "Pass",
  },
  teacherRemarks: {
    type: String,
    required: [true, "Teacher Remarks is required."],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});

const model = mongoose.model("StudentResult", studentResultSchema);
export default model;
