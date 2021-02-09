import {NextFunction, Request, Response} from 'express';
import ApiError from '../utilities/error-api';
import User from '../models/user.model';

const signUpController = async(req : Request, res: Response, next: NextFunction) => {
    try{
        const {email, username, password} = req.body;
        await User.build({email, username, password}).save();
    }
    catch(err){
        return next(ApiError.internal('something went wrong'));
    }
    return res.send('signed up successfully');
}

const signInController = async(req : Request, res: Response, next: NextFunction) => {
    return res.send('signed in successfully');
}

export {signUpController, signInController};
