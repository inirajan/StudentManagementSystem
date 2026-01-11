import mongoose from "mongoose";


const classSchema = new mongoose.Schema(
  {
    grade: {
      type: String,
      required: true,
      trim: true
      // Example: Nursery, LKG, UKG, 1, 2 ... 12
    },

    section: {
      type: String,
      required: true,
      uppercase: true,
      trim: true
      // A, B, C
    },

    academicYear: {
      type: String,
      required: true
      // Example: 2080, 2081
    },

    classTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// Prevent duplicate class creation
classSchema.index(
  { grade: 1, section: 1, academicYear: 1 },
  { unique: true }
);

export default mongoose.model("Class", classSchema);
