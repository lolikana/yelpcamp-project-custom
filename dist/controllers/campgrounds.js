"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.update = exports.updateForm = exports.read = exports.create = exports.index = void 0;
const geocoding_1 = __importDefault(require("@mapbox/mapbox-sdk/services/geocoding"));
const cloudinary_1 = __importDefault(require("../configs/cloudinary"));
const models_1 = require("../models");
const mapboxToken = process.env.MAPBOX_TOKEN;
const geocoder = (0, geocoding_1.default)({
    accessToken: mapboxToken === undefined ? '' : mapboxToken
});
const index = async (_req, res) => {
    const campgrounds = await models_1.CampgroundModel.find({});
    res.render('campgrounds/index', { campgrounds });
};
exports.index = index;
const create = async (req, res, _next) => {
    const geoData = await geocoder
        .forwardGeocode({ query: req.body.campground.location, limit: 1 })
        .send();
    res.send(geoData.body.features[0].geometry.coordinates);
};
exports.create = create;
const read = async (req, res, _next) => {
    const { id } = req.params;
    const campground = await models_1.CampgroundModel.findById(id)
        .populate({ path: 'reviews', populate: { path: 'author' } })
        .populate('author');
    if (campground === null) {
        req.flash('error', 'Cannot find that campground');
        return res.redirect('/campgrounds');
    }
    res.render(`campgrounds/detail`, { id, campground });
};
exports.read = read;
const updateForm = async (req, res, _next) => {
    const { id } = req.params;
    const campground = await models_1.CampgroundModel.findById(id);
    if (campground === null) {
        req.flash('error', 'Cannot find that campground to edit');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
};
exports.updateForm = updateForm;
const update = async (req, res, _next) => {
    const { id } = req.params;
    const campground = await models_1.CampgroundModel.findByIdAndUpdate(id, {
        ...req.body.campground
    }, { new: true });
    if (campground === null) {
        req.flash('error', 'Cannot find that campground');
        return res.redirect('/campgrounds');
    }
    const imgs = req.files.map((el) => ({
        url: el.path,
        filename: el.filename
    }));
    campground.images.push(...imgs);
    await campground.save();
    if (req.body.deleteImages !== undefined) {
        for (const filename of req.body.deleteImages) {
            await cloudinary_1.default.uploader.destroy(filename);
        }
        await campground.updateOne({
            $pull: { images: { filename: { $in: req.body.deleteImages } } }
        });
    }
    req.flash('success', 'Successfully updated campground');
    res.redirect(`/campgrounds/${campground?._id}`);
};
exports.update = update;
const destroy = async (req, res, _next) => {
    const { id } = req.params;
    await models_1.CampgroundModel.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground');
    res.redirect('/');
};
exports.destroy = destroy;
//# sourceMappingURL=campgrounds.js.map