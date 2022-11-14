'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const ejs_mate_1 = __importDefault(require('ejs-mate'));
const express_1 = __importDefault(require('express'));
const method_override_1 = __importDefault(require('method-override'));
const mongoose_1 = __importDefault(require('mongoose'));
const path_1 = __importDefault(require('path'));
const campgrounds_1 = require('./models/campgrounds');
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
app.get('/campgrounds', async (_req, res) => {
  const campgrounds = await campgrounds_1.CampgroundModel.find({});
  res.render('campgrounds/index', { campgrounds });
});
app.get('/campgrounds/new', (_req, res) => {
  res.render('campgrounds/new');
});
app.post('/campgrounds', async (req, res) => {
  const campground = new campgrounds_1.CampgroundModel(req.body.campground);
  await campground.save();
  console.log(req.body);
  res.redirect(`/campgrounds/${campground._id}`);
});
app.get('/campgrounds/:id', async (req, res) => {
  const { id } = req.params;
  const campground = await campgrounds_1.CampgroundModel.findById(id);
  res.render(`campgrounds/detail`, { id, campground });
});
app.get('/campgrounds/:id/edit', async (req, res) => {
  const campground = await campgrounds_1.CampgroundModel.findById(
    req.params.id
  );
  res.render('campgrounds/edit', { campground });
});
app.put('/campgrounds/:id', async (req, res) => {
  const { id } = req.params;
  const campground = await campgrounds_1.CampgroundModel.findByIdAndUpdate(
    id,
    {
      ...req.body.campground
    },
    { new: true }
  );
  res.redirect(`/campgrounds/${campground?._id}`);
});
app.delete('/campgrounds/:id', async (req, res) => {
  const { id } = req.params;
  await campgrounds_1.CampgroundModel.findByIdAndDelete(id);
  res.redirect('/campgrounds');
});
app.listen(3000, () => {
  console.log('Serving on port 3000');
});
//# sourceMappingURL=index.js.map
