const Subject = require("../models/subject");
const Class = require("../models/class");
const { addSubjectValidation, updateSubjectValidation } = require("../validations/subjectValidation");

class SubjectController {

    // ADD SUBJECT
    static addSubject = async (req, res) => {
        try {
            // Joi validation
            const { error } = addSubjectValidation.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            const { classId, name, code, maxMarks } = req.body;

            // Check class exists
            const classData = await Class.findById(classId);
            if (!classData) {
                return res.status(404).json({ message: "Class not found" });
            }

            // Create subject
            const subject = await Subject.create({
                class: classId,
                name,
                code,
                maxMarks
            });

            return res.status(201).json({
                message: "Subject added successfully",
                subject
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error" });
        }
    };

    // GET ALL SUBJECTS
    static getAllSubjects = async (req, res) => {
        try {
            const subjects = await Subject.find().populate("class", "course semister");
            res.status(200).json(subjects);
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "Server error" })
        }
    };

    // GET subject by id
    static getSubjectById = async (req, res) => {
        try {
            const { id } = req.params;

            const subject = await Subject.findById(id)
                .populate("class", "course semester"); // ✅ FIXED spelling

            if (!subject) {
                return res.status(404).json({ message: "Subject not found" });
            }

            res.status(200).json(subject);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    };

    // UPDATE SUBJECT
    static updateSubject = async (req, res) => {
        try {
            // 1️⃣ Joi validation
            const { error } = updateSubjectValidation.validate(req.body);
            if (error)
                return res.status(400).json({ message: error.details[0].message });

            const { id } = req.params;
            const { name, code, maxMarks } = req.body;

            // 2️⃣ Find subject
            const subject = await Subject.findById(id);
            if (!subject)
                return res.status(404).json({ message: "Subject not found" });

            // 3️⃣ Update fields
            if (name) subject.name = name;
            if (code) subject.code = code;
            if (maxMarks !== undefined) subject.maxMarks = maxMarks;

            await subject.save();

            res.status(200).json({
                message: "Subject updated successfully",
                subject
            });

        } catch (error) {
            if (error.code === 11000) {
                return res
                    .status(400)
                    .json({ message: "Duplicate subject code in same class" });
            }

            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    };

    // DELETE SUBJECT
    static deleteSubject = async (req, res) => {
        try {
            const { id } = req.params;

            const subject = await Subject.findByIdAndDelete(id);

            if (!subject) {
                return res.status(404).json({ message: "Subject not found" });
            }

            res.status(200).json({
                message: "Subject deleted successfully",
                subject
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    };

    // GET subjects By Class
    static getSubjectByClass = async(req,res) => {
        try{
            const {classId} = req.params;

            const subjects = await Subject.find({class : classId});
            res.status(200).json(subjects);

        } catch (error){
            res.status(500).json({message:"Server error"});

        }
    };


}

module.exports = SubjectController;
