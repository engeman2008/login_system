import { NextFunction, Request, Response } from 'express';
declare const isActivated: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export default isActivated;
