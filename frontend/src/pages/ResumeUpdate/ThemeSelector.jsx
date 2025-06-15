// ThemeSelector Component
// -----------------------------------------------------
// Purpose: Allows users to choose a resume template and color palette
// Features:
// - Template and color palette selection via tabs
// - Live preview of selected options
// - Responsive design with dynamic width calculation

import { useEffect, useRef, useState } from 'react';
import {
    DUMMY_RESUME_DATA,
    resumeTemplates,
    themeColorPalette,
} from '../../utils/data.js';
import { LuCircleCheckBig } from 'react-icons/lu';
import Tabs from '../../components/Tabs.jsx';
import TemplateCard from '../../components/Cards/TemplateCard.jsx';
import RenderResume from '../../components/ResumeTemplates/RenderResume.jsx';

const TAB_DATA = [{ label: 'Templates' }, { label: 'Color Palettes' }];

const ColorPalette = ({ colors, isSelected, onSelect }) => (
    <div
        className={`h-28 bg-purple-50 flex rounded-lg overflow-hidden border-2 ${
            isSelected ? 'border-purple-500' : 'border-transparent'
        } cursor-pointer`}
        onClick={onSelect}>
        {colors.map((color, idx) => (
            <div
                key={idx}
                className="flex-1"
                style={{ backgroundColor: color }}
            />
        ))}
    </div>
);

const ThemeSelector = ({
    selectedTheme,
    setSelectedTheme,
    resumeData,
    onClose,
}) => {
    const resumeRef = useRef(null);
    const [baseWidth, setBaseWidth] = useState(800);
    const [tabValue, setTabValue] = useState('Templates');
    const [selectedColorPalette, setSelectedColorPalette] = useState({
        colors: selectedTheme?.colorPalette || [],
        index: -1,
    });
    const [selectedTemplate, setSelectedTemplate] = useState({
        theme: selectedTheme?.theme || '',
        index: -1,
    });

    useEffect(() => {
        const updateBaseWidth = () => {
            if (resumeRef.current) {
                setBaseWidth(resumeRef.current.offsetWidth);
            }
        };

        updateBaseWidth();
        window.addEventListener('resize', updateBaseWidth);
        return () => window.removeEventListener('resize', updateBaseWidth);
    }, []);

    const handleThemeSelection = () => {
        setSelectedTheme({
            colorPalette: selectedColorPalette.colors,
            theme: selectedTemplate.theme,
        });
        onClose();
    };

    return (
        <div className="container mx-auto px-2 md:px-0">
            <div className="flex items-center justify-between mb-5 mt-2">
                <Tabs
                    tabs={TAB_DATA}
                    activeTab={tabValue}
                    setActiveTab={setTabValue}
                />
                <button
                    className="btn-small-light flex items-center gap-1"
                    onClick={handleThemeSelection}
                    aria-label="Apply selected theme">
                    <LuCircleCheckBig className="text-[16px]" />
                    Done
                </button>
            </div>

            <div className="grid grid-cols-12 gap-5">
                {/* Selection Panel */}
                <div className="col-span-12 md:col-span-5 bg-white">
                    <div className="grid grid-cols-2 gap-4 p-4 max-h-[80vh] overflow-y-auto custom-scrollbar md:pr-5">
                        {tabValue === 'Templates' &&
                            resumeTemplates.map((template, index) => (
                                <TemplateCard
                                    key={template.id}
                                    thumbnailImg={template.thumbnailImg}
                                    isSelected={
                                        selectedTemplate.index === index
                                    }
                                    onSelect={() =>
                                        setSelectedTemplate({
                                            theme: template.id,
                                            index,
                                        })
                                    }
                                />
                            ))}

                        {tabValue === 'Color Palettes' &&
                            Object.values(themeColorPalette)
                                .flat()
                                .map((colors, index) => (
                                    <ColorPalette
                                        key={index}
                                        colors={colors}
                                        isSelected={
                                            selectedColorPalette.index === index
                                        }
                                        onSelect={() =>
                                            setSelectedColorPalette({
                                                colors,
                                                index,
                                            })
                                        }
                                    />
                                ))}
                    </div>
                </div>

                {/* Preview Panel */}
                <div
                    className="hidden lg:block col-span-12 md:col-span-7 bg-white -mt-3"
                    ref={resumeRef}>
                    <RenderResume
                        templateId={selectedTemplate.theme}
                        resumeData={resumeData || DUMMY_RESUME_DATA}
                        containerWidth={baseWidth}
                        colorPalette={selectedColorPalette.colors}
                    />
                </div>
            </div>
        </div>
    );
};

export default ThemeSelector;
