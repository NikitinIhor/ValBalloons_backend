import { Router } from 'express';
import {
  createBalloonController,
  deleteBalloonController,
  getAllBalloonsController,
  upsertBalloonController,
} from '../controllers/balloons.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const balloonsRouter = Router();

balloonsRouter.get('/', ctrlWrapper(getAllBalloonsController));

balloonsRouter.post(
  '/',
  upload.single('balloon'),
  authenticate,
  ctrlWrapper(createBalloonController)
);

balloonsRouter.post('/:id', authenticate, ctrlWrapper(upsertBalloonController));

balloonsRouter.delete(
  '/:id',
  authenticate,
  ctrlWrapper(deleteBalloonController)
);

export default balloonsRouter;
