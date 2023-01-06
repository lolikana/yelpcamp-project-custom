"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidId = exports.isReviewAuthor = exports.isLoggedIn = exports.isAuthor = void 0;
const mongoose_1 = require("mongoose");
const campgrounds_1 = require("../models/campgrounds");
const review_1 = require("../models/review");
const isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await campgrounds_1.CampgroundModel.findById(id);
    if (campground?.author._id.equals(req.user._id) === false) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    return next();
};
exports.isAuthor = isAuthor;
const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in');
        return res.redirect('/login');
    }
    return next();
};
exports.isLoggedIn = isLoggedIn;
const isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await review_1.ReviewModel.findById(reviewId);
    if (review?.author._id.equals(req.user._id) === false) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    return next();
};
exports.isReviewAuthor = isReviewAuthor;
const isValidId = async (req, res, next) => {
    const { id } = req.params;
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        req.flash('error', 'Invalid campground id');
        return res.redirect('/campgrounds');
    }
    return next();
};
exports.isValidId = isValidId;
//# sourceMappingURL=middleware.js.map