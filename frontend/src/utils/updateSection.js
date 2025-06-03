/**
 * Updates a nested key within a specific resume section.
 *
 * @param {Function} setState - The state setter function (e.g., setResumeData)
 * @param {string} section - The resume section to update (e.g., 'title', 'summary')
 * @param {string} key - The field key inside the section (e.g., 'name', 'value')
 * @param {any} value - The new value to assign
 */
const updateSection = (setState, section, key, value) => {
    setState((prevState) => ({
        ...prevState,
        [section]: {
            ...prevState[section],
            [key]: value,
        },
    }));
};

export default updateSection;
