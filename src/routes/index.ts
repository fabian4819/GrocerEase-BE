import { Router } from 'express';
import authRoutes from './authRoutes';
import storeRoutes from './storeRoutes';
import productRoutes from './productRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/stores', storeRoutes);
router.use('/products', productRoutes);

export default router;