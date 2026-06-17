const Joi = require("joi");

exports.addClassValidation = Joi.object({
    course: Joi.string()
        .valid("8", "9", "10", "11", "12")
        .required()
});

exports.updateClassValidation = Joi.object({
    course: Joi.string()
        .valid("8", "9", "10", "11", "12")
        .optional()
});