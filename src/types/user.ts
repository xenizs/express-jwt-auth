import {Document} from 'mongoose';

/*User interface for checking type while creating a new document*/
interface IUser<JWT = IJWTSession> {
    username: string,
    email: string,
    password: string,
    JWTSession?: JWT
}

interface IJWTSession{
    refreshTokens: string[]
}

interface IUserDocument extends Document {
    username: string,
    email: string,
    password: string,
    JWTSession: IJWTSession,
    genPassword(password: string): string,
    validatePassword(password: string): boolean
}

export {IUser, IJWTSession, IUserDocument};
