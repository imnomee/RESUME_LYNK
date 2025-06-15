// Input Component
// -----------------------------------------------------
// Purpose: Reusable input field with optional password visibility toggle
// Features:
// - Dynamically switches input type for password visibility
// - Accepts label, placeholder, type, value, and onChange handler
// - Clean accessibility-friendly structure

import React from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, label, placeHolder, type = 'text' }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const toggleShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const inputType =
        type === 'password' ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm md:text-base text-gray-600 mb-1">
                    {label}
                </label>
            )}
            <div className="input-box relative flex items-center border border-gray-300 rounded px-3 py-2 bg-white">
                <input
                    type={inputType}
                    placeholder={placeHolder}
                    className="w-full bg-transparent outline-none text-sm md:text-base"
                    value={value}
                    onChange={onChange}
                    aria-label={label || placeHolder || 'Input field'}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="ml-2 text-gray-500 hover:text-primary focus:outline-none"
                        aria-label={
                            showPassword ? 'Hide password' : 'Show password'
                        }>
                        {showPassword ? (
                            <FaRegEye size={20} />
                        ) : (
                            <FaRegEyeSlash size={20} />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Input;
