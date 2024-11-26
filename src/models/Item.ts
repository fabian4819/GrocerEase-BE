import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
    name: string;
    description: string;
    base_price: number;
    stock: number;
    store_id: mongoose.Types.ObjectId;
    category_id: mongoose.Types.ObjectId;
    unit: string;
    image_url: string;
    is_active: boolean;
}

const ItemSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    base_price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    store_id: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
    category_id: { type: Schema.Types.ObjectId, ref: 'Category' },
    unit: String,
    image_url: String,
    is_active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model<IItem>('Item', ItemSchema);