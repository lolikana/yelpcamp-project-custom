"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReview = exports.validateCampground = void 0;
const joi_1 = __importDefault(require("joi"));
const utils_1 = require("../utils");
const campgroundSchema = joi_1.default.object({
    campground: joi_1.default.object({
        title: joi_1.default.string().required(),
        location: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        price: joi_1.default.number().min(0).required()
    }).required(),
    deleteImages: joi_1.default.array()
});
const validateCampground = (req, _res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error !== undefined) {
        const msg = error.details.map(el => el.message).join(',');
        throw new utils_1.ExpressError(msg, 400);
    }
    return next();
};
exports.validateCampground = validateCampground;
const reviewSchema = joi_1.default.object({
    review: joi_1.default.object({
        body: joi_1.default.string().required(),
        rating: joi_1.default.number().min(1).max(5).required()
    }).required()
});
const validateReview = (req, _res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error !== undefined) {
        const msg = error.details.map(el => el.message).join(',');
        throw new utils_1.ExpressError(msg, 400);
    }
    return next();
};
exports.validateReview = validateReview;
//# sourceMappingURL=validations.js.map