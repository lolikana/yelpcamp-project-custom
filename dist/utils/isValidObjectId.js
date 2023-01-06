"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const isValidId = async (req, res, next) => {
    const { id } = req.params;
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        req.flash('error', 'Invalid campground id');
        return res.redirect('/campgrounds');
    }
    return next();
};
exports.default = isValidId;
//# sourceMappingURL=isValidObjectId.js.map