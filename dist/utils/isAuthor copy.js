"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const campgrounds_1 = require("../models/campgrounds");
const isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const campground = await campgrounds_1.CampgroundModel.findById(id);
    if (campground?.author._id.equals(req.user._id) === false) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    return next();
};
exports.default = isAuthor;
//# sourceMappingURL=isAuthor%20copy.js.map