import {Request, Response, NextFunction} from 'express';
import ApiError from '../utilities/error-api';

export default function validateDTO(schema: any) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const validatedBody = schema.validateSync(req.body);
        req.body = validatedBody;
        next();
      } catch (err) {
        next(ApiError.badRequest(err));
      }
    };
  }
