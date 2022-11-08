import { model, Schema } from 'mongoose';

import { ICampground } from '../libs/types';

const CampgroundSchema = new Schema<ICampground>({
  title: String,
  image: String,
  price: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: 'no description'
  },
  location: String
});

export const CampgroundModel = model('Campground', CampgroundSchema);
