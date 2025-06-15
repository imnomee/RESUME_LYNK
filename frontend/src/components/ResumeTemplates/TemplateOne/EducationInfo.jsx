import React from 'react';

const EducationInfo = ({ degree, institutionName, duration }) => {
    return (
        <div className="mb-2">
            <h3 className="text-base font-semibold text-gray-900">{degree}</h3>
            <p className="text-sm font-medium">{institutionName}</p>
            <p className="text-xs text-gray-500 font-medium italic mt-0.5">
                {duration}
            </p>
        </div>
    );
};

export default EducationInfo;
