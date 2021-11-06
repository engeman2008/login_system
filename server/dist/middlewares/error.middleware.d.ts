import { NextFunction, Request, Response } from 'express';
declare const errorMiddleware: (err: any, req: Request, res: Response, next: NextFunction) => void;
export default errorMiddleware;
