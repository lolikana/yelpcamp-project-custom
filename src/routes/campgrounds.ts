import { Router } from 'express';
import multer from 'multer';

import * as campgrounds from '../controllers/campgrounds';
import { validateCampground } from '../libs/validations';
import { catchAsync, isAuthor, isLoggedIn, isValidId } from '../utils';

export const router = Router();
const upload = multer({ dest: 'uploads/' });

router
  .route('/')
  .get(catchAsync(campgrounds.index))
  .post(upload.array('image'), (req, _res) => {
    console.log(req.body, req.files);
  });
// .post(isLoggzedIn, validateCampground, catchAsync(campgrounds.create));

router.get('/new', isLoggedIn, (_req, res) => {
  res.render('campgrounds/new');
});

router
  .route('/:id')
  .get(
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    isValidId,
    catchAsync(campgrounds.read)
  )
  .put(
    isLoggedIn,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    isValidId,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    isAuthor,
    validateCampground,
    catchAsync(campgrounds.update)
  )
  .delete(
    isLoggedIn,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    isValidId,
    catchAsync(campgrounds.destroy)
  );

router.get(
  '/:id/edit',
  isLoggedIn,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  isValidId,
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  isAuthor,
  catchAsync(campgrounds.updateForm)
);
