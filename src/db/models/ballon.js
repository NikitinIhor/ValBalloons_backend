import { Schema, model } from 'mongoose';

const balloonSchema = new Schema(
  {
    balloon: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const BalloonCollection = new model('balloon', balloonSchema);

export default BalloonCollection;
