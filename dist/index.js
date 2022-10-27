"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ejs_mate_1 = __importDefault(require("ejs-mate"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const campgrounds_1 = require("./models/campgrounds");
const app = (0, express_1.default)();
mongoose_1.default
    .connect('mongodb://localhost:27017/yelp-camp')
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
app.get('/', (_req, res) => {
    res.render('index');
});
app.get('/campgrounds', (async (_req, res) => {
    const campgrounds = await campgrounds_1.CampgroundModel.find({});
    res.render('campgrounds/index', { campgrounds });
}));
app.get('/campgrounds/:id', (async (req, res) => {
    const { id } = req.params;
    const campground = await campgrounds_1.CampgroundModel.findById(id);
    res.render(`campgrounds/detail`, { id, campground });
}));
app.listen(3000, () => {
    console.log('Serving on port 3000');
});
//# sourceMappingURL=index.js.map