import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
// import userRoutes from './userRoutes';
// import storeRoutes from './storeRoutes';
// import itemRoutes from './itemRoutes';
// import shoppingListRoutes from './shoppingListRoutes';
// import analyticsRoutes from './analyticsRoutes';

const router = Router();

// router.use('/auth', userRoutes);
// router.use('/stores', authMiddleware, storeRoutes);
// router.use('/items', authMiddleware, itemRoutes);
// router.use('/shopping-lists', authMiddleware, shoppingListRoutes);
// router.use('/analytics', authMiddleware, analyticsRoutes);

export default router;