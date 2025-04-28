import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from '../constants/user.js';
import SessionCollection from '../db/models/session.js';
import UserCollection from '../db/models/user.js';

export const signup = async payload => {
  const { username, password } = payload;

  const user = await UserCollection.findOne({ username });

  if (user) {
    throw new Error(409, `User allready exists`);
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const data = await UserCollection.create({
    ...payload,
    password: hashPassword,
  });

  delete data._doc.password;

  return data._doc;
};

export const signin = async payload => {
  const { username, password } = payload;

  const user = await UserCollection.findOne({ username });
  if (!user) {
    throw new Error(`username is invalid`);
  }

  await SessionCollection.deleteOne({ userId: user._id });

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw new Error(`password is invalid`);
  }

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  const accessTokenValidUntil = new Date(Date.now() + accessTokenLifeTime);
  const refreshTokenValidUntil = new Date(Date.now() + refreshTokenLifeTime);

  const userSession = await SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });

  return userSession;
};

export const refresh = async ({ refreshToken, sessionId }) => {
  const oldSession = await SessionCollection.findOne({
    refreshToken,
    _id: sessionId,
  });

  if (!oldSession) {
    throw new Error(`Session not found`);
  }

  if (new Date() > oldSession.refreshTokenValidUntil) {
    throw new Error(`Session token expired`);
  }

  await SessionCollection.deleteOne({ _id: sessionId });

  const newAccessToken = randomBytes(30).toString('base64');
  const newRefreshToken = randomBytes(30).toString('base64');
  const newAccessTokenValidUntil = new Date(Date.now() + accessTokenLifeTime);
  const refreshTokenValidUntil = new Date(Date.now() + refreshTokenLifeTime);

  const userSession = await SessionCollection.create({
    userId: oldSession.userId,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    accessTokenValidUntil: newAccessTokenValidUntil,
    refreshTokenValidUntil: refreshTokenValidUntil,
  });

  return userSession;
};

export const signout = async ({ sessionId }) => {
  await SessionCollection.deleteOne({ _id: sessionId });
};

export const findSessionByAccessToken = accessToken =>
  SessionCollection.findOne({ accessToken });

export const findUser = filter => UserCollection.findOne(filter);
