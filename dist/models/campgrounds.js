"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampgroundModel = void 0;
const mongoose_1 = require("mongoose");
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
    location: String
});
exports.CampgroundModel = (0, mongoose_1.model)('Campground', CampgroundSchema);
//# sourceMappingURL=campgrounds.js.map