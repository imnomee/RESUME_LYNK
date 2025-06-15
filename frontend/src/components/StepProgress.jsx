// StepProgress Component
// -----------------------------------------------------
// Purpose: A horizontal progress bar for steps or task completion.
// Features:
// - Accepts progress as percentage (0-100)
// - Smooth transition animation on progress change
// - Nice gradient background for visual appeal

const StepProgress = ({ progress = 0 }) => {
    return (
        <div className="w-full bg-purple-50 h-1 overflow-hidden rounded-lg">
            <div
                className="h-1 bg-gradient-to-r from-purple-500/50 to-purple-700 transition-all rounded"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default StepProgress;
