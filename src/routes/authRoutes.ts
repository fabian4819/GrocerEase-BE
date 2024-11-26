import { Router, Request, Response, NextFunction } from 'express';
import { login, register } from '../controllers/authController';

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


export default router;