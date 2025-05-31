// =======================
// AUTH ROUTES
// =======================

import express from 'express';

// Import controller functions
import {
    registerUser,
    loginUser,
    getUserProfile,
} from '../controllers/auth.controller.js';

// Middleware for protected routes and file upload
import { protect } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.middleware.js';

// Initialize Express Router
const router = express.Router();

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', registerUser);

/**
 * @route   POST /api/v1/auth/login
 * @desc    Log in a user and return token
 * @access  Public
 */
router.post('/login', loginUser);

/**
 * @route   GET /api/v1/auth/profile
 * @desc    Get current user's profile
 * @access  Private (token required)
 */
router.get('/profile', protect, getUserProfile);

/**
 * @route   POST /api/v1/auth/upload-image
 * @desc    Upload profile image to server
 * @access  Public (can be secured later if needed)
 */
router.post('/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Build accessible image URL dynamically
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${
        req.file.filename
    }`;

    return res.status(200).json({ imageUrl });
});

export default router;
