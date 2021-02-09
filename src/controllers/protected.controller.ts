import {NextFunction, Request, Response} from 'express';

const protectedController = (req: Request, res: Response, next: NextFunction) => {
    res.json('access granted');
}

export default protectedController;
