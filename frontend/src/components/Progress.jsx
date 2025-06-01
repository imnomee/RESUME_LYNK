import React from 'react';

const Progress = ({ progress = 0, total = 5, color, bgColor }) => {
    return (
        <div className="flex gap-2">
            {[...Array(total)].map((_, i) => (
                <div
                    key={i}
                    className={`w-2 h-2 rounded transition-all ${
                        i < progress ? 'bg-cyan-500' : 'bg-cyan-100'
                    }`}
                    style={{
                        backgroundColor:
                            i < progress
                                ? color || 'rgba(1,1,1,1)'
                                : bgColor || 'rgba(1,1,1,0.1)',
                    }}></div>
            ))}
        </div>
    );
};

export default Progress;
