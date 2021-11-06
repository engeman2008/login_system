/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import db from '../../models/index';

const User = db.users;
const Activation = db.activations;

class ActivateController {
  public activate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { userId, activationCode } = req.params;

    const user = await User.findByPk(userId);
    if (!user) { next('User not found'); }

    const activation = await Activation.findOne(
      { where: { user_id: userId, code: activationCode } },
    );
    if (!activation) { next('We were unable to find a user for this token.'); }

    if (activation.completed) { next('This user has already been verified.'); }

    try {
      activation.completed = true;
      activation.completed_at = Date.now();
      await activation.save();
      console.log(`updated record ${JSON.stringify(activation, null, 2)}`);
    } catch (error) {
      console.log(error);
      next(error as string);
    }

    passport.authenticate('local', (err, userr, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/login');
      }
      req.logIn(user, (error) => {
        if (error) {
          return next(err);
        }
        return res.redirect('/');
      });
    })(req, res, next);
  }
}

export default ActivateController;
