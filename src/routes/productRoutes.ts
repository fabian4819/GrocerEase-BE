import { Router } from 'express';
import ProductController from '../controllers/productController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', ProductController.getAllProducts);
router.get('/store/:store_id', ProductController.getProductsByStore);
router.get('/:id', ProductController.getProductById);

// Protected routes
router.use(authMiddleware);
router.post('/', ProductController.createProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

export default router;