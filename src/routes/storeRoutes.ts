import { Router } from 'express';
// import StoreController from '../controllers/StoreController';
import { checkRole } from '../middleware/roleCheck';

const router = Router();

// router.get('/', StoreController.getAllStores);
// router.get('/:id', StoreController.getStoreById);
// router.post('/', checkRole(['admin', 'owner']), StoreController.createStore);
// router.put('/:id', checkRole(['admin', 'owner']), StoreController.updateStore);
// router.delete('/:id', checkRole(['admin']), StoreController.deleteStore);

export default router;