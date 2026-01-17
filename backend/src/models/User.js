import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
      message: "Invalid email address",
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

  role: {
    type: [String],
    enum: ["ADMIN", "STUDENT", "TEACHER", "PARENT"],
  },

  gender: {
    type: String,
    required: [true, "Gender is required."],
    enum: ["MALE", "FEMALE", "OTHERS"],
    default: ["MALE"],
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

const model = mongoose.model("User", userSchema);

export default model;
