/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import UserService from '../../services/user.service';

class RegisterController {
  public userService = new UserService();

  public getSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.render('pages/signup.ejs');
  }

  public postSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  }

  public forgetPassword =
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.render('pages/reset-password.ejs');
  }

  public resetPassword =
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  }
}
export default RegisterController;
