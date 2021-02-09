import {Request, Response, NextFunction} from 'express';
import ApiError from '../utilities/error-api';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import {createAcessToken} from '../services/jwt-session';

const authorization = async (req: Request, res: Response, next: NextFunction) => {
    return authorizeAcessToken(req, res, next);
};

const authorizeAcessToken = (req: Request, res :Response, next: NextFunction) => {
    if(doesTokensExists(req, res))
        if(verifyAccessToken(req.cookies.accessToken))
            return next();
        else
            return authorizeRefreshToken(req, res, next);
    else
        return res.json('session either expired or invalid');
};

const authorizeRefreshToken = async (req: Request, res :Response, next: NextFunction) => {
    var payload: any;
    try{
        payload = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET || '');
    }
    catch(err){
        return next(ApiError.badRequest('session either expired or invalid'));
    }

    try{
        const user = await getUserRefreshTokens(payload.userId);
        req.user = user;
        return authorizeRefreshTokens(req, res, next);
    }
    catch(error){
        return next(ApiError.internal('something went wrong'));
    }
};

const authorizeRefreshTokens = async(req: Request, res: Response, next: NextFunction) => {
    const refreshTokens : Array<string> = req.user.JWTSession.refreshTokens;
    //verify refresh tokens
    const verifiedRefreshTokens = refreshTokens.filter(token =>{
        return verifyRefreshToken(token);
    });
    //update refresh tokens
    req.user.JWTSession.refreshTokens = verifiedRefreshTokens;
    try{
        await req.user.save()
    }
    catch(error){
        return next(ApiError.internal('something went wrong'));
    }
    if(verifiedRefreshTokens.includes(req.cookies.refreshToken)){
        //create new access token
        const userId = req.user.id;
        const accessToken = createAcessToken({userId});
        const fifteenMin = 900000; //1000 * 60 * 15 = 15m
        res.cookie('accessToken', accessToken, {maxAge: fifteenMin, httpOnly:true});
        return next();
    }
    else
        return next(ApiError.badRequest('session either expired or invalid'));
};

const doesTokensExists = (req: Request, res: Response) =>{
    if(req.cookies.refreshToken && req.cookies.accessToken)
        return true;
    return false;
};

const verifyAccessToken = (token : string) => {
    try{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '')
        return true;
    }
    catch(err){
        return false;
    }
};

const verifyRefreshToken = (token : string) => {
    try{
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || '')
        return true;
    }
    catch(err){
        return false;
    }
};

const getUserRefreshTokens = (userId : string) => {
    return User.findById(userId, {"JWTSession.refreshTokens": 1});
};

export default authorization;
