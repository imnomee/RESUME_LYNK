// ResumeSummaryCard Component
// -----------------------------------------------------
// Displays a resume summary card with:
// - A randomly selected gradient background
// - Large resume title/initials as placeholder content
// - Footer with title and last updated date
// - Smooth hover interactions (scale, shadow, border color)

import React from 'react';

// Predefined gradients for card background (soft, pleasing color palette)
const gradients = [
    'bg-gradient-to-r from-purple-200 to-purple-100',
    'bg-gradient-to-r from-blue-200 to-blue-100',
    'bg-gradient-to-r from-green-200 to-green-100',
];

const ResumeSummaryCard = ({ title = 'Untitled', lastUpdated, onSelect }) => {
    // Pick a random gradient for each card render
    // ⚠️ Note: This will change on every render. If you want consistent colors per card,
    // consider generating this once at creation or using a hash on title as index.
    const randomGradient =
        gradients[Math.floor(Math.random() * gradients.length)];

    return (
        <div
            className="h-[300px] flex flex-col rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-lg hover:scale-105 transition-transform duration-300 overflow-hidden cursor-pointer relative"
            onClick={onSelect}
            aria-label={`Resume card for ${title}`}>
            {/* Visual placeholder: large title text on gradient */}
            <div
                className={`flex-1 w-full flex items-center justify-center ${randomGradient}`}>
                <span className="text-5xl font-extrabold text-white text-shadow-lg px-4 text-center break-words">
                    {title}
                </span>
            </div>

            {/* Card footer: title + last updated info */}
            <div className="w-full bg-purple-100 px-4 py-3 text-center">
                <h5 className="text-sm font-medium truncate overflow-hidden whitespace-nowrap">
                    {title}
                </h5>
                <p className="text-xs font-medium text-gray-500 mt-0.5">
                    Last Updated: {lastUpdated}
                </p>
            </div>
        </div>
    );
};

export default ResumeSummaryCard;
