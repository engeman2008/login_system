import { NextFunction, Request, Response } from 'express';
declare class ErrorController {
    get404: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    get500: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default ErrorController;
