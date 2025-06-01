import React, { useEffect, useRef } from 'react';
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
import { formatYearMonth } from '../../utils/helper';
import EducationInfo from '../ResumeSections/EducationInfo';
import LanguagesInfo from '../ResumeSections/LanguagesInfo';
import WorkExperienceInfo from '../ResumeSections/WorkExperienceInfo';
import ProjectsInfo from '../ResumeSections/ProjectsInfo';
import SkillsInfo from '../ResumeSections/SkillsInfo';
import CertificationInfo from '../ResumeSections/CertificationInfo';

const DEFAULT_THEME = ['#ebfdff', '#a1f4fd', '#cefafe', '#d2b8db', '#4a5565'];

const Title = ({ text, color }) => {
    return (
        <div className="relative w-fit mb-2.5">
            <span
                className="absolute bottom-0 left-0 w-full h-2"
                style={{ backgroundColor: color }}></span>
            <h2 className="relative text-sm font-bold">{text}</h2>
        </div>
    );
};

const TemplateTwo = ({ resumeData, colorPalette, containerWidth }) => {
    const themeColor = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;
    const resumeRef = useRef(null);
    const [baseWidth, setBaseWidth] = React.useState(800);
    const [scale, setScale] = React.useState(1);

    useEffect(() => {
        const actualBaseWidth = resumeRef.current.offsetWidth || 800;
        setBaseWidth(actualBaseWidth);
        setScale(containerWidth / baseWidth);
    }, [containerWidth, baseWidth]);
    return (
        <div
            ref={resumeRef}
            className="p-3 bg-white "
            style={{
                transform: containerWidth > 0 ? `scale(${scale})` : 'none',
                transformOrigin: 'top left',
                width: containerWidth > 0 ? `${containerWidth}px` : '800px',
                height: 'auto',
            }}>
            <div className="grid grid-cols-12 gap-8">
                <div
                    className="col-span-4 py-10"
                    style={{ backgroundColor: themeColor[0] }}>
                    <div className="m-6">
                        <div className="mt-5">
                            <Title text={'Education'} color={themeColor[1]} />
                            {resumeData.education.map((data, index) => (
                                <EducationInfo
                                    key={`education_${index}`}
                                    degree={data.degree}
                                    institutionName={data.institutionName}
                                    duration={`${formatYearMonth(
                                        data.startDate
                                    )} - ${formatYearMonth(data.endDate)}`}
                                />
                            ))}
                        </div>
                        <div className="mt-5">
                            <Title text={'Languages'} color={themeColor[1]} />
                            <LanguagesInfo
                                languages={resumeData.languages}
                                accentColor={themeColor[3]}
                                bgColor={themeColor[2]}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-span-8 pt-10 mr-10 pb-5">
                    <div>
                        <Title
                            text={'Professional Summary'}
                            color={themeColor[1]}
                        />
                        <p className="text-sm font-medium">
                            {resumeData.profileInfo.summary}
                        </p>
                    </div>
                    <div className="mt-4">
                        <Title text={'Work Experience'} color={themeColor[1]} />
                        {resumeData.workExperience.map((data, index) => (
                            <WorkExperienceInfo
                                key={index}
                                company={data.companyName}
                                role={data.role}
                                duration={`${formatYearMonth(
                                    data.startDate
                                )} - ${formatYearMonth(data.endDate)}`}
                                durationColor={themeColor[4]}
                                description={data.description}
                            />
                        ))}
                    </div>
                    <div className="mt-4">
                        <Title text={'Projects'} color={themeColor[1]} />
                        {resumeData.projects.map((project, index) => (
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
                    <div className="">
                        <Title text={'Skills'} color={themeColor[1]} />
                        <SkillsInfo
                            skills={resumeData.skills}
                            accentColor={themeColor[3]}
                            bgColor={themeColor[2]}
                        />
                    </div>
                    <div className="mt-5">
                        <Title text={'Certifications'} color={themeColor[1]} />
                        <div className="grid grid-cols-2 gap-2">
                            {resumeData.certifications.map((cert, index) => (
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
                    {resumeData.interests.length > 0 &&
                        resumeData.interests[0] !== '' && (
                            <div className="mt-5">
                                <Title
                                    text={'Interests'}
                                    color={themeColor[1]}
                                />
                                <div className="flex items-center flex-wrap gap-3 mt-4">
                                    {resumeData.interests.map(
                                        (interest, index) => {
                                            if (!interest) return null;
                                            return (
                                                <div
                                                    key={index}
                                                    className="text-[10px] font-medium py-1 px-3 rounded-lg"
                                                    style={{
                                                        backgroundColor:
                                                            themeColor[2],
                                                    }}>
                                                    {interest}
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
};

export default TemplateTwo;
