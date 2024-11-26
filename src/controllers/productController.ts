import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Product from '../models/Product';

class ProductController {
    public static async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await Product.find();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    public static async getProductsByStore(req: Request, res: Response): Promise<void> {
        try {
            const { store_id } = req.params;
            const products = await Product.find({ store_id });
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    public static async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const productData = {
                ...req.body,
                product_id: `PROD_${uuidv4().substring(0, 8)}`
            };

            const product = await Product.create(productData);
            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    public static async getProductById(req: Request, res: Response): Promise<void> {
        try {
            const product = await Product.findOne({ product_id: req.params.id });
            if (!product) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    public static async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const product = await Product.findOneAndUpdate(
                { product_id: req.params.id },
                req.body,
                { new: true }
            );
            if (!product) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }
            res.json(product);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    public static async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const product = await Product.findOneAndDelete({ product_id: req.params.id });
            if (!product) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }
            res.json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}

export default ProductController;