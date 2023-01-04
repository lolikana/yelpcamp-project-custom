import { Router } from 'express';
import passport from 'passport';

import * as auth from '../controllers/auth';
import { catchAsync } from '../utils/catchAsync';

export const router = Router();

router.get('/register', auth.renderRegister);

router.post('/register', catchAsync(auth.register));

router.get('/login', auth.renderLogin);

router.post(
  '/login',
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
    keepSessionInfo: true
  }),
  auth.login
);

router.get('/logout', auth.logout);
