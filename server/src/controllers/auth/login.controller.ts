/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import UserService from '../../services/user.service';

class LoginController {
  public userService = new UserService();

  public getLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.render('pages/login.ejs');
  }

  public postLogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log(req.user);
    res.redirect('/dashboard');
    // passport.authenticate('local', { successRedirect: '/',
    // failureRedirect: '/login' , failureFlash: true}));
    // passport.authenticate('local', { failureFlash: 'Invalid username or password.' });
    // passport.authenticate('local', { successFlash: 'Welcome!' });
  }

  public postLogout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    req.logout();
    res.redirect('/login');
  }
}
export default LoginController;
