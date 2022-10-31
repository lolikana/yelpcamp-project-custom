import mongoose from 'mongoose';

import { CampgroundModel } from '../models/campgrounds';
import { cities } from './cities';
import { descriptors, places } from './helpers';

mongoose
  .connect('mongodb://127.0.0.1:27017/yelp-camp')
  .then(res => console.log(res))
  .catch(err => console.log(err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (arr: string[]): string =>
  arr[Math.floor(Math.random() * arr.length)];

const seedDB = async (): Promise<void> => {
  await CampgroundModel.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new CampgroundModel({
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`
    });
    await camp.save();
  }
};

seedDB()
  .then(() => {
    mongoose.connection
      .close()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
