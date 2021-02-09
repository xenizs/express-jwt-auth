import {Router} from 'express';
import protectedController from '../controllers/protected.controller';

const router = Router();

router.get('/protected', protectedController);

export default router;
