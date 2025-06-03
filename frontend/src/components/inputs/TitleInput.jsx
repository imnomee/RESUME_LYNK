import React, { useState } from 'react';
import { LuCheck, LuPencil } from 'react-icons/lu';

const TitleInput = ({ title, setTitle }) => {
    const [showInput, setShowInput] = useState(false); // Toggles between display and edit mode

    return (
        <div className="flex items-center gap-3">
            {showInput ? (
                <>
                    <input
                        className="flex-1 text-sm md:text-[17px] w-32 md:w-96 bg-transparent outline-none text-black font-semibold border-b border-gray-300 pb-1 truncate"
                        type="text"
                        value={title}
                        placeholder="Resume Title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button
                        onClick={() => setShowInput(false)}
                        aria-label="Confirm title"
                        className="cursor-pointer">
                        <LuCheck className="text-[16px] text-purple-600" />
                    </button>
                </>
            ) : (
                <>
                    <h2 className="flex-1 text-sm md:text-[17px] font-semibold truncate">
                        {title}
                    </h2>
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
