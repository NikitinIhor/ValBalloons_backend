import { Router } from 'express';
import {
  createBalloonController,
  deleteBalloonController,
  getAllBalloonsController,
  upsertBalloonController,
} from '../controllers/balloons.js';
import { authenticate } from '../middlewares/authenticate.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';

const balloonsRouter = Router();

balloonsRouter.get('/', ctrlWrapper(getAllBalloonsController));

balloonsRouter.post('/', authenticate, ctrlWrapper(createBalloonController));

balloonsRouter.post('/:id', authenticate, ctrlWrapper(upsertBalloonController));

balloonsRouter.delete(
  '/:id',
  authenticate,
  ctrlWrapper(deleteBalloonController)
);

export default balloonsRouter;
