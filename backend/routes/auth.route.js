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

export default router;
