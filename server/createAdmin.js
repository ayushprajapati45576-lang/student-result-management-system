const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = require("./models/user");
require("dotenv").config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.LIVE_URL);
    console.log("Connected to local DB");

    const email = "ayushprajapati45576@gmail.com";
    const existingAdmin = await UserModel.findOne({ email });

    if (existingAdmin) {
      console.log("Admin already exists! Updating password...");
      const hashed = await bcrypt.hash("12345", 10);
      existingAdmin.password = hashed;
      existingAdmin.role = "admin";
      await existingAdmin.save();
      console.log("Password updated successfully!");
    } else {
      const hashed = await bcrypt.hash("12345", 10);
      await UserModel.create({
        name: "Ayush Prajapati",
        email: email,
        password: hashed,
        role: "admin"
      });
      console.log("Admin created successfully!");
    }
  } catch (error) {
    console.log("Error:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();
