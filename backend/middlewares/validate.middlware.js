import mongoose from 'mongoose';

export const validateObjectId = (paramName) => (req, res, next) => {
    const id = req.params[paramName];

    if (!id) {
        return res.status(400).json({
            message: `${paramName} parameter is required`,
            error: `Missing ${paramName} parameter`,
        });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: `Invalid ${paramName} format`,
            error: `Provided ${paramName} is not a valid or Missing ${paramName} parameter.`,
        });
    }

    next();
};
