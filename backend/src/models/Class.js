import mongoose from "mongoose";

<<<<<<< HEAD
=======

>>>>>>> upstream/main
const classSchema = new mongoose.Schema(
  {
    grade: {
      type: String,
      required: true,
<<<<<<< HEAD
      trim: true,
=======
      trim: true
>>>>>>> upstream/main
      // Example: Nursery, LKG, UKG, 1, 2 ... 12
    },

    section: {
      type: String,
      required: true,
      uppercase: true,
<<<<<<< HEAD
      trim: true,
=======
      trim: true
>>>>>>> upstream/main
      // A, B, C
    },

    academicYear: {
      type: String,
<<<<<<< HEAD
      required: true,
=======
      required: true
>>>>>>> upstream/main
      // Example: 2080, 2081
    },

    classTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
<<<<<<< HEAD
      default: null,
=======
      default: null
>>>>>>> upstream/main
    },

    isActive: {
      type: Boolean,
<<<<<<< HEAD
      default: true,
    },
=======
      default: true
    }
>>>>>>> upstream/main
  },
  { timestamps: true }
);

// Prevent duplicate class creation
<<<<<<< HEAD
classSchema.index({ grade: 1, section: 1, academicYear: 1 }, { unique: true });
=======
classSchema.index(
  { grade: 1, section: 1, academicYear: 1 },
  { unique: true }
);
>>>>>>> upstream/main

export default mongoose.model("Class", classSchema);
