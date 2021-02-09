import {Router} from 'express';
import {signUpController, signInController} from '../controllers/user.controller';
import validateDTO from '../dtos/validate-dto';
import signupDTO from '../dtos/signup-dto';
import signinDTO from '../dtos/signin-dto';
import alreadySignedUpValidation from '../middlewares/already-signed-up-validation';
import authentication from '../middlewares/authentication';

const router = Router();

router.post('/user/signup', validateDTO(signupDTO), alreadySignedUpValidation, signUpController);
router.post('/user/signin', validateDTO(signinDTO), authentication, signInController);

export default router;
