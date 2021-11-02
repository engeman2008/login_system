/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';

class ErrorController {
    public get404 = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      res.status(404).render('errors/404');
    }

    public get500 = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      res.status(404).render('errors/error');
    }
}
export default ErrorController;
