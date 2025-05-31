// =======================
// ENVIRONMENT SETUP
// =======================

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

// =======================
// MODULE IMPORTS
// =======================

import express from 'express';
import cors from 'cors';
import helmet from 'helmet'; // Adds security headers
import morgan from 'morgan'; // Logs HTTP requests
import rateLimit from 'express-rate-limit'; // 🛡️ Rate limiting

// MongoDB connection utility
import { connectDB } from './config/db.js';

// Route imports
import authRoutes from './routes/auth.route.js';
import resumeRoutes from './routes/resume.route.js';

// =======================
// INITIALIZE APP
// =======================

const app = express();

// =======================
// MIDDLEWARES
// =======================

// Configure CORS (Cross-Origin Resource Sharing)
const allowedOrigins = [
    'http://localhost:5173',
    'https://mern-jobs-frontend.vercel.app',
    'https://joblynk.site',
]; // Allowed origins for frontend

// CORS setup - allow frontend to communicate with backend
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// Parse incoming JSON requests
app.use(express.json());

// Add security-related HTTP headers
app.use(helmet());

// Log incoming HTTP requests (use 'dev' for concise colored logs)
app.use(morgan('dev'));

// Rate limiter — limit repeated requests to auth endpoints
const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 10, // Limit each IP to 10 requests per windowMs
    message: {
        message:
            'Too many requests from this IP, please try again after 10 minutes',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// =======================
// ROUTES
// =======================

// Optional: Add health check route
app.get('/', (req, res) => {
    return res.status(200).json({
        status: 'API is working',
        timestamp: new Date().toISOString(),
    });
});
// Auth routes (login, register, etc.)
// Apply rate limiter only to auth routes
// app.use('/api/v1/auth', authLimiter, authRoutes);

// Resume builder routes (CRUD)
// app.use('/api/v1/resumes', resumeRoutes);

// =======================
// SERVER INIT
// =======================

const PORT = process.env.PORT || 5000;

// Start server function
const startServer = async () => {
    try {
        await connectDB(); // Connect to the database
        app.listen(PORT, () => {
            console.log(`Server: Running on http://localhost:${PORT}`);
        });
    } catch (error) {
        process.on('SIGINT', async () => {
            // Handle shutdown gracefully
            process.exit(0); // Exit the process
        });
    }
};

// Start the server
startServer();
