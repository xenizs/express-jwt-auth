import {Request, Response, NextFunction} from 'express';
import ApiError from '../utilities/error-api';
import User from '../models/user.model';

const checkPasswordValidation = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const email = req.body.email;
        var user = await User.findOne({email});
        if(!user)
            return next(ApiError.badRequest('invalid email or password'));
        if(user.validatePassword(req.body.password))
            return next();
        return next(ApiError.badRequest('invalid email or password'));
    }
    catch(err){
        return next(ApiError.internal('something went wrong'));
    }
};

export default checkPasswordValidation;
