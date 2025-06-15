// TemplateCard Component
// -----------------------------------------------------
// Purpose: Displays a template thumbnail inside a selectable card
// Features:
// - Highlights border when selected
// - Calls onSelect callback when clicked
// - Handles absence of thumbnail gracefully

const TemplateCard = ({ thumbnailImg, isSelected, onSelect }) => {
    return (
        <div
            className={`h-auto md:h-[300px] flex flex-col items-center justify-between bg-white rounded-lg border border-gray-200 
                hover:border-purple-300 overflow-hidden cursor-pointer 
                ${isSelected ? 'border-purple-500 border-2' : ''}`}
            onClick={onSelect}
            aria-label="Template Card"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onSelect?.();
                }
            }}>
            {thumbnailImg ? (
                <img
                    src={thumbnailImg}
                    alt="Template preview"
                    className="w-full rounded"
                />
            ) : (
                <div className="flex items-center justify-center h-full w-full text-gray-400">
                    No preview available
                </div>
            )}
        </div>
    );
};

export default TemplateCard;
