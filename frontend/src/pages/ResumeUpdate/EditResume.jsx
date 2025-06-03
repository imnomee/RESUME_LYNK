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
import StepProgress from '../../components/StepProgress';
import ThemeSelector from './ThemeSelector';
import Modal from '../../components/Modal';

import html2pdf from 'html2pdf.js'; // Assuming you installed it

//Resume Stepper
import { useResumeStepper } from '../../hooks/useResumeStepper';
//Resume Section Validation
import { validateResumeSection } from '../../utils/validateResumeSection';
import { fixTailwindColors } from '../../utils/helper';

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

    //Resume Section Validation
    const validateAndNext = () => {
        const errors = validateResumeSection(currentPage, resumeData);
        if (errors.length > 0) {
            setErrorMsg(errors.join(', '));
            return;
        }
        setErrorMsg('');
        goToNextStep();
    };
    //Resume Stepper
    const { goToNextStep, goToPrevStep } = useResumeStepper(
        currentPage,
        setCurrentPage,
        setProgress
    );
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
    // const uploadResumeImages = async () => {
    //     try {
    //         setIsLoading(true);
    //         fixTailwindColors(resumeRef.current);
    //         const imageDataUrl = await captureElementAsImage(resumeRef.current);
    //         const thumbnailFile = dataURLtoFile(
    //             imageDataUrl,
    //             `resume-${resumeId}.png`
    //         );
    //         console.log('thumbnailFile', thumbnailFile);
    //         const formData = new FormData();
    //         let profileImage = resumeData?.profileInfo?.profileImg || null;
    //         if (
    //             profileImage &&
    //             typeof profileImage === 'string' &&
    //             profileImage.startsWith('data:')
    //         ) {
    //             profileImage = dataURLtoFile(profileImage, 'profile.png');
    //         }
    //         if (profileImage) formData.append('profileImage', profileImage);
    //         if (thumbnailFile) formData.append('thumbnail', thumbnailFile);
    //         console.log(resumeId);
    //         const uploadResponse = await axiosInstance.put(
    //             API_PATHS.RESUME.UPLOAD_IMAGES(resumeId),
    //             formData,
    //             {
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                 },
    //             }
    //         );

    //         const { thumbnailLink, profilePreviewUrl } = uploadResponse.data;
    //         console.log('resume_data', resumeData);
    //         await updateResumeDetails(thumbnailLink, profilePreviewUrl);
    //         toast.success('Resume Updated Success');
    //         navigate('/dashboard');
    //     } catch (error) {
    //         console.error(error);
    //         toast.error('Faile dto upload images');
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };
    const updateResumeDetails = async () => {
        try {
            setIsLoading(true);

            // Send updated resume data without images
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
    const handleDeleteResume = async () => {
        try {
            setIsLoading(true);
            await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeId));
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
        onPrintError: (error) => console.error('Printing error:', error),
        removeAfterPrint: true,
        contentRef: resumeDownloadRef,
        documentTitle: 'Resume',
        print: async (printIframe) => {
            const document = printIframe.contentDocument;
            if (document) {
                const htmlElement = document.getElementById('element-to-print');
                fixTailwindColors(htmlElement);
                if (htmlElement) {
                    console.log('Element to convert:', htmlElement);
                    const exporter = html2pdf()
                        .from(htmlElement)
                        .set({
                            margin: 5,
                            filename: 'Nota Simple.pdf',
                            image: { type: 'jpeg', quality: 0.98 },
                            html2canvas: {
                                scale: 2,
                                logging: true,
                                useCORS: true,
                            },
                            jsPDF: {
                                unit: 'mm',
                                format: 'legal',
                                orientation: 'portrait',
                            },
                        });

                    try {
                        await exporter.save(); // Use .save() to trigger download
                        console.log(
                            'PDF generated and downloaded successfully!'
                        );
                    } catch (pdfError) {
                        console.error('Error generating PDF:', pdfError);
                    }
                } else {
                    console.error(
                        "Element with ID 'element-to-download-as-pdf' not found in the print content."
                    );
                }
            } else {
                console.error('Print iframe document not available.');
            }
        },
    });
    useEffect(() => {
        // This effect will run every time openPreviewModal changes
        // and when the component mounts if openPreviewModal is initially true.
        if (openPreviewModal && resumeDownloadRef.current) {
            // Give React a moment to fully render the content
            // before triggering the print function.
            const timer = setTimeout(() => {
                reactToPrintFn();
            }, 100); // A small delay can help ensure the content is fully painted

            return () => clearTimeout(timer); // Cleanup the timer if component unmounts
        }
    }, [openPreviewModal, reactToPrintFn]); // Dependencies: re-run when modal state or print function changes

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
                                    onClick={updateResumeDetails}
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
                title="Change Theme"
                width="90vw"
                height="90vh">
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
            </Modal>
            <Modal
                isOpen={openPreviewModal}
                onClose={() => setOpenPreviewModaal(false)}
                title={resumeData.title}
                showActionBtn
                actionBtnText="Download"
                actionBtnIcon={<LuDownload className="text-[16px]" />}
                onActionClick={reactToPrintFn}
                width="850px" // Slightly wider for padding
                height="auto" // Let height grow, we'll scroll inside
            >
                <div
                    ref={resumeDownloadRef}
                    id="element-to-print"
                    className="mx-auto bg-white shadow-md"
                    style={{
                        width: '794px', // A4 width
                        minHeight: '1500px', // A4 height
                        padding: '2px',
                    }}>
                    <RenderResume
                        templateId={resumeData?.template?.theme || '01'}
                        resumeData={resumeData}
                        colorPalette={resumeData?.template?.colorPalette || []}
                        containerWidth={794}
                    />
                </div>
            </Modal>
        </DashboardLayout>
    );
};

export default EditResume;
