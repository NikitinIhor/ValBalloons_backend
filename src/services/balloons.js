import BalloonCollection from '../db/models/ballon.js';

export const getAllBalloons = () => BalloonCollection.find();

export const createBalloon = payload => BalloonCollection.create(payload);

export const upsertBalloon = (filter, data, options = {}) =>
  BalloonCollection.findOneAndUpdate(filter, data, {
    new: true,
    upsert: true,
    ...options,
  });

export const deleteBalloon = filter =>
  BalloonCollection.findOneAndDelete(filter);
