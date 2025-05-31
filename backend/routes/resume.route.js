// =======================
// RESUME ROUTES
// =======================

import express from 'express';

// Resume controller handlers
import {
    createResume,
    getUserResumes,
    getResumeById,
    updateResume,
    deleteResume,
} from '../controllers/resume.controller.js';
import { validateObjectId } from '../middlewares/validate.middlware.js';

// Middleware for route protection
import { protect } from '../middlewares/auth.middleware.js';

// Initialize router
const router = express.Router();

/**
 * @route   POST /api/v1/resumes
 * @desc    Create a new resume
 * @access  Private
 */
router.post('/', protect, createResume);

/**
 * @route   GET /api/v1/resumes
 * @desc    Get all resumes for the logged-in user
 * @access  Private
 */
router.get('/', protect, getUserResumes);

/**
 * @route   GET /api/v1/resumes/:resumeId
 * @desc    Get a single resume by ID
 * @access  Private
 */
router.get('/:resumeId', protect, validateObjectId('resumeId'), getResumeById);

/**
 * @route   PUT /api/v1/resumes/:resumeId
 * @desc    Update a resume by ID
 * @access  Private
 */
router.put('/:resumeId', protect, validateObjectId('resumeId'), updateResume);

/**
 * @route   DELETE /api/v1/resumes/:resumeId
 * @desc    Delete a resume by ID
 * @access  Private
 */
router.delete(
    '/:resumeId',
    protect,
    validateObjectId('resumeId'),
    deleteResume
);

export default router;
