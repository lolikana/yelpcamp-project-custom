"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    body: {
        type: String
    },
    rating: {
        type: Number
    },
    author: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User'
    }
});
exports.ReviewModel = (0, mongoose_1.model)('Review', reviewSchema);
//# sourceMappingURL=review.js.map