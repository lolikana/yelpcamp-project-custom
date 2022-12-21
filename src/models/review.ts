import { model, Schema } from 'mongoose';

import { IReview } from '../libs/types';

const reviewSchema = new Schema<IReview>({
  body: {
    type: String
  },
  rating: {
    type: Number
  }
});

export const ReviewModel = model('Review', reviewSchema);
