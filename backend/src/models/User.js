import mongoose from "mongoose";

import {
  ROLE_ADMIN,
  ROLE_PARENT,
  ROLE_STUDENT,
  ROLE_TEACHER,
} from "../constants/roles.js";

const User = new mongoose.Schema({
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

  createAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});

const model = mongoose.model("User", UserSchema);

export default model;
