/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';

import db from '../models/index';

const User = db.users;
const Activation = db.activations;

class UserController {
    public profile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { user } = req;
      res.render('pages/user/profile.ejs', { user });
    }

    public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const userO = req.user as typeof User;
      const user = await User.findByPk(userO.id);
      user.name = req.body.name;
      await user.save();
      res.render('pages/user/profile.ejs', { user });
    }

    public resetPassword =
     async (req: Request, res: Response, next: NextFunction): Promise<void> => {
       const { user } = req;
       res.render('pages/user/reset-password.ejs', { user });
     }
}
export default UserController;
