/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

class LoginController {
  public getLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.render('pages/login.ejs', { messages: req.flash() });
  }

  public postLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    passport.authenticate('local', {
      failureRedirect: '/login',
      successRedirect:
        '/dashboard',
      failureFlash: 'Invalid username or password.',
    })(req, res, next);
  }

  public postLogout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    req.logout();
    res.redirect('/login');
  }
}
export default LoginController;
