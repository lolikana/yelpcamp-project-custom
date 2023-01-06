"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("../configs/cloudinary");
const campgrounds = __importStar(require("../controllers/campgrounds"));
const validations_1 = require("../libs/validations");
const utils_1 = require("../utils");
exports.router = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage: cloudinary_1.storage });
exports.router.route('/').get((0, utils_1.catchAsync)(campgrounds.index)).post(utils_1.isLoggedIn, upload.array('campground[images]'), validations_1.validateCampground, (0, utils_1.catchAsync)(campgrounds.create));
exports.router.get('/new', utils_1.isLoggedIn, (_req, res) => {
    res.render('campgrounds/new');
});
exports.router
    .route('/:id')
    .get(utils_1.isValidId, (0, utils_1.catchAsync)(campgrounds.read))
    .put(utils_1.isLoggedIn, utils_1.isValidId, utils_1.isAuthor, upload.array('campground[images]'), validations_1.validateCampground, (0, utils_1.catchAsync)(campgrounds.update))
    .delete(utils_1.isLoggedIn, utils_1.isValidId, (0, utils_1.catchAsync)(campgrounds.destroy));
exports.router.get('/:id/edit', utils_1.isLoggedIn, utils_1.isValidId, utils_1.isAuthor, (0, utils_1.catchAsync)(campgrounds.updateForm));
//# sourceMappingURL=campgrounds.js.map