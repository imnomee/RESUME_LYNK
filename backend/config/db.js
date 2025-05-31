// =======================
// MONGOOSE SETUP
// =======================

import mongoose from 'mongoose';

/**
 * Connects to MongoDB using the connection string defined in .env
 *
 * @returns {Promise<void>} Connects to MongoDB and logs status
 */
export const connectDB = async () => {
    try {
        // Optional: You can pass mongoose options here (like useNewUrlParser, etc.)
        await mongoose.connect(process.env.MONGO_URI);

        // Connection successful
        console.log('✅ Successfully connected to MongoDB');
    } catch (error) {
        // Connection failed
        console.error('❌ MongoDB connection error:', error.message);

        // Optional: More detailed logging in development
        if (process.env.NODE_ENV === 'development') {
            console.error(error);
        }

        // Exit the process so container (if used) or hosting provider can restart it
        process.exit(1);
    }

    // Optional: Event listeners for better debugging and reconnection handling
    mongoose.connection.on('disconnected', () => {
        console.warn('⚠️ MongoDB connection lost. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
        console.log('🔄 MongoDB reconnected.');
    });
};
