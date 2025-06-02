const pages = [
    'profile-info',
    'contact-info',
    'work-experience',
    'educational-info',
    'skills-info',
    'projects',
    'certification',
    'additionalInfo',
];

export const useResumeStepper = (currentPage, setCurrentPage, setProgress) => {
    const goToNextStep = () => {
        const index = pages.indexOf(currentPage);
        if (index < pages.length - 1) {
            const next = pages[index + 1];
            setCurrentPage(next);
            setProgress(Math.round(((index + 1) / (pages.length - 1)) * 100));
        }
    };

    const goToPrevStep = () => {
        const index = pages.indexOf(currentPage);
        if (index > 0) {
            const prev = pages[index - 1];
            setCurrentPage(prev);
            setProgress(Math.round(((index - 1) / (pages.length - 1)) * 100));
        }
    };

    return { pages, goToNextStep, goToPrevStep };
};
