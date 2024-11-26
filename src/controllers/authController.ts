import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User';

// Default secret jika user.secret tidak ada
const DEFAULT_SECRET = crypto.randomBytes(32).toString('hex');

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password, address, name, latitude, longitude } = req.body;
        console.log('Register attempt:', { email, username });

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);
        const userSecret = crypto.randomBytes(32).toString('hex');

        const user = await User.create({
            username,
            email,
            password_hash,
            address,
            secret: userSecret,
            name,
            latitude,
            longitude
        });

        console.log('User created:', user._id);
        console.log('User secret created:', userSecret);

        const token = jwt.sign(
            { id: user._id, email: user.email },
            userSecret,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                name: user.name,
                address: user.address,
                latitude: user.latitude,
                longitude: user.longitude
            }
        });
    } catch (error: any) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt:', email);

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            user.secret || DEFAULT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                name: user.name,
                address: user.address,
                latitude: user.latitude,
                longitude: user.longitude
            }
        });
    } catch (error: any) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const editProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;  // Get the user ID from the URL parameter
        const { username, email, address, currentPassword, newPassword, confirmNewPassword } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Find the user in the database by their ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If the user provided a new password, verify the current password
        if (newPassword && !currentPassword) {
            return res.status(400).json({ message: 'Current password is required when changing the password' });
        }

        if (currentPassword && !await bcrypt.compare(currentPassword, user.password_hash)) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        // If new password and confirmation password match, update the password
        if (newPassword && newPassword === confirmNewPassword) {
            const salt = await bcrypt.genSalt(10);
            user.password_hash = await bcrypt.hash(newPassword, salt);
        }

        // Update the user profile with the new data
        user.username = username || user.username;
        user.email = email || user.email;
        user.address = address || user.address;

        await user.save();  // Save the updated user to the database

        res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                name: user.name,
                address: user.address,
                latitude: user.latitude,
                longitude: user.longitude
            }
        });
    } catch (error: any) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};