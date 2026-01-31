const Joi = require("joi");

// Add Student Validation
const addStudentValidation = Joi.object({
  name: Joi.string().min(2).required(),
  rollNo: Joi.string().required(),
  classId : Joi.string().required(),
  year: Joi.number().min(2020).max(2030).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().optional() // you can change to .required() if needed
}); 

// Update Student Validation (partial updates allowed)
const updateStudentValidation = Joi.object({
  name: Joi.string().min(2).optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional(),
  classId: Joi.string().optional(),
  year: Joi.number().optional(),
  
  
});

module.exports = { addStudentValidation, updateStudentValidation };  
