import mongoose from 'mongoose';

import { CampgroundModel } from '../models/campgrounds';
import { cities } from './cities';
import { descriptors, places } from './helpers';

mongoose
  .connect('mongodb://127.0.0.1:27017/yelp-camp')
  .then(res => res)
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
    const randomPrice = Math.floor(Math.random() * 20) + 10;
    const camp = new CampgroundModel({
      title: `${sample(descriptors)} ${sample(places)}`,
      image: 'https://source.unsplash.com/collection/483251',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti sit commodi quos autem asperiores esse nihil magni in iste sapiente. Enim nemo officia debitis repellendus, sunt numquam dicta expedita perferendis.',
      price: randomPrice,
      location: `${cities[random1000].city}, ${cities[random1000].state}`
    });
    await camp.save();
  }
};

seedDB()
  .then(() => {
    mongoose.connection
      .close()
      .then(res => res)
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
