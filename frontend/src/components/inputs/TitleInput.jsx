import React, { useState } from 'react';
import { LuCheck, LuPencil } from 'react-icons/lu';
// Consider adding PropTypes or converting this to TypeScript for better type safety

const TitleInput = ({ title, setTitle }) => {
    const [showInput, setShowInput] = useState(false); // Toggles between display and edit mode

    return (
        <div className="flex items-center gap-3">
            {showInput ? (
                <>
                    {/* Editable input field for title */}
                    <input
                        className="text-sm md:text-[17px] bg-transparent outline-none text-black font-semibold border-b border-gray-300 pb-1"
                        type="text"
                        value={title}
                        placeholder="Resume Title"
                        onChange={(e) => setTitle(e.target.value)} // Updates parent state
                    />
                    {/* Check icon to confirm title change */}
                    <button
                        onClick={() => setShowInput(false)}
                        aria-label="Confirm title"
                        className="cursor-pointer">
                        <LuCheck className="text-[16px] text-purple-600" />
                    </button>
                </>
            ) : (
                <>
                    {/* Display current title */}
                    <h2 className="text-sm md:text-[17px] font-semibold">
                        {title}
                    </h2>
                    {/* Pencil icon to enable editing */}
                    <button
                        onClick={() => setShowInput(true)}
                        aria-label="Edit title"
                        className="cursor-pointer">
                        <LuPencil className="text-[16px] text-purple-600" />
                    </button>
                </>
            )}
        </div>
    );
};

export default TitleInput;
