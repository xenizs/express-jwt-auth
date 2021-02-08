import {Router, Response, Request} from 'express'
import {signUpController} from '../controllers/user.controller';

const router = Router();

router.post('/user/signup', signUpController);

export default router;
