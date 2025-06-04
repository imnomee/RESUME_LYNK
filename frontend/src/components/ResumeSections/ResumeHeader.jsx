import ActionButton from '../Buttons/ActionButton';
import TitleInput from '../inputs/TitleInput';
import { LuDownload, LuPalette, LuTrash2, LuPrinter } from 'react-icons/lu';

const ResumeHeader = ({
    resumeData,
    setResumeData,
    setOpenThemeSelector,
    handleDeleteResume,
    setOpenPreviewModaal,
}) => {
    return (
        <div className="flex items-center justify-between gap-5 bg-white rounded-lg border border-purple-100 py-3 px-4 mb-4">
            <div className="title">
                <TitleInput
                    title={resumeData.title}
                    setTitle={(value) =>
                        setResumeData({ ...resumeData, title: value })
                    }
                />
            </div>
            <div className="flex items-center gap-4">
                <ActionButton
                    text={'Change Theme'}
                    onClick={() => setOpenThemeSelector(true)}
                    icon={<LuPalette className="text-[16px]" />}
                />
                <ActionButton
                    text={'Delete Resume'}
                    onClick={() => handleDeleteResume()}
                    icon={<LuTrash2 className="text-[16px]" />}
                />
                <ActionButton
                    text={'Print Preview'}
                    onClick={() => setOpenPreviewModaal(true)}
                    icon={<LuPrinter className="text-[16px]" />}
                />
                {/* <button
                    className="btn-small-light"
                    onClick={() => setOpenPreviewModaal(true)}>
                    <LuDownload className="text-[16px]" />
                    <span className="hidden lg:block">
                        Preview & Download Resume
                    </span>
                </button> */}
            </div>
        </div>
    );
};

export default ResumeHeader;
