import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  return res.render('errors/error', { error: err });
};

export default errorMiddleware;
