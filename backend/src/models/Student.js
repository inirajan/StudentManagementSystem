import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
<<<<<<< HEAD
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",

    required: [true, "User reference is required."],
=======
  name: {
    type: String,
    required: [true, "Student name is required."],
  },

  age: {
    type: Number,
    required: [true, "Age is required."],
>>>>>>> upstream/main
  },
  studentId: {
    type: String,
<<<<<<< HEAD
    required: [true, "Student ID is required."],
    unique: true,
=======
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
>>>>>>> upstream/main
  },
  classRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: [true, "Class room is required."],
  },
  currentGPA: {
    type: String,
<<<<<<< HEAD
    required: [true, "Current Grade is required."],
=======
    required: [true, "Password is required."],
    minLength: [6, "Password length must be greater than 6."],
>>>>>>> upstream/main
  },
  attendanceRate: {
    type: String,
<<<<<<< HEAD
    required: [true, "Attendance Rate is required."],
=======
    required: [true, "Phone number is required."],
    minLength: [6, "Invalid phone number."],
    maxlength: [13, "Invalid phone number."],
>>>>>>> upstream/main
  },
  totalAbasences: {
    type: String,
    required: [true, "Total Abasences is required."],
  },
<<<<<<< HEAD
  parentContact: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Parent Contact is required."],
  },
=======

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

>>>>>>> upstream/main
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

const model = mongoose.model("Student", studentSchema);
export default model;
