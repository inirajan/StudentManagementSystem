import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Student name is required."],
  },

  age: {
    type: Number,
    required: [true, "Age is required."],
  },
  studentId: {
    type: String,
    required: [true, "Email adress is required."],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return emailRegex.test(value);
      },
    },
  },
  classRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: [true, "Class room is required."],
  },
  currentGPA: {
    type: String,
    required: [true, "Password is required."],
    minLength: [6, "Password length must be greater than 6."],
  },
  attendanceRate: {
    type: String,
    required: [true, "Phone number is required."],
    minLength: [6, "Invalid phone number."],
    maxlength: [13, "Invalid phone number."],
  },
  totalAbasences: {
    type: String,
    required: [true, "Total Abasences is required."],
  },

  gender: {
    type: String,
    required: [true, "Gender should be included."],
    enum: ["Male", "Female", "Others"],
  },

  address: {
    city: {
      type: String,
      required: [true, "Address city  is required."],
    },
    province: {
      type: String,
      required: [true, "Address province is required."],
    },
    street: String,
    country: {
      type: String,
      default: "Nepal",
    },
  },

  //Guardian Information
  parentName: String,
  parentPhone: String,
  parentEmail: String,

  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

const model = mongoose.model("Student", studentSchema);
export default model;
