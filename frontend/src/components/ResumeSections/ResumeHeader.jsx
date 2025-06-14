// ResumeHeader Component
// -----------------------
// Displays the header section of the resume editor.
// Includes title editing, theme selection, delete confirmation, and preview/print actions.
// Designed for reusability + easy integration with future features like export options.

import ActionButton from '../Buttons/ActionButton';
import TitleInput from '../inputs/TitleInput';
import { LuDownload, LuPalette, LuTrash2, LuPrinter } from 'react-icons/lu';

const ResumeHeader = ({
    resumeData, // Object: current resume data (e.g. { title, sections, etc. })
    setResumeData, // Function: updates resume data state
    setOpenThemeSelector, // Function: opens the theme selector modal
    handleDeleteResume, // Function: deletes the current resume
    setOpenPreviewModaal, // Function: opens the print/preview modal
}) => {
    /**
     * Confirm with user before deleting resume.
     * Can be enhanced later to use a custom modal instead of window.confirm.
     */
    const confirmDelete = () => {
        const confirmed = confirm(
            'Are you sure you want to delete this resume?'
        );
        if (confirmed) {
            handleDeleteResume();
        }
    };

    return (
        <div className="flex items-center justify-between gap-5 bg-white rounded-lg border border-purple-100 py-3 px-4 mb-4">
            {/* Title input field - allows renaming the resume */}
            <div className="title">
                <TitleInput
                    title={resumeData.title}
                    setTitle={(value) =>
                        setResumeData({
                            ...resumeData,
                            title: value, // Only update title, preserve other data
                        })
                    }
                />
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-4">
                {/* Change theme button */}
                <ActionButton
                    text="Change Theme"
                    onClick={() => setOpenThemeSelector(true)}
                    icon={<LuPalette className="text-[16px]" />}
                />

                {/* Delete resume button - with red styling */}
                <ActionButton
                    text="Delete Resume"
                    onClick={confirmDelete}
                    icon={<LuTrash2 className="text-[16px]" />}
                    className="text-red-500 hover:bg-red-100"
                />

                {/* Print preview button */}
                <ActionButton
                    text="Print Preview"
                    onClick={() => setOpenPreviewModaal(true)}
                    icon={<LuPrinter className="text-[16px]" />}
                />
            </div>
        </div>
    );
};

export default ResumeHeader;
