import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    product_id: string;
    name: string;
    description: string;
    price: number;
    image_link: string;
    store_id: string;
}

const ProductSchema = new Schema({
    product_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "-"
    },
    price: {
        type: Number,
        required: true
    },
    image_link: {
        type: String,
        default: '/img/default-product.jpg'
    },
    store_id: {
        type: String,
        required: true,
        ref: 'Store'
    }
}, { timestamps: true });

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;