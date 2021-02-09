import {Router, Response, Request} from 'express'
import {signUpController, signInController} from '../controllers/user.controller';
import validateDTO from '../middlewares/validate-dto'
import signupDTO from '../middlewares/signup-dto'
import alreadySignedUpValidation from '../middlewares/already-signed-up-validation';

const router = Router();

router.post('/user/signup', validateDTO(signupDTO), alreadySignedUpValidation, signUpController);
router.post('/user/signin', signInController);

export default router;
