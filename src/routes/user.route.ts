import {Router, Response, Request} from 'express'
import {signUpController} from '../controllers/user.controller';
import validateDTO from '../middlewares/validate-dto'
import signupDTO from '../middlewares/signup-dto'

const router = Router();

router.post('/user/signup', validateDTO(signupDTO), signUpController);

export default router;
