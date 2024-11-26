import mongoose, { Schema, Document } from 'mongoose';
import crypto from 'crypto';

export interface IUser extends Document {
    username: string;
    email: string;
    password_hash: string;
    address: string;
    secret: string;
    name?: string;  
    latitude?: number; 
    longitude?: number; 
}

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    address: String,
    secret: {
        type: String,
        required: true,
        default: () => crypto.randomBytes(32).toString('hex')
    },
    name: String,
    latitude: Number,
    longitude: Number
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);