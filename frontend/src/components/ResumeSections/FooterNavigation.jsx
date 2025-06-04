import { LuArrowLeft, LuArrowRight, LuSave, LuDownload } from 'react-icons/lu';
import ActionButton from '../Buttons/ActionButton';

const StepNavigation = ({
    isLoading,
    onBack,
    onSave,
    onNext,
    currentPage = '',
}) => {
    const isFinalStep = currentPage === 'additionalInfo';

    return (
        <div className="flex items-end justify-center gap-3 my-4 border-t border-purple-400 pt-2">
            <ActionButton
                text="Back"
                onClick={onBack}
                icon={<LuArrowLeft className="text-[16px]" />}
                disabled={isLoading}
            />

            <ActionButton
                text={isLoading ? 'Saving...' : 'Save & Exit'}
                onClick={onSave}
                icon={<LuSave className="text-[16px]" />}
                disabled={isLoading}
                loading={isLoading}
            />

            <ActionButton
                text={isFinalStep ? 'Preview' : 'Next'}
                onClick={onNext}
                icon={
                    isFinalStep ? (
                        <LuDownload className="text-[16px]" />
                    ) : (
                        <LuArrowRight className="text-[16px]" />
                    )
                }
                disabled={isLoading}
            />
        </div>
    );
};

export default StepNavigation;
