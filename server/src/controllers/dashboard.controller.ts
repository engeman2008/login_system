/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';

const { User } = require('../models/index');

class DashboardController {
    public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const user = req.user as typeof User;
      res.render('pages/dashboard.ejs', { user });
    }

    public welcome = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const user = req.user as typeof User;
      res.render('pages/welcome.ejs', { name: user.name });
    }
}
export default DashboardController;
