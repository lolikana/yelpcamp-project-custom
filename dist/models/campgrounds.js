"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampgroundModel = void 0;
const mongoose_1 = require("mongoose");
const review_1 = require("./review");
const CampgroundSchema = new mongoose_1.Schema({
    title: String,
    image: String,
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: 'no description'
    },
    location: String,
    author: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'Review'
        }
    ]
});
CampgroundSchema.post('findOneAndDelete', async (doc) => {
    if (doc !== null) {
        await review_1.ReviewModel.deleteMany({
            _id: {
                $in: doc.reviews
            }
        });
    }
});
exports.CampgroundModel = (0, mongoose_1.model)('Campground', CampgroundSchema);
//# sourceMappingURL=campgrounds.js.map