import React from 'react';
import { LuGithub, LuExternalLink } from 'react-icons/lu';
import ActionLink from '../../ResumeSections/ActionLink';

const ProjectsInfo = ({
    name,
    description,
    link,
    demo,
    bgColor,
    isPreview,
}) => {
    return (
        <div className="mb-5">
            <h3
                className={`${
                    isPreview ? 'text-xs' : 'text-base'
                } font-semibold text-gray-900`}>
                {name}
            </h3>
            <p className="text-sm font-medium mt-2">{description}</p>
            <div className="flex items-center justify-between gap-3 mt-2 pr-8">
                {link && (
                    <ActionLink
                        icon={<LuGithub />}
                        link={link}
                        bgColor={bgColor}
                    />
                )}
                {demo && (
                    <ActionLink
                        icon={<LuExternalLink />}
                        link={demo}
                        bgColor={bgColor}
                    />
                )}
            </div>
        </div>
    );
};

export default ProjectsInfo;
