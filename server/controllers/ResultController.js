// const Result = require("../models/result");
// const Student = require("../models/student");
// const Subject = require("../models/subject");
// const Joi = require("joi");

// /* ================= VALIDATION ================= */

// const addBulkResultValidation = Joi.object({
//   studentId: Joi.string().required(),

//   semester: Joi.number()
//     .min(1)
//     .max(8)
//     .required(),

//   year: Joi.number()
//     .min(2020)
//     .max(2030)
//     .required(),

//   marks: Joi.array()
//     .items(
//       Joi.object({
//         subjectId: Joi.string().required(),

//         marksObtained: Joi.number()
//           .min(0)
//           .required(),
//       })
//     )
//     .min(1)
//     .required(),
// });

// /* ================= CONTROLLER ================= */

// class ResultController {

//   // ✅ ADMIN → ADD BULK RESULT
//   static addBulkResult = async (req, res) => {

//     try {

//       const { error } =
//         addBulkResultValidation.validate(req.body);

//       if (error) {
//         return res.status(400).json({
//           message: error.details[0].message,
//         });
//       }

//       const {
//         studentId,
//         semester,
//         year,
//         marks,
//       } = req.body;

//       // ✅ Check Student
//       const student = await Student.findById(studentId);

//       if (!student) {
//         return res.status(404).json({
//           message: "Student not found",
//         });
//       }

//       let savedResults = [];
//       let skippedSubjects = [];

//       // ✅ Loop Subjects
//       for (let item of marks) {

//         const subject = await Subject.findById(
//           item.subjectId
//         );

//         // Subject not found
//         if (!subject) {

//           skippedSubjects.push({
//             subjectId: item.subjectId,
//             reason: "Subject not found",
//           });

//           continue;
//         }

//         // Duplicate check
//         const alreadyExists =
//           await Result.findOne({
//             student: studentId,
//             subject: item.subjectId,
//             semester,
//             year,
//           });

//         if (alreadyExists) {

//           skippedSubjects.push({
//             subject: subject.name,
//             reason: "Result already exists",
//           });

//           continue;
//         }

//         // Percentage
//         const percentage = Number(
//           (
//             (item.marksObtained /
//               subject.maxMarks) *
//             100
//           ).toFixed(2)
//         );

//         // Grade
//         let grade = "F";

//         if (percentage >= 90) grade = "A+";
//         else if (percentage >= 80) grade = "A";
//         else if (percentage >= 70) grade = "B";
//         else if (percentage >= 60) grade = "C";
//         else if (percentage >= 50) grade = "D";

//         // Save Result
//         const result = await Result.create({
//           student: studentId,
//           subject: item.subjectId,
//           semester,
//           year,
//           marksObtained: item.marksObtained,
//           totalMarks: subject.maxMarks,
//           percentage,
//           grade,
//         });

//         savedResults.push(result);
//       }

//       // Populate
//       const populatedResults = await Result.find({
//         _id: {
//           $in: savedResults.map((r) => r._id),
//         },
//       })
//         .populate("student", "rollNo")
//         .populate("subject", "name");

//       res.status(201).json({
//         message: "Result declared successfully",

//         totalSubjects: marks.length,

//         savedCount: savedResults.length,

//         skipped: skippedSubjects,

//         results: populatedResults,
//       });

//     } catch (error) {

//       // Duplicate Key
//       if (error.code === 11000) {

//         return res.status(400).json({
//           message: "Duplicate result entry",
//         });
//       }

//       console.log(error);

//       res.status(500).json({
//         message: "Server error",
//       });
//     }
//   };


//   // ✅ GET ALL RESULTS
//   static allResult = async (req, res) => {

//     try {

//       const results = await Result.find()
//         .populate({
//           path: "student",

//           populate: {
//             path: "user",
//             select: "name email",
//           },
//         })
//         .populate("subject");

//       res.status(200).json(results);

//     } catch (error) {

//       res.status(500).json({
//         message: error.message,
//       });
//     }
//   };


//   // ✅ GET LOGGED IN STUDENT RESULT
//   static getMyResult = async (req, res) => {

//     try {

//       // Logged In User ID
//       const userId = req.user.id;

//       // Find Student
//       const student = await Student.findOne({
//         user: userId,
//       })
//         .populate("user", "name email")
//         .populate("class", "name");

//       if (!student) {

//         return res.status(404).json({
//           message: "Student not found",
//         });
//       }

//       // Find Results
//       const results = await Result.find({
//         student: student._id,
//       })
//         .populate("subject", "name code")
//         .populate({
//           path: "student",

//           populate: [
//             {
//               path: "user",
//               select: "name email",
//             },
//             {
//               path: "class",
//               select: "name",
//             },
//           ],
//         });

//       res.status(200).json({
//         student,
//         results,
//       });

//     } catch (error) {

//       console.log(error);

//       res.status(500).json({
//         message: "Server error",
//       });
//     }
//   };


//   // ✅ DELETE RESULT
//   static deleteResult = async (req, res) => {

//     try {

//       const result = await Result.findById(
//         req.params.id
//       );

//       if (!result) {

//         return res.status(404).json({
//           success: false,
//           message: "Result not found",
//         });
//       }

