import ApiError from './error-api';
import {Request, Response, NextFunction} from 'express';

function apiErrorHandler(error : any, req : Request, res : Response, next: NextFunction) {
  if (error instanceof ApiError) {
    return res.status(error.code).json(error.msg);
  }

  return res.status(500).json('something went wrong');
}

export default apiErrorHandler;
