import { useEffect, useRef, useState, useMemo } from 'react';
import {
    LuMapPinHouse,
    LuMail,
    LuPhone,
    LuRss,
    LuGithub,
    LuUser,
} from 'react-icons/lu';
import { RiLinkedinLine } from 'react-icons/ri';

import Contactinfo from '../ResumeSections/Contactinfo';
import EducationInfo from '../ResumeSections/EducationInfo';
import LanguagesInfo from '../ResumeSections/LanguagesInfo';
import WorkExperienceInfo from '../ResumeSections/WorkExperienceInfo';
import ProjectsInfo from '../ResumeSections/ProjectsInfo';
import SkillsInfo from '../ResumeSections/SkillsInfo';
import CertificationInfo from '../ResumeSections/CertificationInfo';
import { formatYearMonth } from '../../utils/helper';

const DEFAULT_THEME = ['#ebfdff', '#a1f4fd', '#cefafe', '#d2b8db', '#4a5565'];

// Simple Title component for section headers
const Title = ({ text, color }) => (
    <div className="relative w-fit mb-2.5">
        <span
            className="absolute bottom-0 left-0 w-full h-2"
            style={{ backgroundColor: color }}
        />
        <h2 className="relative text-sm font-bold">{text}</h2>
    </div>
);

const TemplateOne = ({ resumeData, colorPalette, containerWidth }) => {
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

    return (
        <div
            ref={resumeRef}
            className="p-3 bg-white"
            style={{
                transform: containerWidth > 0 ? `scale(${scale})` : 'none',
                transformOrigin: 'top left',
                width: containerWidth > 0 ? `${containerWidth}px` : '800px',
                height: '1200px', // Optional: Replace with auto if dynamic height is desired
            }}>
            <div className="grid grid-cols-12 gap-8">
                {/* LEFT SECTION */}
                <div
                    className="col-span-4 py-10"
                    style={{ backgroundColor: themeColor[0] }}>
                    <div className="flex flex-col items-center px-2">
                        <div
                            className="w-[100px] h-[100px] rounded-full flex items-center justify-center"
                            style={{ backgroundColor: themeColor[1] }}>
                            {profileInfo?.profilePreviewUrl ? (
                                <img
                                    src={profileInfo.profilePreviewUrl}
                                    alt="Profile"
                                    className="w-[90px] h-[90px] rounded-full object-cover"
                                />
                            ) : (
                                <div
                                    className="w-[90px] h-[90px] flex items-center justify-center text-5xl rounded-full"
                                    style={{ color: themeColor[4] }}>
                                    <LuUser />
                                </div>
                            )}
                        </div>
                        <h2 className="text-xl font-bold mt-3">
                            {profileInfo.fullName}
                        </h2>
                        <p className="text-sm text-center">
                            {profileInfo.designation}
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div className="m-6">
                        <div className="flex flex-col gap-2">
                            <Contactinfo
                                icon={<LuMapPinHouse />}
                                iconBG={themeColor[2]}
                                value={contactInfo.location}
                            />
                            <Contactinfo
                                icon={<LuMail />}
                                iconBG={themeColor[2]}
                                value={contactInfo.email}
                            />
                            <Contactinfo
                                icon={<LuPhone />}
                                iconBG={themeColor[2]}
                                value={contactInfo.phone}
                            />
                            {contactInfo.linkedIn && (
                                <Contactinfo
                                    icon={<RiLinkedinLine />}
                                    iconBG={themeColor[2]}
                                    value={contactInfo.linkedIn}
                                />
                            )}
                            {contactInfo.github && (
                                <Contactinfo
                                    icon={<LuGithub />}
                                    iconBG={themeColor[2]}
                                    value={contactInfo.github}
                                />
                            )}
                            {contactInfo.website && (
                                <Contactinfo
                                    icon={<LuRss />}
                                    iconBG={themeColor[2]}
                                    value={contactInfo.website}
                                />
                            )}
                        </div>

                        {/* Education */}
                        {education.length > 0 && (
                            <div className="mt-5">
                                <Title text="Education" color={themeColor[1]} />
                                {education.map((edu, index) => (
                                    <EducationInfo
                                        key={`education_${index}`}
                                        degree={edu.degree}
                                        institutionName={edu.institutionName}
                                        duration={`${formatYearMonth(
                                            edu.startDate
                                        )} - ${formatYearMonth(edu.endDate)}`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Languages */}
                        {languages.length > 0 && (
                            <div className="mt-5">
                                <Title text="Languages" color={themeColor[1]} />
                                <LanguagesInfo
                                    languages={languages}
                                    accentColor={themeColor[3]}
                                    bgColor={themeColor[2]}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT SECTION */}
                <div className="col-span-8 pt-10 mr-10 pb-5">
                    {profileInfo.summary && (
                        <div>
                            <Title
                                text="Professional Summary"
                                color={themeColor[1]}
                            />
                            <p className="text-sm font-medium">
                                {profileInfo.summary.trim()}
                            </p>
                        </div>
                    )}

                    {workExperience.length > 0 && (
                        <div className="mt-4">
                            <Title
                                text="Work Experience"
                                color={themeColor[1]}
                            />
                            {workExperience.map((job, index) => (
                                <WorkExperienceInfo
                                    key={index}
                                    company={job.companyName}
                                    role={job.role}
                                    duration={`${formatYearMonth(
                                        job.startDate
                                    )} - ${formatYearMonth(job.endDate)}`}
                                    durationColor={themeColor[4]}
                                    description={job.description}
                                />
                            ))}
                        </div>
                    )}

                    {projects.length > 0 && (
                        <div className="mt-4">
                            <Title text="Projects" color={themeColor[1]} />
                            {projects.map((project, index) => (
                                <ProjectsInfo
                                    key={index}
                                    name={project.projectName}
                                    description={project.description}
                                    link={project.projectLink}
                                    demo={project.liveDemo}
                                    bgColor={themeColor[2]}
                                />
                            ))}
                        </div>
                    )}

                    {skills.length > 0 && (
                        <div className="mt-4">
                            <Title text="Skills" color={themeColor[1]} />
                            <SkillsInfo
                                skills={skills}
                                accentColor={themeColor[3]}
                                bgColor={themeColor[2]}
                            />
                        </div>
                    )}

                    {certifications.length > 0 && (
                        <div className="mt-5">
                            <Title
                                text="Certifications"
                                color={themeColor[1]}
                            />
                            <div className="grid grid-cols-2 gap-2">
                                {certifications.map((cert, index) => (
                                    <CertificationInfo
                                        key={index}
                                        title={cert.title}
                                        issuer={cert.issuer}
                                        year={cert.year}
                                        bgColor={themeColor[2]}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {interests.length > 0 &&
                        interests.some((i) => i?.trim()) && (
                            <div className="mt-5">
                                <Title text="Interests" color={themeColor[1]} />
                                <div className="flex items-center flex-wrap gap-3 mt-4">
                                    {interests
                                        .filter(Boolean)
                                        .map((interest, index) => (
                                            <div
                                                key={index}
                                                className="text-[10px] font-medium py-1 px-3 rounded-lg"
                                                style={{
                                                    backgroundColor:
                                                        themeColor[2],
                                                }}>
                                                {interest}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
};

export default TemplateOne;
