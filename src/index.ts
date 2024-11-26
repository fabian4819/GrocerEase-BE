import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes';
import authRoutes from './routes/authRoutes';
import storeRoutes from './routes/storeRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log('MongoDB connected'))
    .catch((err: Error) => console.error('MongoDB connection error:', err));

app.use('/api', routes);
app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));