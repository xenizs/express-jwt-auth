import {Request, Response, NextFunction} from 'express';
import ApiError from '../utilities/error-api';
import User from '../models/user.model';

const alreadySignedUpValidation = async (req: Request, res: Response, next: NextFunction) => {
    try{
        var user = await User.findOne({$or: [{email: req.body.email}, {username: req.body.username}]});
        if(user)
            return next(ApiError.badRequest('user already exists'));
    }
    catch(err){
        return next(ApiError.internal('something went wrong'));
    }
    return next();
};

export default alreadySignedUpValidation;
