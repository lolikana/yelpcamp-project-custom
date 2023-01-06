"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.create = void 0;
const models_1 = require("../models");
const create = async (req, res) => {
    const { id } = req.params;
    const campground = await models_1.CampgroundModel.findById(id);
    const review = new models_1.ReviewModel(req.body.review);
    review.author = req.user._id;
    campground?.reviews.push(review.id);
    await campground?.save();
    await review.save();
    req.flash('success', 'Created new review');
    res.redirect(`/campgrounds/${campground?._id}`);
};
exports.create = create;
const destroy = async (req, res) => {
    const { id, reviewId } = req.params;
    await models_1.CampgroundModel.findByIdAndUpdate(id, {
        $pull: { reviews: reviewId }
    });
    await models_1.ReviewModel.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review');
    res.redirect(`/campgrounds/${id}`);
};
exports.destroy = destroy;
//# sourceMappingURL=reviews.js.map