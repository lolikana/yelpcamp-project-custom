import { model, Schema, Types } from 'mongoose';

import { ICampground } from '../libs/types';
import { ReviewModel } from './review';

const ImageSchema = new Schema({
  url: String,
  filename: String
});

// why virtual? because we don't need to store in the db
ImageSchema.virtual('thumbnail').get(function () {
  return this.url?.replace('/upload', '/upload/w_200');
});

const CampgroundSchema = new Schema<ICampground>({
  title: String,
  images: [ImageSchema],
  price: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: 'no description'
  },
  location: String,
  geometry: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  },
  author: {
    type: Types.ObjectId,
    ref: 'User'
  },
  reviews: [
    {
      type: Types.ObjectId,
      ref: 'Review'
    }
  ]
});

// query middleware "findOneAndDelete" is connected to delete method "findByIdAndDelete"
CampgroundSchema.post('findOneAndDelete', async doc => {
  if (doc !== null) {
    await ReviewModel.deleteMany({
      _id: {
        $in: doc.reviews
      }
    });
  }
});

export const CampgroundModel = model('Campground', CampgroundSchema);
