import { Request, Response } from 'express';
import Store from '../models/Store';
import { v4 as uuidv4 } from 'uuid';

class StoreController {
    public static async getAllStores(req: Request, res: Response): Promise<void> {
        try {
            const stores = await Store.find();
            res.json(stores);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    public static async createStore(req: Request, res: Response): Promise<void> {
        try {
            const storeData = {
                ...req.body,
                store_id: `STORE_${uuidv4().substring(0, 8)}`,
                latitude: req.body.latitude || 0.0,
                longitude: req.body.longitude || 0.0
            };

            const store = await Store.create(storeData);
            res.status(201).json(store);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    public static async getStoreById(req: Request, res: Response): Promise<void> {
        try {
            const store = await Store.findOne({ store_id: req.params.id });
            if (!store) {
                res.status(404).json({ message: 'Store not found' });
                return;
            }
            res.json(store);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    public static async updateStore(req: Request, res: Response): Promise<void> {
        try {
            const store = await Store.findOneAndUpdate(
                { store_id: req.params.id },
                req.body,
                { new: true }
            );
            if (!store) {
                res.status(404).json({ message: 'Store not found' });
                return;
            }
            res.json(store);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    public static async deleteStore(req: Request, res: Response): Promise<void> {
        try {
            const store = await Store.findOneAndDelete({ store_id: req.params.id });
            if (!store) {
                res.status(404).json({ message: 'Store not found' });
                return;
            }
            res.json({ message: 'Store deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}

export default StoreController;