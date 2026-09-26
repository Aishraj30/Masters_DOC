import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('CRITICAL: MONGO_URI is missing in environment variables (.env)');
} else if (MONGO_URI.includes('<db_username>')) {
  console.warn('WARNING: MONGO_URI contains placeholder <db_username>. Please update .env with your MongoDB username.');
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully!');
    app.listen(PORT, () => {
      console.log(`DocMaster API Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB Connection Error:', err.message);
    // Start HTTP server anyway so API returns clear error responses if DB fails
    app.listen(PORT, () => {
      console.log(`DocMaster API Server running on port ${PORT} (MongoDB Disconnected)`);
    });
  });
