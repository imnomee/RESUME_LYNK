// Tabs Component
// -----------------------------------------------------
// Purpose: Render a tab selector for switching views/content.
// Features:
// - Highlights the active tab with underline and color
// - Calls setActiveTab when a tab is clicked
// - Responsive padding and font styles

import React from 'react';

const Tabs = ({ tabs = [], activeTab, setActiveTab }) => {
    return (
        <div className="my-2">
            <div className="flex border-b border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.label}
                        onClick={() => setActiveTab(tab.label)}
                        className={`relative px-3 md:px-4 py-2 text-sm font-medium cursor-pointer transition-colors duration-200 ${
                            activeTab === tab.label
                                ? 'text-purple-700'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                        aria-current={
                            activeTab === tab.label ? 'page' : undefined
                        }>
                        <div className="flex items-center">
                            <span className="text-[14px] font-semibold">
                                {tab.label}
                            </span>
                        </div>
                        {activeTab === tab.label && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500/85 to-purple-700" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Tabs;
