// src/utils/addArrayItem.js

/**
 * Adds a new item to an array inside a resume section.
 *
 * @param {Function} setState - The state setter function (e.g., setResumeData)
 * @param {string} section - The section name (e.g., 'experience', 'education')
 * @param {any} newItem - The new item to append to the array
 */
const addArrayItem = (setState, section, newItem) => {
    setState((prevState) => ({
        ...prevState,
        [section]: [...prevState[section], newItem],
    }));
};

export default addArrayItem;
