import TitleInput from '../inputs/TitleInput';
import { LuDownload, LuPalette, LuTrash2 } from 'react-icons/lu';

const ResumeHeader = ({
    resumeData,
    setResumeData,
    setOpenThemeSelector,
    handleDeleteResume,
    setOpenPreviewModaal,
}) => {
    return (
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
                    <span className="hidden md:block">Change Theme</span>
                </button>
                <button
                    className="btn-small-light"
                    onClick={handleDeleteResume}>
                    <LuTrash2 className="text-[16px]" />
                    <span className="hidden md:block">Delete Resume</span>
                </button>
                <button
                    className="btn-small-light"
                    onClick={() => setOpenPreviewModaal(true)}>
                    <LuDownload className="text-[16px]" />
                    <span className="hidden lg:block">
                        Preview & Download Resume
                    </span>
                </button>
            </div>
        </div>
    );
};

export default ResumeHeader;
