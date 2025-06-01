import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

/**
 * Middleware to protect private routes
 * Verifies JWT token and attaches user info to request object
 */
export const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        // Check if token exists and starts with Bearer
        if (token && token.startsWith('Bearer')) {
            // Extract actual token from "Bearer <token>"
            token = token.split(' ')[1];

            // Verify and decode the token using your secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user (without password) to req for access in controllers
            req.user = await User.findById(decoded.id).select('-password');

            // Proceed to next middleware or controller
            next();
        } else {
            // No token provided
            return res
                .status(401)
                .json({ message: 'Not authorized, no token' });
        }
    } catch (error) {
        console.error('Auth middleware error:', error.message);

        // Invalid token or verification failed
        return res
            .status(401)
            .json({ message: 'Not authorized, token failed' });
    }
};
