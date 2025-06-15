// TitleInput Component
// -----------------------------------------------------
// Purpose: Inline editable title field with toggle between view & edit modes
// Features:
// - Displays title text with pencil icon to edit
// - Shows input field with confirm icon during editing
// - Handles truncation for long titles

import React, { useState } from 'react';
import { LuCheck, LuPencil } from 'react-icons/lu';

const TitleInput = ({ title, setTitle }) => {
    const [showInput, setShowInput] = useState(false);

    const handleConfirm = () => {
        if (title.trim() === '') return; // Prevent empty titles (optional logic)
        setShowInput(false);
    };

    return (
        <div className="flex items-center gap-3 w-full">
            {showInput ? (
                <>
                    <input
                        type="text"
                        value={title}
                        placeholder="Resume Title"
                        onChange={(e) => setTitle(e.target.value)}
                        className="flex-1 text-sm md:text-[17px] bg-transparent outline-none text-black font-semibold border-b border-gray-300 pb-1 truncate"
                        aria-label="Edit resume title"
                        autoFocus
                    />
                    <button
                        onClick={handleConfirm}
                        aria-label="Confirm title"
                        className="cursor-pointer text-purple-600 hover:text-purple-800 transition">
                        <LuCheck className="text-[16px]" />
                    </button>
                </>
            ) : (
                <>
                    <h2
                        className="flex-1 text-sm md:text-[17px] font-semibold truncate"
                        title={title} // Show full title on hover
                    >
                        {title || 'Untitled Resume'}
                    </h2>
                    <button
                        onClick={() => setShowInput(true)}
                        aria-label="Edit title"
                        className="cursor-pointer text-purple-600 hover:text-purple-800 transition">
                        <LuPencil className="text-[16px]" />
                    </button>
                </>
            )}
        </div>
    );
};

export default TitleInput;
