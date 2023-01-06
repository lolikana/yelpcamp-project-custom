"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const review_1 = require("../models/review");
const isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await review_1.ReviewModel.findById(reviewId);
    if (review?.author._id.equals(req.user._id) === false) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    return next();
};
exports.default = isReviewAuthor;
//# sourceMappingURL=isReviewAuthor.js.map