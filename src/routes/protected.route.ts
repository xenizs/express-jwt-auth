import {Router} from 'express';
import protectedController from '../controllers/protected.controller';
import authorization from '../middlewares/authorization';

const router = Router();

router.get('/protected', authorization,protectedController);

export default router;
