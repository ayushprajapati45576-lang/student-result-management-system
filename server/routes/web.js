// const express = require('express');
// const route = express.Router();
// const AuthController = require('../controllers/AuthController');
// const authMiddleware = require('../Middleware/authmiddleware');
// const StudentController = require('../controllers/StudentController');
// const ClassController = require('../controllers/ClassController');
// const SubjectController = require('../controllers/SubjectController');
 
// // AUTH CONTROLLERS 
// route.post('/register',AuthController.register);
// route.post('/login',AuthController.login);
// route.post('/logout',AuthController.logout);
// route.post("/change-password",authMiddleware, AuthController.changePassword);
// route.get("/profile",authMiddleware,AuthController.profile);


// //Add Student
// route.post("/addStudent", authMiddleware, StudentController.addstudent);
// route.get("/getAllStudents", authMiddleware, StudentController.getAllStudents);
// route.get("/viewStudent/:id", authMiddleware, StudentController.getStudentById);
// route.put("/updateStudent/:id",authMiddleware,StudentController.updateStudent);
// route.delete("/deleteStudent/:id",authMiddleware,StudentController.deleteStudent);


// // Add Class

// route.post("/addClass", authMiddleware, ClassController.addClass);
// route.get("/allClass",authMiddleware,ClassController.getAllClasses);
// route.get("/viewClass/:id",authMiddleware,ClassController.getClassById);
// route.put("/updateClass/:id", authMiddleware,ClassController.updateClass);
// route.delete("/deleteClass/:id",authMiddleware,ClassController.deleteClass);


// // admin  only Subject add
// route.post("/add-subject",authMiddleware,SubjectController.addSubject);
// route.get("/subjects",authMiddleware,SubjectController.getAllSubjects);

// // Get Subject by class
// route.get("/subject/class/:classId",authMiddleware,SubjectController.getSubjectByClass);
// route.get("/subjects/:id", authMiddleware, SubjectController.getSubjectById);
// route.put("/updateSubject/:id",authMiddleware, SubjectController.updateSubject);
// route.delete("/deleteSubject/:id",authMiddleware,SubjectController.deleteSubject);



// //Result

// route.post("/admin/result/bulk",authMiddleware,ResultController.addBulkResult);
// route.get("/admin/all/result",authMiddleware,ResultController.allResult);
// route.get("/my-result", authMiddleware, ResultController.getMyResult);










// module.exports = route;     




const express = require('express');
const route = express.Router();

// Controllers
const AuthController = require('../controllers/AuthController');
const StudentController = require('../controllers/StudentController');
const ClassController = require('../controllers/ClassController');
const SubjectController = require('../controllers/SubjectController');
const ResultController = require('../controllers/ResultController');

// Middleware
const authMiddleware = require('../middleware/authMiddleware');


// ===================== AUTH ROUTES =====================

route.post('/register', AuthController.register);
route.post('/login', AuthController.login);
route.post('/logout', AuthController.logout);
route.post('/change-password', authMiddleware, AuthController.changePassword);
route.get('/profile', authMiddleware, AuthController.profile);


// ===================== STUDENT ROUTES =====================

route.post('/addStudent', authMiddleware, StudentController.addstudent);
route.get('/getAllStudents', authMiddleware, StudentController.getAllStudents);
route.get('/viewStudent/:id', authMiddleware, StudentController.getStudentById);
route.put('/updateStudent/:id', authMiddleware, StudentController.updateStudent);
route.delete('/deleteStudent/:id', authMiddleware, StudentController.deleteStudent);


// ===================== CLASS ROUTES =====================

route.post('/addClass', authMiddleware, ClassController.addClass);
route.get('/allClass', authMiddleware, ClassController.getAllClasses);
route.get('/viewClass/:id', authMiddleware, ClassController.getClassById);
route.put('/updateClass/:id', authMiddleware, ClassController.updateClass);
route.delete('/deleteClass/:id', authMiddleware, ClassController.deleteClass);


// ===================== SUBJECT ROUTES =====================

// Add subject (Admin)
route.post('/add-subject', authMiddleware, SubjectController.addSubject);

// Get all subjects
route.get('/subjects', authMiddleware, SubjectController.getAllSubjects);

// Get subjects by class
route.get('/subject/class/:classId', authMiddleware, SubjectController.getSubjectByClass);

// Get single subject
route.get('/subjects/:id', authMiddleware, SubjectController.getSubjectById);

// Update subject
route.put('/updateSubject/:id', authMiddleware, SubjectController.updateSubject);

// Delete subject
route.delete('/deleteSubject/:id', authMiddleware, SubjectController.deleteSubject);


// ===================== RESULT ROUTES =====================

// Bulk add results (Admin)
route.post('/admin/result/bulk', authMiddleware, ResultController.addBulkResult);

// Get all results (Admin)
route.get('/admin/all/result', authMiddleware, ResultController.allResult);

// Get logged-in student result
route.get('/my-result', authMiddleware, ResultController.getMyResult);


module.exports = route;
