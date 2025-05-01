import {
  createBalloon,
  deleteBalloon,
  getAllBalloons,
  upsertBalloon,
} from '../services/balloons.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

export const getAllBalloonsController = async (req, res) => {
  const data = await getAllBalloons();

  res.json({
    status: 200,
    message: `Successfully found all balloons`,
    data,
  });
};

export const createBalloonController = async (req, res) => {
  let balloon;
  if (req.file) {
    balloon = await saveFileToUploadDir(req.file);
  }

  const data = await createBalloon({ ...req.body, balloon });

  res.status(201).json({
    status: 201,
    message: `Successfully added balloon`,
    data,
  });
};

export const upsertBalloonController = async (req, res) => {
  const { id } = req.params;
  const data = await upsertBalloon({ _id: id }, req.body);

  res.status(200).json({
    status: 200,
    message: `Successfully upserted balloon`,
    data,
  });
};

export const deleteBalloonController = async (req, res) => {
  const { id } = req.params;
  const data = await deleteBalloon({ _id: id });

  if (!data) {
    res.status(404).json({
      message: `Balloon with id: ${id} not found`,
    });
  }

  res.status(204).json({
    status: 204,
    message: `Successfully deleted balloon`,
  });
};