//       await Result.findByIdAndDelete(
//         req.params.id
//       );

//       res.status(200).json({
//         success: true,
//         message:
//           "Result Deleted Successfully",
//       });

//     } catch (error) {

//       console.log(error);

//       res.status(500).json({
//         success: false,
//         message: "Server Error",
//       });
//     }
//   };
// }

// module.exports = ResultController;



const Result = require("../models/result");
const Student = require("../models/student");
const Subject = require("../models/subject");
const Joi = require("joi");

/* ================= VALIDATION ================= */

const addBulkResultValidation = Joi.object({
  studentId: Joi.string().required(),

  semester: Joi.number()
    .min(1)
    .max(8)
    .required(),

  year: Joi.number()
    .min(2020)
    .max(2030)
    .required(),

  marks: Joi.array()
    .items(
      Joi.object({
        subjectId: Joi.string().required(),

        marksObtained: Joi.number()
          .min(0)
          .required(),
      })
    )
    .min(1)
    .required(),
});

/* ================= CONTROLLER ================= */

class ResultController {

  // ================= ADD BULK RESULT =================
  static addBulkResult = async (req, res) => {

    try {

      const { error } =
        addBulkResultValidation.validate(req.body);

      if (error) {
        return res.status(400).json({
          message: error.details[0].message,
        });
      }

      const {
        studentId,
        semester,
        year,
        marks,
      } = req.body;

      // Find Student
      const student = await Student.findById(studentId)
        .populate("user", "name")
        .populate("class", "course semester");

      if (!student) {
        return res.status(404).json({
          message: "Student not found",
        });
      }

      let savedResults = [];
      let skippedSubjects = [];

      // Loop Subjects
      for (let item of marks) {

        const subject = await Subject.findById(
          item.subjectId
        );

        // Subject Not Found
        if (!subject) {

          skippedSubjects.push({
            subjectId: item.subjectId,
            reason: "Subject not found",
          });

          continue;
        }

        // Duplicate Check
        const alreadyExists =
          await Result.findOne({
            student: studentId,
            subject: item.subjectId,
            semester,
            year,
          });

        if (alreadyExists) {

          skippedSubjects.push({
            subject: subject.name,
            reason: "Result already exists",
          });

          continue;
        }

        // Percentage
        const percentage = Number(
          (
            (item.marksObtained /
              subject.maxMarks) *
            100
          ).toFixed(2)
        );

        // Grade
        let grade = "F";

        if (percentage >= 90) grade = "A+";
        else if (percentage >= 80) grade = "A";
        else if (percentage >= 70) grade = "B";
        else if (percentage >= 60) grade = "C";
        else if (percentage >= 50) grade = "D";

        // Save Result
        const result = await Result.create({
          student: studentId,
          subject: item.subjectId,
          semester,
          year,
          marksObtained: item.marksObtained,
          totalMarks: subject.maxMarks,
          percentage,
          grade,
        });

        savedResults.push(result);
      }

      // Populate Results
      const populatedResults = await Result.find({
        _id: {
          $in: savedResults.map((r) => r._id),
        },
      })
        .populate({
          path: "student",
          populate: [
            {
              path: "user",
              select: "name email",
            },
            {
              path: "class",
              select: "course semester",
            },
          ],
        })
        .populate("subject", "name code");

      res.status(201).json({
        message: "Result declared successfully",

        totalSubjects: marks.length,

        savedCount: savedResults.length,

        skipped: skippedSubjects,

        results: populatedResults,
      });

    } catch (error) {

      // Duplicate Key Error
      if (error.code === 11000) {

        return res.status(400).json({
          message: "Duplicate result entry",
        });
      }

      console.log(error);

      res.status(500).json({
        message: "Server error",
      });
    }
  };


  // ================= GET ALL RESULTS =================
  static allResult = async (req, res) => {

    try {

      const results = await Result.find()

        .populate({
          path: "student",

          populate: [
            {
              path: "user",
              select: "name email",
            },
            {
              path: "class",
              select: "course semester",
            },
          ],
        })

        .populate("subject", "name code maxMarks");

      res.status(200).json(results);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: error.message,
      });
    }
  };


  // ================= GET MY RESULT =================
  static getMyResult = async (req, res) => {

    try {

      // Logged In User ID
      const userId = req.user.id;

      // Find Student
      const student = await Student.findOne({
        user: userId,
      })

        .populate("user", "name email")

        .populate(
          "class",
          "course semester"
        );

      if (!student) {

        return res.status(404).json({
          message: "Student not found",
        });
      }

      // Find Results
      const results = await Result.find({
        student: student._id,
      })

        .populate("subject", "name code")

        .populate({
          path: "student",

          populate: [
            {
              path: "user",
              select: "name email",
            },
            {
              path: "class",
              select: "course semester",
            },
          ],
        });

      res.status(200).json({
        student,
        results,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server error",
      });
    }
  };


  // ================= DELETE RESULT =================
  static deleteResult = async (req, res) => {

    try {

      const result = await Result.findById(
        req.params.id
      );

      if (!result) {

        return res.status(404).json({
          success: false,
          message: "Result not found",
        });
      }

      await Result.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Result Deleted Successfully",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };
}

module.exports = ResultController ;

