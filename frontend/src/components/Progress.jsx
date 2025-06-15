// Progress Component
// -----------------------------------------------------
// Purpose: Displays a simple progress indicator using dots.
// Features:
// - Configurable progress and total steps
// - Dynamic colors for active/inactive dots
// - Smooth transition animations

import React from 'react';

const Progress = ({
    progress = 0, // Number of completed steps
    total = 5, // Total steps in the progress bar
    color, // Color for active steps (overrides default)
    bgColor, // Color for inactive steps (overrides default)
}) => {
    return (
        <div className="flex gap-2">
            {[...Array(total)].map((_, i) => (
                <div
                    key={i}
                    className={`w-2 h-2 rounded transition-all`}
                    style={{
                        backgroundColor:
                            i < progress
                                ? color || 'rgba(1,1,1,1)' // Active dot color
                                : bgColor || 'rgba(1,1,1,0.1)', // Inactive dot color
                    }}
                />
            ))}
        </div>
    );
};

export default Progress;
