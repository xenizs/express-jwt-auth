import {Request} from "express";
import {IUserDocument} from '../../types/user';

declare global {
  namespace Express {
    interface Request {
      user: IUserDocument
    }
  }
}
