import {Request, Response, NextFunction} from 'express';
import ApiError from '../utilities/error-api';
import User from '../models/user.model';

const authentication = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const email = req.body.email;
        var user = await User.findOne({email});
        if(!user)
            return next(ApiError.badRequest('invalid email or password'));
        if(user.validatePassword(req.body.password)){
            req.user = user
            return next();
        }
        return next(ApiError.badRequest('invalid email or password'));
    }
    catch(err){
        return next(ApiError.internal('something went wrong'));
    }
};

export default authentication;
