import mongoose, { Schema, Document } from 'mongoose';

export interface IStore extends Document {
    name: string;
    address: string;
    city: string;
    phone: string;
    email: string;
    latitude: number;
    longitude: number;
    business_hours: string;
    owner_id: mongoose.Types.ObjectId;
}

const StoreSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    phone: String,
    email: String,
    latitude: Number,
    longitude: Number,
    business_hours: String,
    owner_id: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model<IStore>('Store', StoreSchema);