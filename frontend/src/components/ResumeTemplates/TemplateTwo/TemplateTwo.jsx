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
        location,
        email,
        phone,
        linkedIn,
        github,
        website,
    }) => {
        return (
            <div
                className="contactInfo flex flex-wrap items-center text-base tracking-wide justify-center mt-5 border-t border-b py-2"
                style={{ borderColor: themeColor[1] }}>
                {location && (
                    <div className="flex items-center">
                        <span>{location}</span>
                    </div>
                )}

                {email && (
                    <div className="flex items-center">
                        <span
                            className="w-1 h-1 mx-2 rounded-full"
                            style={{
                                backgroundColor: themeColor[4],
                            }}></span>
                        <span>{email}</span>
                    </div>
                )}

                {phone && (
                    <div className="flex items-center">
                        <span
                            className="w-1 h-1 mx-2 rounded-full"
                            style={{
                                backgroundColor: themeColor[4],
                            }}></span>
                        <span>{phone}</span>
                    </div>
                )}

                {linkedIn && (
                    <div className="flex items-center">
                        <span
                            className="w-1 h-1 mx-2 rounded-full"
                            style={{
                                backgroundColor: themeColor[4],
                            }}></span>
                        <span>
                            <a
                                href={linkedIn}
                                target="_blank"
                                rel="noopener noreferrer">
                                {linkedIn}
                            </a>
                        </span>
                    </div>
                )}

                {github && (
                    <div className="flex items-center">
                        <span
                            className="w-1 h-1 mx-2 rounded-full"
                            style={{
                                backgroundColor: themeColor[4],
                            }}></span>
                        <span>
                            <a
                                href={github}
                                target="_blank"
                                rel="noopener noreferrer">
                                {github}
                            </a>
                        </span>
                    </div>
                )}

                {website && (
                    <div className="flex items-center">
                        <span
                            className="w-1 h-1 mx-2 rounded-full"
                            style={{
                                backgroundColor: themeColor[4],
                            }}></span>
                        <span>
                            <a
                                href={website}
                                target="_blank"
                                rel="noopener noreferrer">
                                {website}
                            </a>
                        </span>
                    </div>
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
                                    <div
                                        className="w-1 h-1 rounded-full"
                                        style={{
                                            backgroundColor: themeColor[4],
                                        }}></div>
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

    const Certifications = ({ title, certifications }) => {
        return (
            <div className="certifications mt-5">
                <Title title={title} />
                {certifications.length > 0 &&
                    certifications.map((cert, index, arr) => (
                        <div
                            key={index}
                            className={`my-2 flex flex-col gap-1 ${
                                index !== arr.length - 1 ? 'border-b pb-2' : ''
                            }`}
                            style={{
                                borderColor: themeColor[1],
                            }}>
                            <div className="">
                                <div className="font-semibold">
                                    {cert.title}
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="italic">{cert.issuer}</div>
                                    <div
                                        className="w-1 h-1 rounded-full"
                                        style={{
                                            backgroundColor: themeColor[4],
                                        }}></div>
                                    <div className="text-sm font-semibold">
                                        {cert.year}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        );
    };

    const Skills = ({ title, skills }) => {
        return (
            <div className="skills mt-5">
                <Title title={title} />
                <div className="flex flex-wrap">
                    {skills.map((skill, index, arr) => (
                        <div key={index} className="flex items-center">
                            {skill.skillName}
                            {index !== arr.length - 1 && (
                                <div
                                    className="w-1 h-1 rounded-full mx-2"
                                    style={{
                                        backgroundColor: themeColor[4],
                                    }}></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const Languages = ({ title, languages }) => {
        return (
            <div className="languages mt-5">
                <Title title={title} />
                <div className="flex flex-wrap">
                    {languages.map((lang, index, arr) => (
                        <div key={index} className="flex items-center">
                            {lang.name}
                            {index !== arr.length - 1 && (
                                <div
                                    className="w-1 h-1 rounded-full mx-2"
                                    style={{
                                        backgroundColor: themeColor[4],
                                    }}></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const Projects = ({ title, projects }) => {
        return (
            <div className="projects mt-5">
                <Title title={title} />
                {projects.length > 0 &&
                    projects.map((project, index, arr) => (
                        <div
                            key={index}
                            className={`my-2 flex flex-col gap-1 ${
                                index !== arr.length - 1 ? 'border-b pb-2' : ''
                            }`}
                            style={{
                                borderColor: themeColor[1],
                            }}>
                            <div className="">
                                <span className="font-semibold">
                                    {project.projectName}
                                </span>
                            </div>
                            <div>{project.description}</div>
                            {project.projectLink && (
                                <a
                                    href={project.projectLink}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    {project.projectLink}
                                </a>
                            )}
                            {project.liveDemo && (
                                <a
                                    href={project.liveDemo}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    {project.liveDemo}
                                </a>
                            )}
                        </div>
                    ))}
            </div>
        );
    };

    const Interests = ({ title, interests }) => {
        return (
            <div className="interests mt-5">
                <Title title={title} />
                <div className="flex flex-wrap">
                    {interests.map((interest, index, arr) => (
                        <div key={index} className="flex items-center">
                            {interest}
                            {index !== arr.length - 1 && (
                                <div
                                    className="w-1 h-1 rounded-full mx-2"
                                    style={{
                                        backgroundColor: themeColor[4],
                                    }}></div>
                            )}
                        </div>
                    ))}
                </div>
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
                    <p className="text-base">{profileInfo.summary}</p>
                </div>
                <ContactInfo title={'Contact Info'} {...contactInfo} />
                <Education title={'Education'} education={education} />
                <Certifications
                    title={'Certifications'}
                    certifications={certifications}
                />
                <WorkExperience
                    title={'Experience'}
                    workExperience={workExperience}
                />
                <Projects title={'Projects'} projects={projects} />
                {skills.length > 0 && (
                    <Skills title={'Skills'} skills={skills} />
                )}
                <div className="skills-interests flex justify-between">
                    {interests.length > 0 && (
                        <Interests title={'Interests'} interests={interests} />
                    )}
                    {languages.length > 0 && (
                        <Languages title={'Languages'} languages={languages} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TemplateTwo;
