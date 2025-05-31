import fs from 'fs';
import path from 'path';

// Upload thumbnail and profileImage for a specific resume
export const uploadResumeImages = async (req, res) => {
    try {
        // Use multer middleware to handle multiple file fields
        upload.fields([{ name: 'thumbnail' }, { name: 'profileImage' }])(
            req,
            res,
            async (err) => {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }

                const { resumeId } = req.params;

                // Fetch resume document from database
                const resume = await Resume.findById(resumeId);
                if (!resume) {
                    return res.status(404).json({ error: 'Resume not found' });
                }

                // Base paths for file and URL generation
                const uploadsFolder = path.join(__dirname, '../uploads');
                const baseUrl = `${req.protocol}://${req.get('host')}`;

                // Extract uploaded files if available
                const newThumbnail = req.files?.thumbnail?.[0];
                const newProfileImage = req.files?.profileImage?.[0];

                // Handle thumbnail upload
                if (newThumbnail) {
                    const oldThumbnailPath = path.join(
                        uploadsFolder,
                        newThumbnail.filename
                    );

                    // Optional: delete previous thumbnail if needed (ensure file exists in model first)
                    // Example: fs.unlink(path.join(uploadsFolder, resume.thumbnailFileName), ...)
                    fs.unlink(oldThumbnailPath, (unlinkErr) => {
                        if (unlinkErr) {
                            console.error(
                                'Error deleting old thumbnail:',
                                unlinkErr.message
                            );
                        }
                    });

                    // Save new thumbnail URL to resume (if your model supports it)
                    resume.profileInfo.thumbnail = `${baseUrl}/uploads/${newThumbnail.filename}`;
                }

                // Handle profile image upload
                if (newProfileImage) {
                    resume.profileInfo.profileImg = `${baseUrl}/uploads/${newProfileImage.filename}`;
                }

                await resume.save();

                return res.status(200).json({
                    message: 'Images uploaded successfully',
                    resume,
                });
            }
        );
    } catch (error) {
        console.error('Error uploading images:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
