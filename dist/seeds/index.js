"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const campgrounds_1 = require("../models/campgrounds");
const cities_1 = require("./cities");
const helpers_1 = require("./helpers");
mongoose_1.default
    .connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(res => res)
    .catch(err => console.log(err));
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});
const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];
const seedDB = async () => {
    await campgrounds_1.CampgroundModel.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const randomPrice = Math.floor(Math.random() * 20) + 10;
        const camp = new campgrounds_1.CampgroundModel({
            author: '63bd102090a9749bc5e7d68c',
            title: `${sample(helpers_1.descriptors)} ${sample(helpers_1.places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti sit commodi quos autem asperiores esse nihil magni in iste sapiente. Enim nemo officia debitis repellendus, sunt numquam dicta expedita perferendis.',
            price: randomPrice,
            geometry: {
                type: 'Point',
                coordinates: [cities_1.cities[random1000].longitude, cities_1.cities[random1000].latitude]
            },
            location: `${cities_1.cities[random1000].city}, ${cities_1.cities[random1000].state}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dgjgwco0f/image/upload/v1672961768/Yelpcamp/tddbas27fxohkc6nvgek.jpg',
                    filename: 'Yelpcamp/tddbas27fxohkc6nvgek'
                },
                {
                    url: 'https://res.cloudinary.com/dgjgwco0f/image/upload/v1672961768/Yelpcamp/l6umnqyachia7nniotdq.jpg',
                    filename: 'Yelpcamp/l6umnqyachia7nniotdq'
                },
                {
                    url: 'https://res.cloudinary.com/dgjgwco0f/image/upload/v1672961769/Yelpcamp/wsf74iwvhkpc1hvsrfdj.jpg',
                    filename: 'Yelpcamp/wsf74iwvhkpc1hvsrfdj'
                }
            ]
        });
        await camp.save();
    }
};
seedDB()
    .then(() => {
    mongoose_1.default.connection
        .close()
        .then(res => res)
        .catch(err => console.log(err));
})
    .catch(err => console.log(err));
//# sourceMappingURL=index.js.map