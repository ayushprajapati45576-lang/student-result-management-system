const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {

  // ================= REGISTER =================
  static register = async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "Missing fields" });
      }

      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const hashed = await bcrypt.hash(password, 10);

      const admin = await UserModel.create({
        name,
        email,
        password: hashed,
        role: "admin"
      });

      return res.status(201).json({
        message: "Admin registered",
        adminId: admin._id
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message
      });
    }
  };

  // ================= LOGIN =================
  static login = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Missing credentials" });
      }

      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      // ✅ COOKIE FIX (Vercel + Mobile safe)
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000
      });

      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message
      });
    }
  };

  // ================= LOGOUT =================
  static logout = (req, res) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
      });

      return res.status(200).json({
        message: "Logout successful"
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message
      });
    }
  };

  // ================= CHANGE PASSWORD =================
  static changePassword = async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await UserModel.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid old password" });
      }

      const hashedNew = await bcrypt.hash(newPassword, 10);

      user.password = hashedNew;
      await user.save();

      return res.status(200).json({
        message: "Password changed successfully"
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message
      });
    }
  };

  // ================= PROFILE =================
  static profile = async (req, res) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await UserModel.findById(userId).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ user });

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message
      });
    }
  };
}

module.exports = AuthController;