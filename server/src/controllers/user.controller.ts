/* eslint-disable consistent-return */
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../models/index';
import { validate } from './validator';
import UserService from '../services/user.service';

const User = db.users;

class UserController {
    public profile = async (req: Request, res: Response): Promise<void> => {
      const { user } = req;
      res.render('pages/user/profile.ejs', { user });
    }

    public update = async (req: Request, res: Response): Promise<void> => {
      const userObject = req.user as typeof User;

      const result = await UserService.update(userObject.id, { name: req.body.name });
      if (!result.user) {
        req.flash('error', result.message);
        return res.redirect('/profile');
      }
      res.render('pages/user/profile.ejs', { user: result.user });
    }

    public getResetPassword =
     async (req: Request, res: Response): Promise<void> => {
       const { user } = req;
       res.render('pages/user/reset-password.ejs', { user, messages: req.flash('error') });
     }

    public postResetPassword =
    async (req: Request, res: Response): Promise<void> => {
      const userObject = req.user as typeof User;

      const isValidRequest = validate(req);
      if (!isValidRequest) return res.redirect('/reset-password');

      const hashed = await bcrypt.hash(req.body.newPassword, 10);
      const result = await UserService.update(userObject.id, { password: hashed });
      if (!result.user) {
        req.flash('error', result.message);
        return res.redirect('/reset-password');
      }

      res.render('pages/user/reset-password.ejs', { user: result.user });
    }
}
export default UserController;
