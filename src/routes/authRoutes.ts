import { Router, Request, Response, NextFunction } from 'express';
import { login, register, editProfile } from '../controllers/authController';

const router = Router();

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
};

router.post('/login', asyncHandler(async (req: Request, res: Response) => {
    await login(req, res);
}));

router.post('/register', asyncHandler(async (req: Request, res: Response) => {
    await register(req, res);
}));

router.put('/editProfile/:id', asyncHandler(async (req: Request, res: Response) => {
    await editProfile(req, res);
}));


export default router;