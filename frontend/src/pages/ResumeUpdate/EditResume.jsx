import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useReactToPrint } from 'react-to-print';
import {
    LuArrowLeft,
    LuCircleAlert,
    LuDownload,
    LuPalette,
    LuSave,
    LuTrash2,
} from 'react-icons/lu';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import ProfileInfoForm from './ProfileInfoForm';
import ContactInfoForm from './ContactInfoForm';
import WorkExperienceForm from './WorkExperienceForm';
import EducationDetailsForm from './EducationDetailsForm';
import SkillsInfoForm from './SkillsInfoForm';
import ProjectInfoForm from './ProjectInfoForm';
import CertificationInfoForm from './CertificationInfoForm';
import AdditionalInfoForm from './AdditionalInfoForm';
import RenderResume from '../../components/ResumeTemplates/RenderResume';
import newResume from '../../utils/newResume';
import TitleInput from '../../components/inputs/TitleInput';
import {
    captureElementAsImage,
    dataURLtoFile,
    fixTailwindColors,
} from '../../utils/helper';
import StepProgress from '../../components/StepProgress';
import ThemeSelector from './ThemeSelector';
import Modal from '../../components/Modal';

const EditResume = () => {
    const navigate = useNavigate();
    const { resumeId } = useParams();
    const resumeRef = useRef(null);
    const resumeDownloadRef = useRef(null);
    const [baseWidth, setBaseWidth] = useState(800);
    const [openThemeSelector, setOpenThemeSelector] = useState(false);
    const [openPreviewModal, setOpenPreviewModaal] = useState(false);
    const [currentPage, setCurrentPage] = useState('profile-info');
    const [progress, setProgress] = useState(0);
    const [resumeData, setResumeData] = useState(newResume);
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const validateAndNext = () => {
        const errors = [];
        switch (currentPage) {
            case 'profile-info': {
                const { fullName, designation, summary } =
                    resumeData.profileInfo;
                if (!fullName.trim()) {
                    errors.push('Full Name is required');
                }
                if (!designation.trim()) {
                    errors.push('Designation is required');
                }
                if (!summary.trim()) {
                    errors.push('Summary is required');
                }
                break;
            }
            case 'contact-info': {
                const { email, phone, location } = resumeData.contactInfo;
                if (!email.trim()) {
                    errors.push('Email is required');
                }
                if (!phone.trim()) {
                    errors.push('Phone is required');
                }
                if (!location.trim()) {
                    errors.push('Location is required');
                }
                break;
            }
            case 'work-experience':
                resumeData.workExperience.forEach((item, index) => {
                    const {
                        companyName,
                        role,
                        startDate,
                        endDate,
                        description,
                    } = item;
                    if (!companyName.trim()) {
                        errors.push(
                            `Company is required in experience ${index + 1}`
                        );
                    }
                    if (!role.trim()) {
                        errors.push(
                            `Role is required in experience ${index + 1}`
                        );
                    }
                    if (!startDate.trim()) {
                        errors.push(
                            `Start Date is required in experience ${index + 1}`
                        );
                    }
                    if (!endDate.trim()) {
                        errors.push(
                            `End Date is required in experience ${index + 1}`
                        );
                    }
                    if (!description.trim()) {
                        errors.push(
                            `Description is required in experience ${index + 1}`
                        );
                    }
                });
                break;
            case 'educational-info':
                resumeData.education.forEach((item, index) => {
                    const { degree, institutionName, startDate, endDate } =
                        item;
                    if (!degree.trim()) {
                        errors.push(
                            `Degree is required in education ${index + 1}`
                        );
                    }
                    if (!institutionName.trim()) {
                        errors.push(
                            `Institution is required in education ${index + 1}`
                        );
                    }
                    if (!startDate.trim()) {
                        errors.push(
                            `Start Date is required in education ${index + 1}`
                        );
                    }
                    if (!endDate.trim()) {
                        errors.push(
                            `End Date is required in education ${index + 1}`
                        );
                    }
                });
                break;
            case 'skills-info':
                resumeData.skills.forEach((skill, index) => {
                    const { skillName, progressLevel } = skill;
                    if (!skillName.trim()) {
                        errors.push(`Name is required in skill ${index + 1}`);
                    }
                    if (progressLevel < 1 || progressLevel > 100) {
                        errors.push(
                            `Progress must be betwen 1-100 in skill ${
                                index + 1
                            }`
                        );
                    }
                });
                break;
            case 'projects':
                resumeData.projects.forEach((item, index) => {
                    const { projectName, description } = item;
                    if (!projectName.trim()) {
                        errors.push(
                            `Title is required in project ${index + 1}`
                        );
                    }
                    if (!description.trim()) {
                        errors.push(
                            `Description is required in project ${index + 1}`
                        );
                    }
                });
                break;
            case 'certification':
                resumeData.certifications.forEach((cert, index) => {
                    const { title, issuer, year } = cert;
                    if (!title.trim()) {
                        errors.push(
                            `Title is required in certification ${index + 1}`
                        );
                    }
                    if (!issuer.trim()) {
                        errors.push(
                            `Issuer is required in certification ${index + 1}`
                        );
                    }
                    if (!year.trim()) {
                        errors.push(
                            `Year is required in certification ${index + 1}`
                        );
                    }
                });
                break;
            case 'additionalInfo':
                resumeData.languages.forEach((lang, index) => {
                    const { name, progressLevel } = lang;
                    if (!name.trim()) {
                        errors.push(
                            `Language is required in skill ${index + 1}`
                        );
                    }
                    if (progressLevel < 1 || progressLevel > 100) {
                        errors.push(
                            `Progress must be betwen 1-100 in skill ${
                                index + 1
                            }`
                        );
                    }
                });

                if (
                    resumeData.interests.length === 0 ||
                    !resumeData.interests[0].trim()
                ) {
                    errors.push('At least one interest is required');
                }
                break;
            default:
                break;
        }
        if (errors.length > 0) {
            setErrorMsg(errors.join(', '));
            return;
        }
        setErrorMsg('');
        goToNextStep();
    };
    const goToNextStep = () => {
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
        if (currentPage === 'additionalInfo') setOpenPreviewModaal(true);

        const currentIndex = pages.indexOf(currentPage);
        if (currentIndex !== -1 && currentIndex < pages.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentPage(pages[nextIndex]);
            const percent = Math.round((nextIndex / (pages.length - 1)) * 100);
            setProgress(percent);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };
    const goToPrevStep = () => {
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
        const currentIndex = pages.indexOf(currentPage);
        if (currentIndex !== -1 && currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            setCurrentPage(pages[prevIndex]);
            const percent = Math.round((prevIndex / (pages.length - 1)) * 100);
            setProgress(percent);
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        }
    };
    const renderForm = () => {
        switch (currentPage) {
            case 'profile-info':
                return (
                    <ProfileInfoForm
                        profileData={resumeData?.profileInfo}
                        updateSection={(key, value) =>
                            updateSection('profileInfo', key, value)
                        }
                        // onNext={validateAndNext}
                    />
                );
            case 'contact-info':
                return (
                    <ContactInfoForm
                        contactInfo={resumeData?.contactInfo}
                        updateSection={(key, value) =>
                            updateSection('contactInfo', key, value)
                        }
                    />
                );
            case 'work-experience':
                return (
                    <WorkExperienceForm
                        workExperience={resumeData?.workExperience}
                        updateArrayItem={(index, key, value) => {
                            updateArrayItem(
                                'workExperience',
                                index,
                                key,
                                value
                            );
                        }}
                        addArrayItem={(newItem) =>
                            addArrayItem('workExperience', newItem)
                        }
                        removeArrayItem={(index) =>
                            removeArrayItem('workExperience', index)
                        }
                    />
                );
            case 'educational-info':
                return (
                    <EducationDetailsForm
                        educationInfo={resumeData?.education}
                        updateArrayItem={(index, key, value) =>
                            updateArrayItem('education', index, key, value)
                        }
                        addArrayItem={(newItem) =>
                            addArrayItem('education', newItem)
                        }
                        removeArrayItem={(index) =>
                            removeArrayItem('education', index)
                        }
                    />
                );
            case 'skills-info':
                return (
                    <SkillsInfoForm
                        skillsInfo={resumeData?.skills}
                        updateArrayItem={(index, key, value) =>
                            updateArrayItem('skills', index, key, value)
                        }
                        addArrayItem={(newItem) =>
                            addArrayItem('skills', newItem)
                        }
                        removeArrayItem={(index) =>
                            removeArrayItem('skills', index)
                        }
                    />
                );
            case 'projects':
                return (
                    <ProjectInfoForm
                        projectInfo={resumeData?.projects}
                        updateArrayItem={(index, key, value) =>
                            updateArrayItem('projects', index, key, value)
                        }
                        addArrayItem={(newItem) =>
                            addArrayItem('projects', newItem)
                        }
                        removeArrayItem={(index) =>
                            removeArrayItem('projects', index)
                        }
                    />
                );
            case 'certification':
                return (
                    <CertificationInfoForm
                        certificationInfo={resumeData?.certifications}
                        updateArrayItem={(index, key, value) =>
                            updateArrayItem('certifications', index, key, value)
                        }
                        addArrayItem={(newItem) =>
                            addArrayItem('certifications', newItem)
                        }
                        removeArrayItem={(index) =>
                            removeArrayItem('certifications', index)
                        }
                    />
                );
            case 'additionalInfo':
                return (
                    <AdditionalInfoForm
                        languages={resumeData?.languages}
                        updateLanguage={(index, key, value) =>
                            updateArrayItem('languages', index, key, value)
                        }
                        addLanguage={(newItem) =>
                            addArrayItem('languages', newItem)
                        }
                        removeLanguage={(index) =>
                            removeArrayItem('languages', index)
                        }
                        interests={resumeData?.interests}
                        updateInterest={(index, key, value) =>
                            updateArrayItem('interests', index, key, value)
                        }
                        addInterest={(newItem) =>
                            addArrayItem('interests', newItem)
                        }
                        removeInterest={(index) =>
                            removeArrayItem('interests', index)
                        }
                    />
                );
            default:
                return null;
        }
    };
    const updateSection = (section, key, value) => {
        setResumeData((prevState) => ({
            ...prevState,
            [section]: { ...prevState[section], [key]: value },
        }));
    };
    const updateArrayItem = (section, index, key, value) => {
        setResumeData((prevState) => {
            const updatedArray = [...prevState[section]];
            if (key === null) {
                updatedArray[index] = value;
            } else {
                updatedArray[index] = { ...updatedArray[index], [key]: value };
            }
            return {
                ...prevState,
                [section]: updatedArray,
            };
        });
    };
    const addArrayItem = (section, newItem) => {
        setResumeData((prevState) => ({
            ...prevState,
            [section]: [...prevState[section], newItem],
        }));
    };
    const removeArrayItem = (section, index) => {
        setResumeData((prevState) => {
            const updatedArray = [...prevState[section]];
            updatedArray.splice(index, 1);
            return {
                ...prevState,
                [section]: updatedArray,
            };
        });
    };
    const uploadResumeImages = async () => {
        try {
            setIsLoading(true);
            fixTailwindColors(resumeRef.current);
            const imageDataUrl = await captureElementAsImage(resumeRef.current);
            const thumbnailFile = dataURLtoFile(
                imageDataUrl,
                `resume-${resumeId}.png`
            );
            console.log('thumbnailFile', thumbnailFile);
            const formData = new FormData();
            let profileImage = resumeData?.profileInfo?.profileImg || null;
            if (
                profileImage &&
                typeof profileImage === 'string' &&
                profileImage.startsWith('data:')
            ) {
                profileImage = dataURLtoFile(profileImage, 'profile.png');
            }
            if (profileImage) formData.append('profileImage', profileImage);
            if (thumbnailFile) formData.append('thumbnail', thumbnailFile);
            console.log(resumeId);
            const uploadResponse = await axiosInstance.put(
                API_PATHS.RESUME.UPLOAD_IMAGES(resumeId),
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            const { thumbnailLink, profilePreviewUrl } = uploadResponse.data;
            console.log('resume_data', resumeData);
            await updateResumeDetails(thumbnailLink, profilePreviewUrl);
            toast.success('Resume Updated Success');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            toast.error('Faile dto upload images');
        } finally {
            setIsLoading(false);
        }
    };
    const updateResumeDetails = async (thumbnailLink, profilePreviewUrl) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.put(
                API_PATHS.RESUME.UPDATE(resumeId),
                {
                    ...resumeData,
                    thumbnailLink: thumbnailLink || '',
                    profileInfo: {
                        ...resumeData.profileInfo,
                        profilePreviewUrl: profilePreviewUrl || '',
                    },
                }
            );
        } catch (error) {
            console.error(error);
            toast.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleDeleteResume = async () => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.delete(
                API_PATHS.RESUME.DELETE(resumeId)
            );
            toast.success('Resume Deleted Success');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };
    const reactToPrintFn = useReactToPrint({
        contentRef: resumeDownloadRef,
        documentTitle: 'Resume',
        onAfterPrint: () => {},
    });

    const fetchResumeDetailsById = async () => {
        try {
            const response = await axiosInstance.get(
                API_PATHS.RESUME.GET_BY_ID(resumeId)
            );
            if (response.data && response.data.profileInfo) {
                const resumeInfo = response.data;
                setResumeData((prevState) => ({
                    ...prevState,
                    title: resumeInfo?.title || 'Untitled',
                    template: resumeInfo?.template || prevState?.template,
                    profileInfo:
                        resumeInfo?.profileInfo || prevState?.profileInfo,
                    contactInfo:
                        resumeInfo?.contactInfo || prevState?.contactInfo,
                    workExperience:
                        resumeInfo?.workExperience || prevState?.workExperience,
                    education: resumeInfo?.education || prevState?.education,
                    skills: resumeInfo?.skills || prevState?.skills,
                    projects: resumeInfo?.projects || prevState?.projects,
                    certifications:
                        resumeInfo?.certifications || prevState?.certifications,
                    languages: resumeInfo?.languages || prevState?.languages,
                    interests: resumeInfo?.interests || prevState?.interests,
                }));
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        }
    };

    const updateBaseWidth = () => {
        if (resumeRef.current) {
            setBaseWidth(resumeRef.current.offsetWidth);
        }
    };

    useEffect(() => {
        updateBaseWidth();
        window.addEventListener('resize', updateBaseWidth);
        if (resumeId) {
            fetchResumeDetailsById();
        }
        return () => {
            window.removeEventListener('resize', updateBaseWidth);
        };
    }, []);

    return (
        <DashboardLayout>
            <div className="container mx-auto">
                <div className="flex items-center justify-between gap-5 bg-white rounded-lg border border-purple-100 py-3 px-4 mb-4">
                    <TitleInput
                        title={resumeData.title}
                        setTitle={(value) =>
                            setResumeData({ ...resumeData, title: value })
                        }
                    />
                    <div className="flex items-center gap-4">
                        <button
                            className="btn-small-light"
                            onClick={() => setOpenThemeSelector(true)}>
                            <LuPalette className="text-[16px]" />
                            <span className="hidden md:block">
                                Change Theme
                            </span>
                        </button>
                        <button
                            className="btn-small-light"
                            onClick={handleDeleteResume}>
                            <LuTrash2 className="text-[16px]" />
                            <span className="hidden md:block">
                                Delete Resume
                            </span>
                        </button>
                        <button
                            className="btn-small-light"
                            onClick={() => setOpenPreviewModaal(true)}>
                            <LuDownload className="text-[16px]" />
                            <span className="hidden md:block">
                                Preview & Download Resume
                            </span>
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="bg-white rounded-lg border border-purple-100 overflow-hidden">
                        <StepProgress progress={progress} />
                        {renderForm()}
                        <div className="mx-5">
                            {errorMsg && (
                                <div className="flex items-center gap-2 text-[13px] font-medium text-amber-600 bg-amber-100 py-0.5 my-1 rounded">
                                    <LuCircleAlert className="text-md" />
                                    {errorMsg}
                                </div>
                            )}
                            <div className="flex items-end justify-end gap-3 mt-3 mb-5">
                                <button
                                    className="btn-small-light"
                                    onClick={goToPrevStep}
                                    disabled={isLoading}>
                                    <LuArrowLeft className="text-[16px]" />
                                    Back
                                </button>
                                <button
                                    className="btn-small-light"
                                    onClick={uploadResumeImages}
                                    disabled={isLoading}>
                                    <LuSave className="text-[16px]" />
                                    {isLoading ? 'Updating...' : 'Save & Exit'}
                                </button>
                                <button
                                    className="btn-small-light"
                                    onClick={validateAndNext}
                                    disabled={isLoading}>
                                    {currentPage === 'additionalInfo' && (
                                        <LuDownload className="text-[16px]" />
                                    )}
                                    {currentPage === 'additionalInfo'
                                        ? 'Preview & Download'
                                        : 'Next'}
                                    {currentPage !== 'additionalInfo' && (
                                        <LuArrowLeft className="text-[16px] rotate-180" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div ref={resumeRef} className="h-[100vh]">
                        {/* Resume Template */}
                        <RenderResume
                            templateId={resumeData?.template?.theme || ''}
                            resumeData={resumeData}
                            colorPalette={
                                resumeData?.template?.colorPalette || []
                            }
                            containerWidth={baseWidth}
                        />
                    </div>
                </div>
            </div>
            <Modal
                isOpen={openThemeSelector}
                onClose={() => setOpenThemeSelector(false)}
                title={'Change Theme'}>
                <div className="w-[90vw] h-[30vw]">
                    <ThemeSelector
                        selectedTheme={resumeData?.template}
                        setSelectedTheme={(value) =>
                            setResumeData((prevState) => ({
                                ...prevState,
                                template: value || prevState.template,
                            }))
                        }
                        resumeData={null}
                        onClose={() => setOpenThemeSelector(false)}
                    />
                </div>
            </Modal>
            <Modal
                isOpen={openPreviewModal}
                onClose={() => setOpenPreviewModaal(false)}
                title={resumeData.title}
                showActionBtn
                actionBtnText={'Download'}
                actionBtnIcon={<LuDownload className="text-[16px]" />}
                onActionClick={() => reactToPrintFn()}>
                <div className="" ref={resumeDownloadRef}>
                    <RenderResume
                        templateId={
                            resumeData?.template?.theme || 'w-[98vw] h-[90vh]'
                        }
                        resumeData={resumeData}
                        colorPalette={resumeData?.template?.colorPalette || []}
                    />
                </div>
            </Modal>
        </DashboardLayout>
    );
};

export default EditResume;
