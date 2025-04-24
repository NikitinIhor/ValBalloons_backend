import { Router } from 'express';
import {
  createBalloonController,
  deleteBalloonController,
  getAllBalloonsController,
  upsertBalloonController,
} from '../controllers/balloons.js';

const balloonsRouter = Router();

balloonsRouter.get('/', getAllBalloonsController);

balloonsRouter.post('/', createBalloonController);

balloonsRouter.post('/:id', upsertBalloonController);

balloonsRouter.delete('/:id', deleteBalloonController);

export default balloonsRouter;
