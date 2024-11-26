import { Request, Response } from "express";
import Store from "../models/Store";
import mongoose from "mongoose";

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
      const user_id = req.body.user_id;
      const { user_id: _, ...storeData } = req.body;

      const store = await Store.create({
        ...storeData,
        owner_id: new mongoose.Types.ObjectId(user_id),
      });
      res.status(201).json(store);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  public static async getStoreById(req: Request, res: Response): Promise<void> {
    try {
      const store = await Store.findOne({ _id: req.params.id });
      if (!store) {
        res.status(404).json({ message: "Store not found" });
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
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      if (!store) {
        res.status(404).json({ message: "Store not found" });
        return;
      }
      res.json(store);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  public static async deleteStore(req: Request, res: Response): Promise<void> {
    try {
      const store = await Store.findOneAndDelete({ _id: req.params.id });
      if (!store) {
        res.status(404).json({ message: "Store not found" });
        return;
      }
      res.json({ message: "Store deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

export default StoreController;
