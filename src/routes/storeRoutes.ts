import { Router } from "express";
import StoreController from "../controllers/StoreController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Public routes (dapat diakses tanpa login)
router.get("/", StoreController.getAllStores);
router.get("/:id", StoreController.getStoreById);

// Protected routes (perlu login)
// router.use(authMiddleware);
router.post("/", StoreController.createStore);
router.put("/:id", StoreController.updateStore);
router.delete("/:id", StoreController.deleteStore);

export default router;
