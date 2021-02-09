import {NextFunction, Request, Response} from 'express';
import ApiError from '../utilities/error-api';
import User from '../models/user.model';
import {createAcessToken, createRefreshToken} from '../services/jwt-session';

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
    const userId = req.user.id;
    const accessToken = createAcessToken({userId});
    const refreshToken = createRefreshToken({userId});
    const fifteenMin = 900000; //1000 * 60 * 15 = 15m
    const sixMonths = 15778800000; //1000 * 60 * 60 * 24 * 30 * 6 = 6 months
    res.cookie('acessToken', accessToken, {maxAge: fifteenMin, httpOnly:true});
    res.cookie('refreshToken', refreshToken, {maxAge: sixMonths, httpOnly:true});
    return res.send('signed in successfully');
}

export {signUpController, signInController};
