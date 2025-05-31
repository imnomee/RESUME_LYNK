import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';

// =======================
// HELPER FUNCTION
// =======================

// Generate JWT token
const generateToken = (id) => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        // Fail fast with a clear error
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    return jwt.sign({ id }, secret, {
        expiresIn: '3d', // Token valid for 3 days
    });
};

// =======================
// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
// =======================
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const userExists = await userModel.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Generate salt & hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user in DB
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
        });

        // Respond with created user (excluding password)
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error('Error in registerUser:', error);
        return res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
};

// =======================
// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
// =======================
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await userModel.findOne({ email });

        if (!user) {
            return res
                .status(400)
                .json({ message: 'Invalid email or password' });
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ message: 'Invalid email or password' });
        }

        // Success: send token and user details (except password)
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error('Error in loginUser:', error);
        return res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
};

// =======================
// @desc    Get user profile
// @route   GET /api/v1/auth/profile
// @access  Private
// =======================
export const getUserProfile = async (req, res) => {
    try {
        // req.user is set by the 'protect' middleware
        const user = await userModel.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error('Error in getUserProfile:', error);
        return res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
};

// =======================
// @desc    Update user profile
// @route   PUT /api/v1/auth/profile
// @access  Private
// =======================
// TODO: Implement this function
export const updateUserProfile = async (req, res) => {
    // Left intentionally blank for future expansion
};
