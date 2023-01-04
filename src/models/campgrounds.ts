import { model, Schema, Types } from 'mongoose';

import { ICampground } from '../libs/types';
import { ReviewModel } from './review';

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
  location: String,
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
