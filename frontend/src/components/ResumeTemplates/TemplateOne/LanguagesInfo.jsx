import React from 'react';
import Progress from '../../Progress.jsx';

const Language = ({ name, progress, accentColor, bgColor }) => {
    return (
        <div className="flex items-center justify-between ">
            <p className="text-sm font-medium tracking-wide">{name}</p>
            {progress > 0 && (
                <Progress
                    progress={(progress / 100) * 5}
                    color={accentColor}
                    bgColor={bgColor}
                />
            )}
        </div>
    );
};

const LanguagesInfo = ({ languages, accentColor, bgColor }) => {
    return (
        <div className="flex flex-col gap-1">
            {languages.map((_, index) => (
                <Language
                    key={index}
                    name={_.name}
                    progress={_.progressLevel}
                    accentColor={accentColor}
                    bgColor={bgColor}
                />
            ))}
        </div>
    );
};

export default LanguagesInfo;
