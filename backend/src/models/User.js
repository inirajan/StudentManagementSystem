import mongoose from "mongoose";

<<<<<<< HEAD
const userSchema = new mongoose.Schema({
=======
import {
  ROLE_ADMIN,
  ROLE_PARENT,
  ROLE_STUDENT,
  ROLE_TEACHER,
} from "../constants/roles.js";

const User = new mongoose.Schema({
>>>>>>> upstream/main
  name: {
    type: String,
    required: [true, "Name is required."],
  },

  age: {
    type: String,
    required: [true, "Age is required."],
  },

  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        return emailRegex.test(value);
      },
<<<<<<< HEAD
      message: "Invalid email address",
=======
>>>>>>> upstream/main
    },
  },

  password: {
    type: String,
    required: [true, "Password is required."],
    minLength: [6, "Password length must be grater than 6."],
  },

  phone: {
    type: String,
    required: [true, "Phone Number is required."],
    minLength: [6, "Invalid phone number."],
    maxLength: [13, "Invalid phone number."],
  },

<<<<<<< HEAD
  role: {
    type: [String],
    default: ["STUDENT"],
    enum: ["ADMIN", "STUDENT", "TEACHER", "PARENT"],
  },

  gender: {
    type: [String],
    required: [true, "Gender is required."],
    enum: ["MALE", "FEMALE", "OTHERS"],
    default: ["MALE"],
=======
  dateOfBirth: {
    type: Date,
    // required: [true, "Age is required."],
  },

  role: {
    type: String,
    required: [true, "Role is required."],
    enum: { ROLE_ADMIN, ROLE_STUDENT, ROLE_TEACHER, ROLE_PARENT },
  },
  gender: {
    type: [String],
    required: [true, "Gender is required."],
    enum: ["Male", "Female", "Others"],
>>>>>>> upstream/main
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

<<<<<<< HEAD
=======
  //Guardian Information
  parentName: String,
  parentPhone: String,
  parentEmail: String,

>>>>>>> upstream/main
  createAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});

<<<<<<< HEAD
const model = mongoose.model("User", userSchema);
=======
const model = mongoose.model("User", UserSchema);
>>>>>>> upstream/main

export default model;
