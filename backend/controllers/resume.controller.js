import fs from 'fs';
import path from 'path';
import Resume from '../models/resume.model.js';

//@desc     Create a Resume
//@route    POST /api/v1/resumes
//access    Private
export const createResume = async (req, res) => {
    try {
        const { title } = req.body;
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedIn: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    role: '',
                    companyName: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institutionName: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    skillName: '',
                    progressLevel: 0,
                },
            ],
            projects: [
                {
                    projectName: '',
                    projectLink: '',
                    description: '',
                    liveDemo: '',
                },
            ],
            certifications: [{ title: '', issuer: '', year: '' }],
            languages: [
                {
                    name: '',
                    progressLeve: 0,
                },
            ],
            interests: [''],
        };

        const newResume = await Resume.create({
            userId: req.user._id,
            title,
            ...defaultResumeData,
        });

        return res.status(201).json(newResume);
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: 'Failed to create Resume', error: error.message });
    }
};

//@desc     Get Resume by ID
//@route    GET /api/v1/resumes/:resumeId
//access    Private
export const getResumeById = async (req, res) => {
    const { resumeId } = req.params;

    try {
        const resume = await Resume.findOne({
            _id: resumeId,
            userId: req.user._id,
        });
        if (!resume) {
            return res.status(404).json({ message: 'Resume Not Found.' });
        }

        return res.status(200).json(resume);
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: 'Failed to get Resume', error: error.message });
    }
};

//@desc     Get Current User Resumes
//@route    GET /api/v1/resumes
export const getUserResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id }).sort({
            updatedAt: -1,
        });
        const total = await Resume.countDocuments({ userId: req.user._id });

        return res.status(200).json({
            total,
            resumes,
        });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: 'Failed to get Resumes', error: error.message });
    }
};

//@desc     Delete a Resume
//@route    DELETE /api/v1/resumes/:resumeId
//@access   Private
export const deleteResume = async (req, res) => {
    const { resumeId } = req.params;
    try {
        const resume = await Resume.findOne({
            _id: resumeId,
            userId: req.user._id,
        });
        if (!resume) {
            return res.status(404).json({ message: 'Resume Not FOund.' });
        }
        // Delete the profile image if it exists
        if (resume.profileInfo.profileImg) {
            const imagePath = path.join(
                __dirname,
                '../uploads',
                resume.profileInfo.profileImg
            );
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error deleting image:', err);
                } else {
                    console.log('Image deleted successfully');
                }
            });
        }
        const deleted = await Resume.findOneAndDelete({
            _id: req.params.resumeId,
            userId: req.user._id,
        });
        if (!deleted) {
            return res.status(404).json({ message: 'Resume Not FOund.' });
        }
        return res.status(200).json({ message: 'Resume deleted successfully' });
        s;
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: 'Failed to delete Resume', error: error.message });
    }
};

//@desc     Update a Resume
//@route    PUT /api/v1/resumes/:resumeId
//@access   Private
export const updateResume = async (req, res) => {
    const { resumeId } = req.params;
    try {
        const resume = await Resume.findOne({
            _id: resumeId,
            userId: req.user._id,
        });
        if (!resume) {
            return res.status(404).json({ message: 'Resume Not Found.' });
        }

        Object.assign(resume, req.body);
        const savedResume = await resume.save();
        return res.status(201).json(savedResume);
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: 'Failed to update Resume', error: error.message });
    }
};
