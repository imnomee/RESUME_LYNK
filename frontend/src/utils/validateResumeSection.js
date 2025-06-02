export const validateResumeSection = (section, data) => {
    const errors = [];

    switch (section) {
        case 'profile-info': {
            if (!data.profileInfo.fullName.trim())
                errors.push('Full Name is required');

            if (!data.profileInfo.designation.trim())
                errors.push('Designation is required');

            if (!data.profileInfo.summary.trim())
                errors.push('Summary is required');
            break;
        }
        case 'contact-info': {
            if (!data.contactInfo.email.trim())
                errors.push('Email is required');
            if (!data.contactInfo.phone.trim())
                errors.push('Phone is required');
            if (!data.contactInfo.location.trim())
                errors.push('Location is required');
            break;
        }
        case 'work-experience':
            data.workExperience.forEach((experience, index) => {
                if (!experience.companyName.trim())
                    errors.push(
                        `Company is required in experience ${index + 1}`
                    );

                if (!experience.role.trim())
                    errors.push(`Role is required in experience ${index + 1}`);

                if (!experience.startDate.trim())
                    errors.push(
                        `Start Date is required in experience ${index + 1}`
                    );

                if (!experience.endDate.trim())
                    errors.push(
                        `End Date is required in experience ${index + 1}`
                    );

                if (!experience.description.trim())
                    errors.push(
                        `Description is required in experience ${index + 1}`
                    );
            });
            break;
        case 'educational-info':
            data.education.forEach((education, index) => {
                if (!education.degree.trim())
                    errors.push(`Degree is required in education ${index + 1}`);

                if (!education.institutionName.trim())
                    errors.push(
                        `Institution is required in education ${index + 1}`
                    );

                if (!education.startDate.trim())
                    errors.push(
                        `Start Date is required in education ${index + 1}`
                    );

                if (!education.endDate.trim())
                    errors.push(
                        `End Date is required in education ${index + 1}`
                    );
            });
            break;
        case 'skills-info':
            data.skills.forEach((skill, index) => {
                if (!skill.skillName.trim()) {
                    errors.push(`Name is required in skill ${index + 1}`);
                }
                if (skill.progressLevel < 1 || skill.progressLevel > 100) {
                    errors.push(
                        `Progress must be betwen 1-100 in skill ${index + 1}`
                    );
                }
            });
            break;
        case 'projects':
            data.projects.forEach((project, index) => {
                if (!project.projectName.trim())
                    errors.push(`Title is required in project ${index + 1}`);

                if (!project.description.trim())
                    errors.push(
                        `Description is required in project ${index + 1}`
                    );
            });
            break;
        case 'certification':
            data.certifications.forEach((cert, index) => {
                if (!cert.title.trim())
                    errors.push(
                        `Title is required in certification ${index + 1}`
                    );

                if (!cert.issuer.trim())
                    errors.push(
                        `Issuer is required in certification ${index + 1}`
                    );

                if (!cert.year.trim())
                    errors.push(
                        `Year is required in certification ${index + 1}`
                    );
            });
            break;
        case 'additionalInfo':
            data.languages.forEach((lang, index) => {
                if (!lang.name.trim())
                    errors.push(`Language is required in skill ${index + 1}`);

                if (lang.progressLevel < 1 || lang.progressLevel > 100)
                    errors.push(
                        `Progress must be betwen 1-100 in skill ${index + 1}`
                    );
            });
            if (data.interests.length === 0 || !data.interests[0].trim())
                errors.push('At least one interest is required');

            break;
        default:
            break;
    }

    return errors;
};
