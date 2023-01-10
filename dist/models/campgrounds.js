"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampgroundModel = void 0;
const mongoose_1 = require("mongoose");
const review_1 = require("./review");
const opts = { toJSON: { virtuals: true } };
const ImageSchema = new mongoose_1.Schema({
    url: String,
    filename: String
});
ImageSchema.virtual('thumbnail').get(function () {
    return this.url?.replace('/upload', '/upload/w_200');
});
const CampgroundSchema = new mongoose_1.Schema({
    title: String,
    images: [ImageSchema],
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: 'no description'
    },
    location: String,
    geometry: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true }
    },
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
}, opts);
CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `<div class="text-black"><strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
  <p>${this.location}</p></div>`;
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