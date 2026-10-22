const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    course: {
      type: String,
      enum: ["8", "9", "10", "11", "12"], // ✅ added
      required: true
    }
  },
  { timestamps: true }
);

// unique course
classSchema.index({ course: 1 }, { unique: true });

module.exports = mongoose.model("Class", classSchema);