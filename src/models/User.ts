import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password_hash: string;
    full_name: string;
    phone: string;
    role: string;
}

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    full_name: String,
    phone: String,
    role: { type: String, default: 'user' }
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);