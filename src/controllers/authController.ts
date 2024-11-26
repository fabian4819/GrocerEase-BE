import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User';

// Default secret jika user.secret tidak ada
const DEFAULT_SECRET = crypto.randomBytes(32).toString('hex');

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

        // Log untuk debugging
        console.log('User found:', user);
        console.log('User secret:', user.secret || DEFAULT_SECRET);

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
                username: user.username
            }
        });
    } catch (error: any) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password, address } = req.body;
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
            secret: userSecret
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
                username: user.username
            }
        });
    } catch (error: any) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};