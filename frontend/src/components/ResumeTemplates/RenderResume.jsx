// Import all available templates

import TemplateOne from './TemplateOne/TemplateOne';

// Mapping of templateId to the actual template component
const templates = {
    '01': TemplateOne,
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
