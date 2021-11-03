/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';

const { User } = require('../models/index');

class DashboardController {
    public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const user = req.user as typeof User;

      res.send(`Hello ${user.name}. Your session ID is ${req.sessionID} 
   and your session expires in ${req.session.cookie.maxAge} 
   milliseconds.<br><br>
   <a href="/logout">Log Out</a><br><br>
   <a href="/secret">Members Only</a>`);
    }

    public welcome = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const user = req.user as typeof User;
      res.render('pages/welcome.ejs', { name: user.name });
    }
}
export default DashboardController;
