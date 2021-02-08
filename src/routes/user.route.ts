import {Router, Response, Request} from 'express'

const router = Router();

router.post('/user/signup', (req: Request, res: Response) => {
    res.json('user signed up');
});

export default router;
