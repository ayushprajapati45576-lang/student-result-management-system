const Student = require("../models/student");
const User = require("../models/user");
const Class = require("../models/class");
const bcrypt = require("bcrypt");

const {
    addStudentValidation,
    updateStudentValidation
} = require("../validations/studentValidation");

class StudentController {

    // ➕ ADD STUDENT
    static addstudent = async (req, res) => {
        try {
            const { error } = addStudentValidation.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const { name, rollNo, classId, year, password, email } = req.body;

            // roll no duplicate
            if (await Student.findOne({ rollNo })) {
                return res.status(400).json({ message: "Roll number already exists" });
            }

            // ✅ CLASS EXIST CHECK (FIXED)
            const classExist = await Class.findById(classId);
            if (!classExist) {
                return res.status(400).json({ message: "Class not found" });
            }

            const studentEmail = email || `${rollNo}@college.com`;

            // email duplicate
            if (await User.findOne({ email: studentEmail })) {
                return res.status(400).json({ message: "Email already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            // create user
            const user = await User.create({
                name,
                email: studentEmail,
                password: hashedPassword,
                role: "student"
            });

            // create student
            const student = await Student.create({
                user: user._id,
                rollNo,
                class: classId,
                year
            });

            res.status(201).json({
                message: "Student added successfully",
                student
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    };

    // 📋 GET ALL STUDENTS
    static getAllStudents = async (req, res) => {
        try {
            const students = await Student.find()
                .populate("user", "name email")
                .populate("class", "course semester"); // ✅ CORRECT

            res.status(200).json(students);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    };

    // 👁️ GET SINGLE STUDENT BY ID
    static getStudentById = async (req, res) => {

        const student = await Student.findById(req.params.id)
            .populate("user", "name email")
            .populate("class", "course semester");

        if (!student)
            return res.status(404).json({ message: "Student not found" });


        res.status(200).json(student);

    };

    // ✏️ UPDATE STUDENT
    static updateStudent = async (req, res) => {
        try {
            const { error } = updateStudentValidation.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            // const { id } = req.params;


            const student = await Student.findById(req.params.id);
            if (!student)
                return res.status(404).json({ message: "Student not found" });


            const user = await User.findById(student.user);

            const { name, email, password, classId, year } = req.body;

            // if (!user) {
            //     return res.status(404).json({ message: "User not found" });
            // }

            if (name) user.name = name;

            if (email && email !== user.email) {
                if (await User.findOne({ email })) {
                    return res.status(400).json({ message: "Email already exists" });
                }
                user.email = email;
            }

            if (password) {
                user.password = await bcrypt.hash(password, 10);
            }

            await user.save();

            if (year) student.year = year;


            await student.save();

            res.status(200).json({
                message: "Student updated successfully"
            });

        } catch (error) {
            // console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    };

    // 🗑️ DELETE STUDENT
    static deleteStudent = async (req, res) => {



        const student = await Student.findById(req.params.id);
        if (!student)
            return res.status(404).json({ message: "Student not found" });

        await User.findByIdAndDelete(student.user);
        await Student.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Student deleted successfully" });
    };
};
    


module.exports = StudentController;
