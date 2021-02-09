import jwt from 'jsonwebtoken';

const createAcessToken = (payload: string | object) => {
    //expires in 15min
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || '', { expiresIn: '900000ms' });
}

const createRefreshToken = (payload: string | object) => {
    //expires in 6 months
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || '', { expiresIn: '15778800000ms' });
}

export {createAcessToken, createRefreshToken};
