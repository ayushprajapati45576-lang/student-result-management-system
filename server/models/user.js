const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    }, 
    email: {
      type: String, 
      required: true,
      unique: true,
      sparse: true   // sparse: true allows multiple null value 
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["admin", "student"],
      default: "student"   // ✅ default added
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
