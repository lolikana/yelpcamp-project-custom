import { Router } from 'express';

import { catchAsync } from '../utils/catchAsync';

export const router = Router();

router.get('/register', (_req, res) => {
  res.render('auth/register');
});

router.post(
  '/register',
  catchAsync(async (req, res) => {
    res.send(req.body);
  })
);
