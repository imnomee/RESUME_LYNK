import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

// Schema for embedded sub-documents (work experience, education, skills, etc.)
const workExperienceSchema = new Schema({
    companyName: { type: String },
    role: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    description: { type: String },
});

const educationSchema = new Schema({
    degree: { type: String },
    institutionName: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
});

const skillSchema = new Schema({
    skillName: { type: String },
    progressLevel: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
        // Using 0-100 scale to better visualize skill proficiency
    },
});

const projectSchema = new Schema({
    projectName: { type: String },
    description: { type: String },
    projectLink: { type: String },
    liveDemo: { type: String },
});

const certificationSchema = new Schema({
    title: { type: String },
    issuer: { type: String },
    year: {
        type: String,
        match: [/^\d{4}$/, 'Year must be a 4-digit string'], // simple year validation
    },
});

const languageSchema = new Schema({
    name: { type: String },
    progressLevel: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
    },
});

const resumeSchema = new Schema(
    {
        userId: {
            type: Types.ObjectId,
            ref: 'User',
            required: true,
            index: true, // Adding index for faster queries filtering by userId
        },
        title: {
            type: String,
            required: [true, 'Resume title is required'],
            trim: true,
        },
        thumbnailLink: {
            type: String,
            default: '',
        },
        template: {
            theme: { type: String, default: 'default' },
            colorPalette: [{ type: String }],
        },
        profileInfo: {
            profilePreviewUrl: { type: String, default: '' },
            fullName: { type: String, trim: true },
            designation: { type: String, trim: true },
            summary: { type: String, trim: true },
        },
        contactInfo: {
            email: { type: String, trim: true },
            phone: { type: String, trim: true },
            location: { type: String, trim: true },
            linkedIn: { type: String, trim: true },
            github: { type: String, trim: true },
            website: { type: String, trim: true },
        },
        workExperience: [workExperienceSchema],
        education: [educationSchema],
        skills: [skillSchema],
        projects: [projectSchema],
        certifications: [certificationSchema],
        languages: [languageSchema],
        interests: [{ type: String, trim: true }],
    },
    {
        timestamps: true, // createdAt & updatedAt managed automatically
    }
);

export default model('Resume', resumeSchema);
