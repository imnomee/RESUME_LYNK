// Import all available templates
import TemplateOne from './TemplateOne';
import TemplateTwo from './TemplateTwo';
import TemplateThree from './TemplateThree';

// Mapping of templateId to the actual template component
const templates = {
    '01': TemplateOne,
    '02': TemplateTwo,
    '03': TemplateThree,
};

/**
 * Dynamically renders a resume template based on templateId
 * Falls back to TemplateOne if the ID is invalid or missing.
 */
const RenderResume = ({
    templateId,
    resumeData,
    colorPalette,
    containerWidth,
}) => {
    // Use TemplateOne as a default fallback
    const SelectedTemplate = templates[templateId] || TemplateOne;

    return (
        <SelectedTemplate
            resumeData={resumeData}
            colorPalette={colorPalette}
            containerWidth={containerWidth}
        />
    );
};

export default RenderResume;
