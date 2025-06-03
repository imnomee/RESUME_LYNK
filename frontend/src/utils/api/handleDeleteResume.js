/**
 * Deletes the specified resume by ID.
 *
 * @param {Object} params
 * @param {Function} params.setIsLoading - Function to set loading state
 * @param {Object} params.axiosInstance - Pre-configured Axios instance
 * @param {Function} params.toast - Toast notification handler
 * @param {Function} params.navigate - React Router navigate function
 * @param {string} params.resumeId - Unique identifier of the resume to delete
 * @param {Object} params.API_PATHS - API route builder
 */
const handleDeleteResume = async ({
    setIsLoading,
    axiosInstance,
    toast,
    navigate,
    resumeId,
    API_PATHS,
}) => {
    try {
        setIsLoading(true);

        // Call DELETE API to remove resume by ID
        await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeId));

        toast.success('Resume deleted successfully');
        navigate('/dashboard');
    } catch (error) {
        console.error('Failed to delete resume:', error);
        toast.error('Something went wrong while deleting the resume.');
    } finally {
        setIsLoading(false);
    }
};

export default handleDeleteResume;
