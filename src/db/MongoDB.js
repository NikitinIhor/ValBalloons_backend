import mongoose from 'mongoose';
import env from '../utils/env.js';

export const MongoDB = async () => {
  const user = env('MONGODB_USER');
  const password = env('MONGODB_PASSWORD');
  const url = env('MONGODB_URL');
  const bd = env('MONGODB_DB');
  try {
    const HOST = `mongodb+srv://${user}:${password}@${url}/${bd}?retryWrites=true&w=majority&appName=Cluster0`;

    await mongoose.connect(HOST);

    console.log(`MongoDB connection seccessfully`);
  } catch (error) {
    console.log(`MongoDB connection error`);
    throw error;
  }
};
