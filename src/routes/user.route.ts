import {Router} from 'express';
import {signUpController, signInController} from '../controllers/user.controller';
import validateDTO from '../middlewares/validate-dto';
import signupDTO from '../middlewares/signup-dto';
import signinDTO from '../middlewares/signin-dto';
import alreadySignedUpValidation from '../middlewares/already-signed-up-validation';
import checkPassword from '../middlewares/check-password-validation';

const router = Router();

router.post('/user/signup', validateDTO(signupDTO), alreadySignedUpValidation, signUpController);
router.post('/user/signin', validateDTO(signinDTO), checkPassword, signInController);

export default router;
