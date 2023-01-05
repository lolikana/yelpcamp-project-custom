"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_flash_1 = __importDefault(require("connect-flash"));
const ejs_mate_1 = __importDefault(require("ejs-mate"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const method_override_1 = __importDefault(require("method-override"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const path_1 = __importDefault(require("path"));
const models_1 = require("./models");
const auth_1 = require("./routes/auth");
const campgrounds_1 = require("./routes/campgrounds");
const reviews_1 = require("./routes/reviews");
const utils_1 = require("./utils");
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
const sessionConfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        HttpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};
app.use((0, express_session_1.default)(sessionConfig));
app.use((0, connect_flash_1.default)());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.use(new passport_local_1.default.Strategy(models_1.User.authenticate()));
passport_1.default.serializeUser(models_1.User.serializeUser());
passport_1.default.deserializeUser(models_1.User.deserializeUser());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});
app.use('/', auth_1.router);
app.use('/campgrounds', campgrounds_1.router);
app.use('/campgrounds/:id/reviews', reviews_1.router);
app.get('/', (_req, res) => {
    res.render('index');
});
app.all('*', (_req, _res, next) => {
    next(new utils_1.ExpressError('Page Not Found!!', 404));
});
app.use((err, _req, res, _next) => {
    const { status = 500, message = 'Oops, something went wrong' } = err;
    res.status(status).render('error', { message, err });
});
app.listen(3000, () => {
    console.log('Serving on port 3000');
});
//# sourceMappingURL=index.js.map