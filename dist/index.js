"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const ejs_mate_1 = __importDefault(require("ejs-mate"));
const campgrounds_1 = require("./models/campgrounds");
const app = (0, express_1.default)();
mongoose_1.default.connect('mongodb://localhost:27017/yelp-camp');
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
app.get('/campgrounds', async (_req, res) => {
    const campgrounds = await campgrounds_1.CampgroundModel.find({});
    res.render('campgrounds/index', { campgrounds });
});
app.listen(3000, () => {
    console.log('Serving on port 3000');
});
//# sourceMappingURL=index.js.map