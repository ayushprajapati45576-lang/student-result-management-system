const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


class UserController {

  // REGISTER
  static register = async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      const hashed = await bcrypt.hash(password, 10);
      const admin = await UserModel.create({ name, email, password: hashed, role: "admin" })
      res.status(201).json({ message: "Admin registered", adminId: admin._id });

    } catch (error) {
      console.log(error);
      // res.status(500).json({ message: "Server error", error });
    };

  }

  // Login (Admin + Student)
  static login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      // console.log(user)
      if (!user) {
        return res.status(404).json({ message: "User not found" })
      }

      const isMatch = await bcrypt.compare(password, user.password);
      // console.log(isMatch);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      // console.log(token);

      // HTTP Only Cookie
      // res.cookie("token", token, {
      //   httpOnly: true,
      //   // secure: process.env.NODE_ENV === "production",
      //   secure: true,
      //   sameSite: "strict",
      //   maxAge: 24 * 60 * 60 * 1000
      // });

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,       // Vercel requires HTTPS
        sameSite: "none",   // CROSS DOMAIN FIX
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });


    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" })
    }
  }

  // Logout
  static logout = (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
    });
    res.status(200).json({ message: "Logout successfull" })
  }

  // Change Password
  static changePassword = async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const userId = req.user.id;  // token se aa rha hai

      // User find karo
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Old password check karo
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid old password" });
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      // Update password
      user.password = hashedNewPassword;
      await user.save();

      res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }

  }

  // ✅ PROFILE API (AUTO LOGIN)
  static profile = async (req, res) => {
    try {
      // authMiddleware se user aa raha hai
      const userId = req.user.id;

      const user = await UserModel.findById(userId).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  };
}

module.exports = UserController;
