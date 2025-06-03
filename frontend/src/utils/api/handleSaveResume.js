const handleSaveResume = async ({
    axiosInstance,
    resumeData,
    resumeId,
    API_PATHS,
    toast,
    navigate,
    setIsLoading,
}) => {
    try {
        setIsLoading(true);

        // PUT updated resume data (excluding image upload, assumed handled elsewhere)
        await axiosInstance.put(API_PATHS.RESUME.UPDATE(resumeId), {
            ...resumeData,
        });

        toast.success('Resume saved successfully');
        navigate('/dashboard');
    } catch (error) {
        console.error('Failed to save resume:', error);
        toast.error('Failed to save resume. Please try again.');
    } finally {
        setIsLoading(false);
    }
};

export default handleSaveResume;
