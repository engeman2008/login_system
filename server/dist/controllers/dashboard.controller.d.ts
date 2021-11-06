import { NextFunction, Request, Response } from 'express';
declare class DashboardController {
    index: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    welcome: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default DashboardController;
