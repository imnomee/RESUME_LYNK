/**
 * Fetches resume details by ID and merges them into existing resumeData.
 *
 * @param {Object} params
 * @param {Function} params.setResumeData - Setter for resume state
 * @param {string} params.resumeId - ID of the resume to fetch
 * @param {Object} params.axiosInstance - Axios instance for API calls
 * @param {Object} params.API_PATHS - Object containing API endpoint builders
 * @param {Function} params.toast - Toast notification for feedback
 */
const fetchResumeDetailsById = async ({
    setResumeData,
    resumeId,
    axiosInstance,
    API_PATHS,
    toast,
}) => {
    try {
        const response = await axiosInstance.get(
            API_PATHS.RESUME.GET_BY_ID(resumeId)
        );

        const resumeInfo = response?.data;

        if (resumeInfo && resumeInfo.profileInfo) {
            // Merge each field individually with fallback to existing state
            setResumeData((prevState) => ({
                ...prevState,
                title: resumeInfo.title || 'Untitled',
                template: resumeInfo.template || prevState.template,
                profileInfo: resumeInfo.profileInfo || prevState.profileInfo,
                contactInfo: resumeInfo.contactInfo || prevState.contactInfo,
                workExperience:
                    resumeInfo.workExperience || prevState.workExperience,
                education: resumeInfo.education || prevState.education,
                skills: resumeInfo.skills || prevState.skills,
                projects: resumeInfo.projects || prevState.projects,
                certifications:
                    resumeInfo.certifications || prevState.certifications,
                languages: resumeInfo.languages || prevState.languages,
                interests: resumeInfo.interests || prevState.interests,
            }));
        }
    } catch (error) {
        console.error('Failed to fetch resume details:', error);
        toast.error('Something went wrong while loading resume data.');
    }
};

export default fetchResumeDetailsById;
