import React from 'react';

const RatingInput = ({
    value,
    total = 5,
    onChange = () => {},
    color = '#9125eb',
    bgColor = '#f3b5f9',
}) => {
    const displayValue = Math.round((value / 100) * total);
    const handleClick = (index) => {
        const newValue = Math.round(((index + 1) / total) * 100);
        onChange(newValue);
    };
    return (
        <div className="flex gap-3 cursor-pointer">
            {[...Array(total)].map((_, index) => {
                const isActive = index < displayValue;
                return (
                    <span
                        key={index}
                        onClick={() => handleClick(index)}
                        className="w-4 h-4 rounded transition-all"
                        style={{
                            backgroundColor: isActive ? color : bgColor,
                        }}></span>
                );
            })}
        </div>
    );
};

export default RatingInput;
