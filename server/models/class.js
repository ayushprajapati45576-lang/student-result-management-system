const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    course: {
      type: String,
      enum: ["10" , "12"],
      required: true
    },
    semester: {
      type: Number,
      min: 1,
      max: 8,
      required: true
    }
  },
  { timestamps: true }
);

// unique course + semester
classSchema.index({ course: 1, semester: 1 }, { unique: true });

module.exports = mongoose.model("Class", classSchema); // ✅ CAPITAL C
