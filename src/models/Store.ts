import mongoose, { Schema, Document } from 'mongoose';

export interface IStore extends Document {
    store_id: string;
    owner_id: number;
    store_name: string;
    image_link: string;
    location: string;
    latitude: number;
    longitude: number;
    contact_info: string;
    opening_hours: string;
    description: string;
}

const StoreSchema = new Schema({
    store_id: {
        type: String,
        required: true,
        unique: true
    },
    owner_id: {
        type: Number,
        required: true
    },
    store_name: {
        type: String,
        required: true
    },
    image_link: {
        type: String,
        default: '/img/default-store.jpg'
    },
    location: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        default: 0.0
    },
    longitude: {
        type: Number,
        default: 0.0
    },
    contact_info: String,
    opening_hours: String,
    description: String
}, { timestamps: true });

export default mongoose.model<IStore>('Store', StoreSchema);