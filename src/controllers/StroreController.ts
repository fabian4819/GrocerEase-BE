import { Request, Response } from 'express';
import Store from '../models/Store';

class StoreController {
    public static async getAllStores(req: Request, res: Response): Promise<void> {
        try {
            const stores = await Store.find().populate('items');
            res.json(stores);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    public static async createStore(req: Request, res: Response): Promise<void> {
        try {
            const store = await Store.create(req.body);
            res.status(201).json(store);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    public static async getStoreById(req: Request, res: Response): Promise<void> {
        try {
            const store = await Store.findById(req.params.id).populate('items');
            if (!store) {
                res.status(404).json({ message: 'Store not found' });
                return;
            }
            res.json(store);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}

export default StoreController;