/*User interface for checking type while creating a new document*/
interface IUser<JWT = IJWTSession> {
    username: string,
    email: string,
    password: string,
    JWTSession?: JWT,
    id?: string
}

interface IJWTSession{
    refreshTokens: string[]
}

export {IUser, IJWTSession};
