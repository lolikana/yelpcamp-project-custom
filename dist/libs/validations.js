"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReview = exports.validateCampground = void 0;
const joi_1 = __importDefault(require("joi"));
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const utils_1 = require("../utils");
const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = (0, sanitize_html_1.default)(value, {
                    allowedTags: [],
                    allowedAttributes: {}
                });
                if (clean !== value)
                    return helpers.error('string.escapeHTML', { value });
                return clean;
            }
        }
    }
});
const Joi = joi_1.default.extend(extension);
const campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required().escapeHTML(),
        location: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML(),
        price: Joi.number().min(0).required()
    }).required(),
    deleteImages: Joi.array()
});
const validateCampground = (req, _res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error !== undefined) {
        const msg = error.details.map((el) => el.message).join(',');
        throw new utils_1.ExpressError(msg, 400);
    }
    return next();
};
exports.validateCampground = validateCampground;
const reviewSchema = Joi.object({
    review: Joi.object({
        body: Joi.string().required().escapeHTML(),
        rating: Joi.number().min(1).max(5).required()
    }).required()
});
const validateReview = (req, _res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error !== undefined) {
        const msg = error.details.map((el) => el.message).join(',');
        throw new utils_1.ExpressError(msg, 400);
    }
    return next();
};
exports.validateReview = validateReview;
//# sourceMappingURL=validations.js.map