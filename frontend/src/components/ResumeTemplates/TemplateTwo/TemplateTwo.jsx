import { useEffect, useRef, useState, useMemo } from 'react';

import { formatYearMonth } from '../../../utils/helper';

const DEFAULT_THEME = ['#ebfdff', '#a1f4fd', '#cefafe', '#d2b8db', '#4a5565'];

const TemplateTwo = ({ resumeData, colorPalette, containerWidth }) => {
    const resumeRef = useRef(null);
    const [baseWidth, setBaseWidth] = useState(800);
    const [scale, setScale] = useState(1);

    const themeColor = useMemo(
        () => (colorPalette?.length ? colorPalette : DEFAULT_THEME),
        [colorPalette]
    );

    useEffect(() => {
        const actualWidth = resumeRef.current?.offsetWidth || 800;
        setBaseWidth(actualWidth);
        setScale(containerWidth / actualWidth);
    }, [containerWidth]);

    const {
        profileInfo = {},
        contactInfo = {},
        education = [],
        languages = [],
        workExperience = [],
        projects = [],
        skills = [],
        certifications = [],
        interests = [],
    } = resumeData || {};

    const Title = ({ title }) => {
        return (
            <div
                className="text-md w-full font-bold uppercase border-b"
                style={{ borderColor: themeColor[4] }}>
                {title}
            </div>
        );
    };

    const ContactInfo = ({
        title,
        location,
        email,
        phone,
        linkedIn,
        github,
        website,
    }) => {
        return (
            <div className="contactInfo flex gap-y-0.5 justify-around flex-wrap mt-5 text-sm">
                {title && <Title title={title} />}
                <p>{location}</p>
                <p>{email}</p>
                <p>{phone}</p>
                {linkedIn && (
                    <a href={linkedIn} target="_blank">
                        {linkedIn}
                    </a>
                )}
                {github && (
                    <a href={github} target="_blank">
                        {github}
                    </a>
                )}
                {website && (
                    <a href={website} target="_blank">
                        {website}
                    </a>
                )}
            </div>
        );
    };

    const WorkExperience = ({ title, workExperience }) => {
        return (
            <div className="workExperience mt-5">
                <Title title={title} />
                {workExperience.length > 0 &&
                    workExperience.map((work, index, arr) => (
                        <div
                            key={index}
                            className={`my-2 flex flex-col gap-1 ${
                                index !== arr.length - 1 ? 'border-b pb-2' : ''
                            }`}
                            style={{
                                borderColor: themeColor[1],
                            }}>
                            <div className="">
                                <span className="italic text-base">
                                    {work.companyName}
                                </span>
                                {', '}
                                <span className="ml-2 font-semibold">
                                    {work.role}
                                </span>
                            </div>
                            <div className="text-sm font-semibold">
                                {formatYearMonth(work.startDate)} -{' '}
                                {formatYearMonth(work.endDate)}
                            </div>
                            <div>{work.description}</div>
                        </div>
                    ))}
            </div>
        );
    };

    const Education = ({ title, education }) => {
        return (
            <div className="education mt-5">
                <Title title={title} />
                {education.length > 0 &&
                    education.map((edu, index, arr) => (
                        <div
                            key={index}
                            className={`my-2 flex flex-col gap-1 ${
                                index !== arr.length - 1 ? 'border-b pb-2' : ''
                            }`}
                            style={{
                                borderColor: themeColor[1],
                            }}>
                            <div className="">
                                <div className="italic text-base">
                                    {edu.institutionName}
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="font-semibold">
                                        {edu.degree}
                                    </div>
                                    <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                                    <div className="text-sm font-semibold">
                                        {formatYearMonth(edu.startDate)} -{' '}
                                        {formatYearMonth(edu.endDate)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        );
    };

    return (
        <div
            ref={resumeRef}
            className="bg-white pr-16"
            style={{
                transform: containerWidth > 0 ? `scale(${scale})` : 'none',
                transformOrigin: 'top left',
                width: containerWidth > 0 ? `${containerWidth}px` : '800px',
                height: '1200px',
            }}>
            <div className="flex flex-col p-3">
                <div className="profileInfo flex flex-col">
                    <h1
                        className="text-3xl font-bold"
                        style={{ color: themeColor[4] }}>
                        {profileInfo.fullName}
                    </h1>
                    <p className="italic font-medium mb-2">
                        {profileInfo.designation}
                    </p>
                    <p className="text-sm">{profileInfo.summary}</p>
                </div>
                <ContactInfo title={'Contact Info'} {...contactInfo} />
                <WorkExperience
                    title={'Experience'}
                    workExperience={workExperience}
                />
                <Education title={'Education'} education={education} />
            </div>
        </div>
    );
};

export default TemplateTwo;
