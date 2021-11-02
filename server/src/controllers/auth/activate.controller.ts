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
    console.log(userId);
    console.log(activationCode);

    const user = await User.findByPk(userId);
    if (!user) { throw new Error('User not found'); }

    const activation = Activation.findOne({ where: { user_id: userId, code: activationCode } });
    if (!activation) { throw new Error('We were unable to find a user for this token.'); }

    console.log(activation);
    console.log(activation.completed);

    if (activation.completed) { throw new Error('This user has already been verified.'); }

    try {
      Activation.update(
        { completed: true, completed_at: Date.now() },
        { where: { user_id: userId, code: activationCode } },
      );
      console.log(`updated record ${JSON.stringify(activation, null, 2)}`);
    } catch (error) {
      console.log(error);
      throw new Error(error as string);
    }
    console.log('The account has been verified. Please log in.');

    passport.authenticate('local', (err, userr, info) => {
      if (err) {
        next(err);
      }
      if (!user) {
        res.redirect('/login');
      }
      req.logIn(user, (error) => {
        if (error) {
          next(err);
        }
        return res.redirect('/');
      });
    })(req, res, next);
  }
}

export default ActivateController;
