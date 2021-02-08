import User from '../models/user.model';
import {Request, Response} from 'express';

const signUpController = (req : Request, res: Response) => {
    return res.send('all good');
}

export {signUpController};
