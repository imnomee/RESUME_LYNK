// src/utils/updateArrayItem.js

/**
 * Updates an item in an array within a specific resume section.
 *
 * @param {Function} setState - The state setter function (e.g. setResumeData)
 * @param {string} section - The resume section containing the array (e.g., 'experience')
 * @param {number} index - Index of the item to update
 * @param {string|null} key - The key inside the array item to update (null = replace whole item)
 * @param {any} value - The new value to assign
 */
const updateArrayItem = (setState, section, index, key, value) => {
    setState((prevState) => {
        const updatedArray = [...prevState[section]];

        if (key === null) {
            updatedArray[index] = value; // Replace entire object
        } else {
            updatedArray[index] = {
                ...updatedArray[index],
                [key]: value,
            };
        }

        return {
            ...prevState,
            [section]: updatedArray,
        };
    });
};

export default updateArrayItem;
