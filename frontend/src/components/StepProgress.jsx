import React from 'react';

const StepProgress = ({ progress }) => {
    return (
        <div className="w-full bg-purple-50 h-1 overflow-hidden rounded-lg">
            <div
                className="h-1 bg-linear-to-r from-purple-500/50 to-purple-700 transition-all rounded"
                style={{ width: `${progress}%` }}></div>
        </div>
    );
};

export default StepProgress;
