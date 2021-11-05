/* eslint-disable no-unused-vars */
import {
  RequestHandler, NextFunction, Request, Response,
} from 'express';

import db from '../models/index';

const User = db.users;
const Activation = db.activations;

const isActivated = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as typeof User;
  if (req.path === '/send-verify-email' || req.path.includes('activate')) return next();

  if (!user) return next();

  const activation = await Activation.findOne({
    where: { user_id: user.id },
  });
  if (activation && activation.completed) return next();

  return res.status(200).render('pages/user/welcome.ejs', { name: user.name });
};

export default isActivated;
