import { useState } from 'react';

export const useResumeData = (initialData) => {
    const [resumeData, setResumeData] = useState(initialData);

    const updateSection = (section, key, value) => {
        setResumeData((prev) => ({
            ...prev,
            [section]: { ...prev[section], [key]: value },
        }));
    };

    const updateArrayItem = (section, id, key, value) => {
        setResumeData((prev) => ({
            ...prev,
            [section]: prev[section].map((item) =>
                item._id === id ? { ...item, [key]: value } : item
            ),
        }));
    };

    const addArrayItem = (section, item) => {
        setResumeData((prev) => ({
            ...prev,
            [section]: [...prev[section], item],
        }));
    };

    const removeArrayItem = (section, id) => {
        setResumeData((prev) => ({
            ...prev,
            [section]: prev[section].filter((item) => item._id !== id),
        }));
    };

    return {
        resumeData,
        setResumeData,
        updateSection,
        updateArrayItem,
        addArrayItem,
        removeArrayItem,
    };
};
