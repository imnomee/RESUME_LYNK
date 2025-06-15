import Progress from '../../Progress.jsx';

const Skill = ({ skill, progress, accentColor, bgColor }) => {
    return (
        <div className="flex items-center justify-between">
            <p className="text-sm font-medium tracking-wide">{skill}</p>
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

const SkillsInfo = ({ skills, accentColor, bgColor }) => {
    return (
        <div className="grid grid-cols-1">
            {skills.map((_, index) => (
                <Skill
                    key={index}
                    skill={_.skillName}
                    progress={_.progressLevel}
                    accentColor={accentColor}
                    bgColor={bgColor}
                />
            ))}
        </div>
    );
};

export default SkillsInfo;
