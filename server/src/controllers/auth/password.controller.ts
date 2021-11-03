import { Request, Response } from 'express';

class PasswordController {
    public forgetPassword = async (req: Request, res: Response): Promise<void> => {
      res.render('pages/forget-password.ejs');
    }

  public resetPassword =async (req: Request, res: Response): Promise<void> => {
    res.render('pages/reset-password.ejs');
  }
}

export default PasswordController;
