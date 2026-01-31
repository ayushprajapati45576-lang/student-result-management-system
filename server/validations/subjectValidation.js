const Joi = require("joi");

const addSubjectValidation = Joi.object({
    classId: Joi.string().hex().length(24).required(),
    name: Joi.string().min(3).required(),
    code: Joi.string().uppercase().required(),
    maxMarks: Joi.number().min(50).max(100).optional()
});

const updateSubjectValidation = Joi.object({
    name: Joi.string().min(3).optional(),
    code: Joi.string().uppercase().optional(),
    maxMarks: Joi.number().min(50).max(100).optional()
});

module.exports = {
    addSubjectValidation,
    updateSubjectValidation
};
