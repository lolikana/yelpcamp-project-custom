import { Router } from 'express';
import passport from 'passport';

import * as auth from '../controllers/auth';
import { catchAsync } from '../utils/catchAsync';

export const router = Router();

router
  .route('/register')
  .get(auth.renderRegister)
  .post(catchAsync(auth.register));

router
  .route('/login')
  .get(auth.renderLogin)
  .post(
    passport.authenticate('local', {
      failureFlash: true,
      failureRedirect: '/login',
      keepSessionInfo: true
    }),
    auth.login
  );

router.get('/logout', auth.logout);
