import React from 'react';

const ActionButton = ({
    text,
    onClick,
    icon,
    disabled = false,
    loading = false,
}) => {
    return (
        <button
            className={`btn-small-light ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={onClick}
            disabled={disabled}>
            {icon}
            <span className="hidden lg:block">
                {loading ? 'Loading...' : text}
            </span>
        </button>
    );
};

export default ActionButton;
