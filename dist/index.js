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
const campgrounds_1 = require("./routes/campgrounds");
const reviews_1 = require("./routes/reviews");
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
app.use('/campgrounds', campgrounds_1.router);
app.use('/campgrounds/:id/reviews', reviews_1.router);
app.get('/', (_req, res) => {
    res.render('index');
});
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