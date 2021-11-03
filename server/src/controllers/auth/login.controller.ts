/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';

class LoginController {
  public getLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.render('pages/login.ejs', { messages: req.flash('error') });
  }

  public postLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err); }

      if (!user) {
        req.flash('error', info.message);
        return res.redirect('/login');
      }
      req.logIn(user, (error) => {
        if (error) { return next(error); }
        return res.redirect('dashboard');
      });
    })(req, res, next);
  }

  public postLogout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    req.logout();
    res.redirect('/login');
  }
}
export default LoginController;
