"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ejs_mate_1 = __importDefault(require("ejs-mate"));
const express_1 = __importDefault(require("express"));
const method_override_1 = __importDefault(require("method-override"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const validations_1 = require("./libs/validations");
const campgrounds_1 = require("./models/campgrounds");
const review_1 = require("./models/review");
const catchAsync_1 = require("./utils/catchAsync");
const ExpressError_1 = require("./utils/ExpressError");
const app = (0, express_1.default)();
mongoose_1.default
    .connect('mongodb://127.0.0.1:27017/yelp-camp')
    .then(res => res)
    .catch(err => console.log(err));
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Database connected');
});
app.engine('ejs', ejs_mate_1.default);
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, '../views'));
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use(express_1.default.static(path_1.default.join(__dirname, '../dist')));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, method_override_1.default)('_method'));
app.get('/', (_req, res) => {
    res.render('index');
});
app.get('/campgrounds', (0, catchAsync_1.catchAsync)(async (_req, res) => {
    const campgrounds = await campgrounds_1.CampgroundModel.find({});
    res.render('campgrounds/index', { campgrounds });
}));
app.get('/campgrounds/new', (_req, res) => {
    res.render('campgrounds/new');
});
app.post('/campgrounds', validations_1.validateCampground, (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const campground = new campgrounds_1.CampgroundModel(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}));
app.get('/campgrounds/:id', (0, catchAsync_1.catchAsync)(async (req, res, next) => {
    try {
        const { id } = req.params;
        const campground = await campgrounds_1.CampgroundModel.findById(id);
        res.render(`campgrounds/detail`, { id, campground });
    }
    catch (err) {
        next(new ExpressError_1.ExpressError('Campground not found', 404));
    }
}));
app.get('/campgrounds/:id/edit', (0, catchAsync_1.catchAsync)(async (req, res) => {
    const campground = await campgrounds_1.CampgroundModel.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
}));
app.put('/campgrounds/:id', validations_1.validateCampground, (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const campground = await campgrounds_1.CampgroundModel.findByIdAndUpdate(id, {
        ...req.body.campground
    }, { new: true });
    res.redirect(`/campgrounds/${campground?._id}`);
}));
app.delete('/campgrounds/:id', (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    await campgrounds_1.CampgroundModel.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}));
app.post('/campgrounds/:id/reviews', validations_1.validateReview, (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    const campground = await campgrounds_1.CampgroundModel.findById(id);
    const review = new review_1.ReviewModel(req.body.review);
    campground?.reviews.push(review.id);
    await campground?.save();
    await review.save();
    res.redirect(`/campgrounds/${campground?._id}`);
}));
app.all('*', (_req, _res, next) => {
    next(new ExpressError_1.ExpressError('Page Not Found!!', 404));
});
app.use((err, _req, res, _next) => {
    const { status = 500, message = 'Oops, something went wrong' } = err;
    res.status(status).render('error', { message, err });
});
app.listen(3000, () => {
    console.log('Serving on port 3000');
});
//# sourceMappingURL=index.js.map