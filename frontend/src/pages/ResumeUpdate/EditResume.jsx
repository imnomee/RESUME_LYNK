import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useReactToPrint } from 'react-to-print';
import { LuArrowLeft, LuCircleAlert, LuDownload, LuSave } from 'react-icons/lu';
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
import ResumeHeader from '../../components/ResumeSections/ResumeHeader';
import updateSection from '../../utils/updateSection';
import updateArrayItem from '../../utils/updateArrayItem';
import addArrayItem from '../../utils/addArrayitem';
import removeArrayItem from '../../utils/removeArrayItem';
import handleSaveResume from '../../utils/api/handleSaveResume';
import handleDeleteResume from '../../utils/api/handleDeleteResume';
import fetchResumeDetailsById from '../../utils/api/fetchResumeDetailsById';

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

    //Save Resume
    const onSave = () => {
        handleSaveResume({
            axiosInstance,
            resumeData,
            resumeId,
            API_PATHS,
            toast,
            navigate,
            setIsLoading,
        });
    };

    //Delete Resume
    const onDelete = () => {
        handleDeleteResume({
            setIsLoading,
            axiosInstance,
            toast,
            navigate,
            resumeId,
            API_PATHS,
        });
    };

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
                            updateSection(
                                setResumeData,
                                'profileInfo',
                                key,
                                value
                            )
                        }
                    />
                );
            case 'contact-info':
                return (
                    <ContactInfoForm
                        contactInfo={resumeData?.contactInfo}
                        updateSection={(key, value) =>
                            updateSection(
                                setResumeData,
                                'contactInfo',
                                key,
                                value
                            )
                        }
                    />
                );
            case 'work-experience':
                return (
                    <WorkExperienceForm
                        workExperience={resumeData?.workExperience}
                        updateArrayItem={(index, key, value) => {
                            updateArrayItem(
                                setResumeData,
                                'workExperience',
                                index,
                                key,
                                value
                            );
                        }}
                        addArrayItem={(newItem) =>
                            addArrayItem(
                                setResumeData,
                                'workExperience',
                                newItem
                            )
                        }
                        removeArrayItem={(index) =>
                            removeArrayItem(
                                setResumeData,
                                'workExperience',
                                index
                            )
                        }
                    />
                );
            case 'educational-info':
                return (
                    <EducationDetailsForm
                        educationInfo={resumeData?.education}
                        updateArrayItem={(index, key, value) =>
                            updateArrayItem(
                                setResumeData,
                                'education',
                                index,
                                key,
                                value
                            )
                        }
                        addArrayItem={(newItem) =>
                            addArrayItem(setResumeData, 'education', newItem)
                        }
                        removeArrayItem={(index) =>
                            removeArrayItem(setResumeData, 'education', index)
                        }
                    />
                );
            case 'skills-info':
                return (
                    <SkillsInfoForm
                        skillsInfo={resumeData?.skills}
                        updateArrayItem={(index, key, value) =>
                            updateArrayItem(
                                setResumeData,
                                'skills',
                                index,
                                key,
                                value
                            )
                        }
                        addArrayItem={(newItem) =>
                            addArrayItem(setResumeData, 'skills', newItem)
                        }
                        removeArrayItem={(index) =>
                            removeArrayItem(setResumeData, 'skills', index)
                        }
                    />
                );
            case 'projects':
                return (
                    <ProjectInfoForm
                        projectInfo={resumeData?.projects}
                        updateArrayItem={(index, key, value) =>
                            updateArrayItem(
                                setResumeData,
                                'projects',
                                index,
                                key,
                                value
                            )
                        }
                        addArrayItem={(newItem) =>
                            addArrayItem(setResumeData, 'projects', newItem)
                        }
                        removeArrayItem={(index) =>
                            removeArrayItem(setResumeData, 'projects', index)
                        }
                    />
                );
            case 'certification':
                return (
                    <CertificationInfoForm
                        certificationInfo={resumeData?.certifications}
                        updateArrayItem={(index, key, value) =>
                            updateArrayItem(
                                setResumeData,
                                'certifications',
                                index,
                                key,
                                value
                            )
                        }
                        addArrayItem={(newItem) =>
                            addArrayItem(
                                setResumeData,
                                'certifications',
                                newItem
                            )
                        }
                        removeArrayItem={(index) =>
                            removeArrayItem(
                                setResumeData,
                                'certifications',
                                index
                            )
                        }
                    />
                );
            case 'additionalInfo':
                return (
                    <AdditionalInfoForm
                        languages={resumeData?.languages}
                        updateLanguage={(index, key, value) =>
                            updateArrayItem(
                                setResumeData,
                                'languages',
                                index,
                                key,
                                value
                            )
                        }
                        addLanguage={(newItem) =>
                            addArrayItem(setResumeData, 'languages', newItem)
                        }
                        removeLanguage={(index) =>
                            removeArrayItem(setResumeData, 'languages', index)
                        }
                        interests={resumeData?.interests}
                        updateInterest={(index, key, value) =>
                            updateArrayItem(
                                setResumeData,
                                'interests',
                                index,
                                key,
                                value
                            )
                        }
                        addInterest={(newItem) =>
                            addArrayItem(setResumeData, 'interests', newItem)
                        }
                        removeInterest={(index) =>
                            removeArrayItem(setResumeData, 'interests', index)
                        }
                    />
                );
            default:
                return null;
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

    const updateBaseWidth = () => {
        if (resumeRef.current) {
            setBaseWidth(resumeRef.current.offsetWidth);
        }
    };

    useEffect(() => {
        updateBaseWidth();
        window.addEventListener('resize', updateBaseWidth);
        if (resumeId) {
            fetchResumeDetailsById({
                setResumeData,
                resumeId,
                axiosInstance,
                API_PATHS,
                toast,
            });
        }
        return () => {
            window.removeEventListener('resize', updateBaseWidth);
        };
    }, [resumeId]);

    return (
        <DashboardLayout>
            <div className="container mx-auto">
                <ResumeHeader
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                    setOpenThemeSelector={setOpenThemeSelector}
                    handleDeleteResume={onDelete}
                    setOpenPreviewModaal={setOpenPreviewModaal}
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
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
                            <div className="flex items-end justify-center gap-3 my-4 border-t border-purple-400 pt-2">
                                <button
                                    className="btn-small-light"
                                    onClick={goToPrevStep}
                                    disabled={isLoading}>
                                    <LuArrowLeft className="text-[16px]" />
                                    Back
                                </button>
                                <button
                                    className="btn-small-light"
                                    onClick={onSave}
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
                                        ? 'Preview'
                                        : 'Next'}
                                    {currentPage !== 'additionalInfo' && (
                                        <LuArrowLeft className="text-[16px] rotate-180" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div ref={resumeRef} className="hidden md:block h-[100vh]">
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
