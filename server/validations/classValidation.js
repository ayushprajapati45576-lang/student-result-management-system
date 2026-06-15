const Joi = require("joi");

exports.addClassValidation = Joi.object({
    course: Joi.string()
        .valid("8", "9", "10", "11", "12")
        .required(),

    semester: Joi.number()
        .min(1)
        .max(8)
        .optional()
        .allow(null)
});

exports.updateClassValidation = Joi.object({
    course: Joi.string()
        .valid("8", "9", "10", "11", "12")
        .optional(),

    semester: Joi.number()
        .min(1)
        .max(8)
        .optional()
        .allow(null)
});