import { model, Schema, Types } from 'mongoose';

import { IReview } from '../libs/types';

const reviewSchema = new Schema<IReview>({
  body: {
    type: String
  },
  rating: {
    type: Number
  },
  author: {
    type: Types.ObjectId,
    ref: 'User'
  }
});

export const ReviewModel = model('Review', reviewSchema);
