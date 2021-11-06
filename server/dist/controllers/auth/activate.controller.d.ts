import { NextFunction, Request, Response } from 'express';
declare class ActivateController {
    activate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default ActivateController;
