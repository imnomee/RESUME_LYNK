import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            minlength: 2,
            maxlength: 50,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please fill a valid email address',
            ],
            index: true, // improves query speed on email
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 6,
            // Note: hash passwords before saving (do not store plain passwords)
        },
    },
    {
        timestamps: true, // auto-manage createdAt and updatedAt
    }
);

export default model('User', UserSchema);
