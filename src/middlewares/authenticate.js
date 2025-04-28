import { findSessionByAccessToken, findUser } from '../services/auth.js';

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(`Authorization header not found`);
  }

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    return next(`Authotization must have Bearer`);
  }

  const session = await findSessionByAccessToken(token);

  if (!session) {
    return next(`Session not found`);
  }

  if (new Date() > session.accessTokenValidUntil) {
    return next(`Access token expired`);
  }

  const user = await findUser({ _id: session.userId });

  if (!user) {
    return next(`User not found`);
  }

  next();
};
